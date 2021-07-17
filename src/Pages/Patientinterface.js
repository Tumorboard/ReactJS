import react from "react";
import '../components/Tumor.css' ;
import ReactSearchBox from 'react-search-box';
import axios from "axios";
import moment from 'moment-timezone';
import dateFormat from 'dateformat';
import SpringPatientsListApiUrl from '../services/PatientsList';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Patient extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      file: [],
      threcords: [],
      timelinerecords: [],
      patientsList: [],
      patientSelected: 0,
      result: [],
      caninfo: [],
      famedhis: [],
      tumorinfo: [],
      physicalexamin: [],
      start_time: (moment()),
      biomark: [],
      medication: [],
      pastmedhi: [],
      pastmedhistory: [],
      como: [],
      All: [],
      ptname: "",
      ptgender: "",
      ptage: 0,
      ptlocation: "",
      pthospital: "",
      ptid: ""
    };
    this.clicked = this.clicked.bind(this);
    this.patientChange = this.patientChange.bind(this);

  }

  handleFile(e) {
    let file = e.target.files[0]
    this.setState({ file: file })
  }

  handleUpload(e) {
    let file = this.state.file
    let formdata = new FormData()
    formdata.append('file', file)

    fetch('http://localhost:8000/cancerMoonshot/uploadFile', {
      mode: 'no-cors',
      method: 'POST',
      body: formdata

    })

      .then(response => {
        alert(response.text())
        console.log("image uploaded")
      }).catch(err => {
        console.log(err)
      })
    e.preventDefault();

  }

  componentDidMount() {
    if(this.props.location.state != undefined) {
    var userRole = this.props.location.state.userRole;
        this.setState({ userRole: userRole })
        }
    SpringPatientsListApiUrl.getApi().then((response) => {
      this.setState({ patientsList: response.data })
    });
   
     if ((this.props.location.state.patientID == undefined) && (this.props.match.params.patientId == 0))
       return;
    this.patientChange();
  }

  activateMenuItem(id) {
    if (this.state.patientSelected == 0) {
      alert("No Patient Selected");
      return;
    }
    const div = document.getElementById(id);
    document.getElementById("summary").classList.remove("active");
    document.getElementById("treatmenthistory").classList.remove("active");
    document.getElementById("timeline").classList.remove("active");
    document.getElementById("datapreparation").classList.remove("active");
    div.classList.add("active");

    var activeTab = "tab" + id;
    // alert("activeTab: " + activeTab);
    document.getElementById("tabsummary").style.display = "none";
    document.getElementById("tabtreatmenthistory").style.display = "none";
    document.getElementById("tabtimeline").style.display = "none";
    document.getElementById("tabdatapreparation").style.display = "none";

    document.getElementById(activeTab).style.display = "block";
  }

  clicked(counter, link) {
    if (document.getElementById(link).style.display == "none") {
      document.getElementById(counter).classList.remove("fa-chevron-down");
      document.getElementById(counter).classList.add("fa-chevron-up");
      document.getElementById(link).style.display = "block";
    }
    else {
      document.getElementById(counter).classList.remove("fa-chevron-up");
      document.getElementById(counter).classList.add("fa-chevron-down");
      document.getElementById(link).style.display = "none";
    }
  }

  patientChange = event => {

    const patientId = this.props.match.params.patientId;
    var x = 0;
    if (patientId != 0) {
      x = patientId;
    } else
      if (event == undefined) {
        x = this.props.location.state.patientID;
      }
      else x = event.value;


    fetch(process.env.REACT_APP_BASE_URL + '/getPatientDetailsByID/' + x)
      .then(response => response.json())
      .then((data) => {
        this.setState({ patientSelected: event });
        // x = event.value;
        if ((document.getElementById("tabtreatmenthistory").style.display == "none") && (document.getElementById("tabtimeline").style.display == "none")
          && (document.getElementById("tabdatapreparation").style.display == "none")) {
          document.getElementById("summary").classList.add("active");
          document.getElementById("tabsummary").style.display = "block";
        }
        console.log("Patient name,type: " + data.name + "" + data.cancertype)
        console.log("X:" + x)
        axios.get(process.env.REACT_APP_BASE_URL + '/threcordsByID?id=' + x)
          .then(res => {
            const th = res.data;
            this.setState({ threcords: th });
          })
        axios.get(process.env.REACT_APP_BASE_URL + '/timelineByID?id=' + x)
          .then(res => {
            const timeline = res.data;
            this.setState({ timelinerecords: timeline });
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getallergies?id=' + x)
          .then(res => {
            const allergies = res.data;
            this.setState({ All: allergies })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getPatientDetailsByID/' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ ptname: pdetails.name })
            this.setState({ ptage: pdetails.age })
            this.setState({ ptgender: pdetails.gender })
            this.setState({ ptlocation: pdetails.location })
            this.setState({ pthospital: pdetails.hospital })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getcomorbidities?id=' + x)
          .then(res => {
            const getcomorbidities = res.data;
            this.setState({ como: getcomorbidities })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/timelineByID?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ pastmedhi: pdetails })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getpastmedicalhistory?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ pastmedhistory: pdetails })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getmedications?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ medication: pdetails })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getbiomarkers?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ biomark: pdetails })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getphysicalexamination?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ physicalexamin: pdetails })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/gettumorinformation?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ tumorinfo: pdetails })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getfamilymedicalhistory?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ famedhis: pdetails })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getcancerinfo?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ caninfo: pdetails })
          })

        axios.get(process.env.REACT_APP_BASE_URL + '/getpatientillness?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ result: pdetails })
          })
      })
      .catch(e => {
        console.log("error: " + e);
        alert("This Patient ID does not exist in the system");

      });

  };

  render() {
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
      return current.isAfter(yesterday);
    };

    const customDates = ['2021-04-22', '2021-04-25', '2021-04-26'];
    const disableCustomDt = current => {
      return !customDates.includes(current.format('YYYY-MM-DD'));
    }
    return (
      <div>
        <div id="header" style={{ background: '#eee' }}>

          <div id="sub_header">
            <div id="header_sec_1">
              <img src="/logoo.jpg" alt="My logo" />
            </div>
            <div id="header_sec_2">
              <div id="header_buttons">
                
                {this.props.location.state.patientID != undefined && <Link to={{ pathname: '/doctor', state: { userRole:this.state.userRole }}}><button id="back">Home</button></Link>}
                {this.props.match.params.patientId == 0 && <Link to="/tumorboardinterface"><button id="tumorboard">Tumorboard</button></Link>}
                {this.props.match.params.patientId == 0 && <Link to={{ pathname: "/patient/:id", state: { userRole:this.state.userRole}}}><button id="patients">Patients</button></Link>}
              </div>
            </div>
            <div id="header_sec_3">
              <Link to="/LoginPage"> <i className="fas fa-user" /></Link>
            </div>
          </div>
        </div>
        <div id="container" style={{ width: "100%", display: "flex" }}>
          <div id="first_row">
            <div
              className="neumorphic-card"
              onClick={() => this.activateMenuItem("summary")}
              id="summary"
            >
              <i className="fas fa-columns" />
            </div>
            <div
              className="neumorphic-card"
              onClick={() => this.activateMenuItem("treatmenthistory")}
              id="treatmenthistory"
            >
              <i className="fas fa-plus-square" />
            </div>
            <div
              className="neumorphic-card"
              onClick={() => this.activateMenuItem("timeline")}
              id="timeline"
            >
              <i className="fas fa-calendar-check" />
            </div>
            <div
              className="neumorphic-card"
              onClick={() => this.activateMenuItem("datapreparation")}
              id="datapreparation"
            >
              <i className="fas fa-cogs" />
            </div>
          </div>
          <div id="content_div">
          {this.props.match.params.patientId == 0 && <div className="w_sec w_sec_select_50" style={{ width: "60%", paddingLeft: "500px" }}>
              <h5>Patient ID/Mobile No*</h5>
              <ReactSearchBox 
                className="select" name="patientIdFk"
                placeholder="Search for Patient ID"
                data={this.state.patientsList}
                onSelect={this.patientChange}
                onFocus={() => {
                  console.log('This function is called when is focussed')
                }}
                fuseConfigs={{
                  threshold: 0.05,
                }}
              />
            </div>}
            

            <div id="tabtimeline" style={{ display: "none" }}>
              <div id="content_header"> <h3 className="text-left">Timeline</h3></div>
              <div class="history-tl-container">
                {
                  this.state.timelinerecords.map((timeline, index) =>
                    <ul key={timeline.id} className="tl" style={{ paddingLeft: 68 }}>
                      <li className="tl-item" id="item" ng-repeat="item in data">
                        <div className="item-title" style={{ width: '20%', textAlign: 'left', float: 'left',color: '#df6420' }}>{timeline.item}</div>
                        <div className="item-date" style={{ width: '55%', float: 'left', paddingLeft: 68 }}>{timeline.date,dateFormat(timeline.date, "mmm dS , hh:mm TT")}
                          <i id={timeline.id} className="fa fa-chevron-down" style={{ paddingLeft: 68 }} onClick={() => this.clicked(timeline.id, timeline.link)} /></div>
                        <div className="item-detail" style={{ display: 'block', paddingTop: 60 }}>
                          <img id={timeline.link} style={{ display: 'none' }} alt src={timeline.link} /></div>
                      </li>
                    </ul>
                  )}
              </div>
            </div>
            <div id="tabsummary" style={{ display: "none" }}>

              <h3 className="text-left">Summary</h3>
              <div id="summ">
                <div className="neumorphic-cardd" style={{ display: 'table' }}>
                  <div id="patientdetails">

                    <div style={{ display: 'flex' }}>
                      <div style={{ paddingRight: '10px' }}><b> {this.state.ptid}</b></div>
                      <div style={{ paddingRight: '10px' }}><b> {this.state.ptname}</b></div>
                      <div style={{ paddingRight: '10px' }}> {this.state.ptage}</div>
                      <div style={{ paddingRight: '10px' }}> {this.state.ptgender}</div>
                      <div style={{ paddingRight: '10px' }}> {this.state.ptlocation}</div>
                      <div> {this.state.pthospital}</div>

                    </div>

                  </div>
                </div>
                <div className="neumorphic-cardd" id="first_roww" style={{ display: 'flex' }}>
                  <div id="cancerinfo" style={{ margin: '10px', padding: '5px' }} >
                    <h5 class="text-info"><b>Cancer Information</b></h5>
                    {this.state.caninfo.map((user1) => (
                      <ul><div key={user1.organ}>
                        <li><div> {user1.organ}</div></li>
                        <li><div> {user1.cancertype}</div></li>
                        <li><div> {user1.stage}</div></li>
                      </div></ul>
                    ))}
                  </div>
                  <div id="illness" style={{ margin: '10px', padding: '5px' }} >
                    <h5 class="text-info"><b>Patient illness</b></h5>
                    {this.state.result.map((user) => (
                      <ul><div key={user.date}>
                        <li><div> {user.date}</div></li>
                        <li><div> {user.illnesstype}</div></li>
                        <li><div> {user.otherillness}</div></li>
                      </div></ul>
                    ))}
                  </div>

                  <div id="familymedicalhistory" style={{ margin: '10px', padding: '5px' }} >

                    <h5 class="text-info"><b>Family medical history</b></h5>

                    {this.state.famedhis.map((user2) => (
                      <ul> <div key={user2.grandparents}>
                        <li><div> {user2.grandparents}</div></li>
                        <li><div> {user2.parents}</div></li>
                        <li><div> {user2.others}</div></li>
                      </div></ul>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className="neumorphic-cardd" style={{ width: '100%' }}>
                    <div id="tumorinfo" style={{ margin: '10px', padding: '5px', width: '100%' }} >
                      <h5 class="text-info"><b>Tumor Information</b></h5>
                      {this.state.tumorinfo.map((user) => (
                        <div key={user.size}>
                          <b>Size: </b>
                          <div> {user.size}</div>
                          <b>Margins: </b>
                          <div> {user.margin}</div>
                          <b>Lymph Nodes: </b>
                          <div> {user.lymphnodes}</div>

                        </div>
                      ))}

                    </div>
                    <div id="pastmedhistory" style={{ margin: '10px', padding: '5px' }} >
                      <h5 class="text-info"><b>Physical Examination</b></h5>
                      {this.state.physicalexamin.map((user) => (
                        <ul><div key={user.height}>
                          <li><div> {user.height}</div></li>
                          <li><div> {user.weight}</div></li>
                          <li><div> {user.bloodpressure}</div></li>
                          <li><div> {user.insullin}</div></li>
                        </div></ul>
                      ))}
                    </div>

                    <div id="medication" style={{ margin: '10px', padding: '5px' }} >
                      <h5 class="text-info"><b>Medications</b></h5>
                      {this.state.medication.map((user) => (
                        <ul><div key={user.icdno}>
                          <li><div> {user.medications}</div></li>
                        </div></ul>
                      ))}
                    </div>
                  </div>
                  <div className="neumorphic-cardd" style={{ width: '100%' }}>
                    <div id="biomarkers" style={{ margin: '10px', padding: '5px' }}>
                      <h5 className="text-info"><b>Bio Markers</b></h5>

                      <table class="table shadow-soft rounded">
                        <tbody>
                          {this.state.biomark.map((user) => (
                            <tr key={user.type}>
                              <td> {user.type}</td>
                              <td> {user.result}</td>
                              <td> {user.value}</td>
                              <td> {user.unit}</td>

                            </tr>
                          ))}
                        </tbody>
                      </table>


                      <div style={{ margin: '10px', padding: '5px' }}>
                        <h5 className="text-info"><b>Past Medical History</b></h5>
                        {this.state.pastmedhistory.map((user) => (
                          <ul><div key={user.date}>
                            <li><div> {user.date}</div></li>
                            <li><div> {user.information}</div></li>
                          </div></ul>
                        ))}
                      </div>
                      <div style={{ margin: '10px', padding: '5px' }}>
                        <h5 class="text-info"><b>Co-morbidities</b></h5>
                        {this.state.como.map((user) => (
                          <ul><div key={user.comorbids}>
                            <li><div> {user.comorbids}</div></li>
                          </div></ul>
                        ))}
                      </div>
                      <div style={{ margin: '10px', padding: '5px' }}>
                        <h5 class="text-info"><b>Allergies</b></h5>
                        {this.state.All.map((user) => (
                          <ul> <div key={user.allergies}>
                            <li> <div> {user.allergies}</div></li>
                          </div></ul>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div id="tabtreatmenthistory" style={{ display: "none" }}>
              <div id="content_header">
                <h3 className="text-left">Treatment History</h3>
                <table class="table shadow-soft rounded">
                  <thead>
                    <tr>
                      <td scope="row"> Date </td>
                      <td scope="row"> Therapeutics </td>
                      <td scope="row"> Description </td>
                      <td scope="row"> Responsible </td>
                    </tr>

                  </thead>
                  <tbody>
                    {
                      this.state.threcords.map(
                        th =>
                          <tr key={th.id}>
                            <td> {th.date, dateFormat(th.date, "mmmm dS yy, hh:mm TT")}</td>
                            <td> {th.therapeutics}</td>
                            <td> {th.description}</td>
                            <td> {th.responsible}</td>
                          </tr>
                      )
                    }

                  </tbody>
                </table>
              </div>
            </div>



            <div id="tabdatapreparation" style={{ display: "none" }}>

              <div id="datapre" >
                <div id="content_header"><h3 className="text-left">Data Preparation</h3></div>
                <form id="galleryform" >

                  <div>

                    <input id="files" type="file" name="file" onChange={(e) => this.handleFile(e)} style={{ borderRadius: '5px', marginright: '100%' }} />
                    <p><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</p>
                    <div id="header_buttons"><button id="filesupload" type="submit" onClick={(e) => this.handleUpload(e)} style={{ margin: '40px' }}>upload</button></div>
                  </div>
                  <div>

                    <div className="box" style={{ overflowY: 'scroll' }}><img src={this.state.file} id="output" style={{ width: '430px', marginTop: '15px', marginLeft: '10px' }} /></div>
                    <div className="box" id="text" style={{ overflowY: 'scroll' }} />
                    <div className="box" />
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Patient;
