import react from "react";
import SpringApiUrl from "../services/UserServiceApi";
import SpringApiTimelineRecordsListUrl from "../services/PatientTimelineRecords"
import ReactSearchBox from 'react-search-box';
import axios from "axios";
import SpringPatientsListApiUrl from '../services/PatientsList';
//onChange={this.patientChange}
import CancerinfoUrl from '../services/CancerinfoUrl';
import FamilyMedicalHisUrl from '../services/FamilyMedHis';
import TumorInfoUrl from '../services/Tumorinfourl';
import PhysicalExaminationUrl from '../services/PhysicalExamUrl';
import BiomarkersUrl from '../services/BiomarkersUrl';
import MedicationsUrl from '../services/MedicationsUrl';
import PastmedicalhistoryUrl from '../services/Pastmedicalhistory';
import ComorbiditiesUrl from '../services/ComorbiditiesUrl';
import AllergiesUrl from '../services/AllergiesUrl';
import PatientdetailsUrl from '../services/PatientdetailsUrl';
import PatientIllnessUrl from '../services/PatientIllnessUrl';

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
      biomark: [],
      medication: [],
      pastmedhi: [],
      como: [],
      All: [],
      ptname: "",
      ptgender: "",
      ptage: 0,
      ptlocation: "",
      pthospital: ""
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

    SpringPatientsListApiUrl.getApi().then((response) => {
      this.setState({ patientsList: response.data })
    });
    if (this.props.location.state == undefined)
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
    var x = 0;
    if (event == undefined) {
      // alert("undefined")
      x = this.props.location.state.patientID;
    }
    else x = event.value;


    fetch('http://localhost:8080/cancerMoonshot/getPatientDetailsByID?id=' + x)
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
        axios.get('http://localhost:8080/cancerMoonshot/threcordsByID?id=' + x)
          .then(res => {
            const th = res.data;
            this.setState({ threcords: th });
          })
        axios.get('http://localhost:8080/cancerMoonshot/timelineByID?id=' + x)
          .then(res => {
            const timeline = res.data;
            this.setState({ timelinerecords: timeline });
          })

        axios.get('http://localhost:8080/cancerMoonshot/getallergies?id=' + x)
          .then(res => {
            const allergies = res.data;
            this.setState({ All: allergies })
          })

        axios.get('http://localhost:8080/cancerMoonshot/getPatientDetailsByID?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ ptname: pdetails.name })
            this.setState({ ptage: pdetails.age })
            this.setState({ ptgender: pdetails.gender })
            this.setState({ ptlocation: pdetails.location })
            this.setState({ pthospital: pdetails.hospital })
          })

        axios.get('http://localhost:8080/cancerMoonshot/getcomorbidities?id=' + x)
          .then(res => {
            const getcomorbidities = res.data;
            this.setState({ como: getcomorbidities })
          })

        axios.get('http://localhost:8080/cancerMoonshot/timelineByID?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ pastmedhi: pdetails })
          })

        axios.get('http://localhost:8080/cancerMoonshot/getmedications?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ medication: pdetails })
          })

        axios.get('http://localhost:8080/cancerMoonshot/getbiomarkers?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ biomark: pdetails })
          })

        axios.get('http://localhost:8080/cancerMoonshot/getphysicalexamination?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ physicalexamin: pdetails })
          })

        axios.get('http://localhost:8080/cancerMoonshot/gettumorinformation?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ tumorinfo: pdetails })
          })

        axios.get('http://localhost:8080/cancerMoonshot/getfamilymedicalhistory?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ famedhis: pdetails })
          })

        axios.get('http://localhost:8080/cancerMoonshot/getcancerinfo?id=' + x)
          .then(res => {
            const pdetails = res.data;
            this.setState({ caninfo: pdetails })
          })

        axios.get('http://localhost:8080/cancerMoonshot/getpatientillness?id=' + x)
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
    return (
      <div>
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
            <div className="w_sec w_sec_select_50" style={{ width: "60%", paddingLeft: "500px" }}>
              <h5>Patient ID/Mobile No*</h5>
              <ReactSearchBox
                className="select" name="patient_id_fk"
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
            </div>

            <div id="tabtimeline" style={{ display: "none" }}>
              <div id="content_header"> <h3 className="text-left">Timeline</h3></div>



              <div class="history-tl-container">

                {
                  this.state.timelinerecords.map((timeline, index) =>
                    <ul key={timeline.id} className="tl" style={{ paddingLeft: 68 }}>
                      <li className="tl-item" id="item" ng-repeat="item in data">
                        <div className="item-title" style={{ width: '20%', textAlign: 'left', float: 'left' }}>{timeline.item}</div>
                        <div className="item-date" style={{ width: '55%', float: 'left', paddingLeft: 68 }}>{(new Date(timeline.date)).toLocaleDateString()}
                          <i id={timeline.id} className="fa fa-chevron-down" style={{ paddingLeft: 68 }} onClick={() => this.clicked(timeline.id, timeline.link)} /></div>
                        <div className="item-detail" style={{ display: 'block', paddingTop: 60 }}>
                          <img id={timeline.link} style={{ display: 'none' }} alt src={timeline.link} /></div>
                      </li>
                    </ul>
                  )
                }

              </div>
            </div>
            <div id="tabsummary" style={{ display: "none" }}>

              <h3 className="text-left">Summary</h3>
              <div id="summ">
                <div className="neumorphic-cardd" style={{ display: 'table' }}>
                  <div id="patientdetails">

                    <div style={{ display: 'flex' }}>
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
                      <div key={user1.organ}>
                        <div> {user1.organ}</div>
                        <div> {user1.cancertype}</div>
                        <div> {user1.stage}</div>


                      </div>
                    ))}
                  </div>
                  <div id="illness" style={{ margin: '10px', padding: '5px' }} >
                    <h5 class="text-info"><b>Patient illness</b></h5>
                    {this.state.result.map((user) => (
                      <div key={user.date}>
                        <div> {user.date}</div>
                        <div> {user.illnesstype}</div>
                        <div> {user.otherillness}</div>

                      </div>
                    ))}
                  </div>

                  <div id="familymedicalhistory" style={{ margin: '10px', padding: '5px' }} >

                    <h5 class="text-info"><b>Family medical history</b></h5>

                    {this.state.famedhis.map((user2) => (
                      <div key={user2.grandparents}>
                        <div> {user2.grandparents}</div>
                        <div> {user2.parents}</div>
                        <div> {user2.others}</div>


                      </div>
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
                        <div key={user.hieght}>
                          <div> {user.hieght}</div>
                          <div> {user.weight}</div>
                          <div> {user.bloodpressure}</div>
                          <div> {user.insullin}</div>


                        </div>
                      ))}
                    </div>

                    <div id="medication" style={{ margin: '10px', padding: '5px' }} >
                      <h5 class="text-info"><b>Medications</b></h5>
                      {this.state.medication.map((user) => (
                        <div key={user.icdno}>

                          <div> {user.medications}</div>


                        </div>
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
                        {this.state.pastmedhi.map((user) => (
                          <div key={user.date}>
                            <div> {user.date}</div>
                            <div> {user.information}</div>


                          </div>
                        ))}
                      </div>
                      <div style={{ margin: '10px', padding: '5px' }}>
                        <h5 class="text-info"><b>Co-morbidities</b></h5>
                        {this.state.como.map((user) => (
                          <div key={user.comorbids}>

                            <div> {user.comorbids}</div>


                          </div>
                        ))}
                      </div>
                      <div style={{ margin: '10px', padding: '5px' }}>
                        <h5 class="text-info"><b>Allergies</b></h5>
                        {this.state.All.map((user) => (
                          <div key={user.allergies}>

                            <div> {user.allergies}</div>


                          </div>
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
                            <td> {th.date}</td>
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
