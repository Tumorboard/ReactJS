import react from 'react';
import SpringApiUrl from '../services/UserServiceApi';
import SpringApiDocsListUrl from '../services/DoctorsList';
import SpringPatientsListApiUrl from '../services/PatientsList';
import SpringTodaysTBApiUrl from '../services/TodaysTBList' ;
import './Tumor.css';
//import axios from 'axios';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
import ReactSearchBox from 'react-search-box';
import Patient from '../Componentspatient/Patientinterface';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

class Edit extends react.Component {

    constructor(props) {
        var abc = "yes";
        super(props)
        this.state = {
            result: [],
            todaysTBList:[],
            docsList: [],
            patientsList: [],
            threcords: [],
            tbtype: "General",
            purpose: "Review",
            tbDate: "",
            start_time: (moment()),
            duration: 15,
            mode: "VIDEO",
            location: "",
            video_link: "",
            status: "COMPLETED",
            priority: 3,
            frequency_in_days: 0,
            inserted_time: "2018-06-06 12:12:12",
            updated_time: "2018-06-06 12:12:12",
            patientIdFk: "",
            presenting_doc: "",
            attending_doc: [],
            patientName: "",
            cancertype: "",
            patient: "present",
            display: "none",
            videolinkdisabled: false,
            values: []

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeAttendingDoc = this.handleChangeAttendingDoc.bind(this);
    }

    Changedate = (event) => {
        this.setState({
            start_time: event
        });
    };

    handleInputChange(event) {
        const target = event.target;
         const value = target.value;
        const name = target.name;
        if ((name == "mode") && (value != "VIDEO")) {
            this.setState({ videolinkdisabled: true })
        } else if ((name == "mode") && (value == "VIDEO")) {
            this.setState({ videolinkdisabled: false })
        }
        this.setState({
            [name]: value
        });
    }

    handleChangeAttendingDoc(event) {
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ attending_doc: value });
    }

    componentDidMount() {
        
        //alert( this.props.location.state.tbid);
       
        var x =  this.props.location.state.tbid;
        this.setState({tbid:this.props.location.state.tbid})
        
        SpringApiUrl.getApi().then((response) => {
            this.setState({ result: response.data })
        });

        SpringApiDocsListUrl.getApi().then((response) => {
            this.setState({ docsList: response.data })
        });

        SpringPatientsListApiUrl.getApi().then((response) => {
            this.setState({ patientsList: response.data })
        });
        
        SpringTodaysTBApiUrl.getApi().then((response) => {
            this.setState({ todaysTBList: response.data })
        });
       axios.get('https://tumorboard-308606.el.r.appspot.com/getTumorboardDetails?tbid='+ x)
        .then(res => {
          const pdetails = res.data;
          this.setState({ tbtype: pdetails.name })
          this.setState({ duration: pdetails.duration })
          this.setState({ purpose: pdetails.purpose })
          this.setState({ start_time: pdetails.start_time })
          this.setState({ mode: pdetails.mode })
          this.setState({ video_link: pdetails.video_link })
          this.setState({ status: pdetails.status })
          this.setState({ location: pdetails.location })
          this.setState({ frequency_in_days: pdetails.frequency_in_days })
          this.setState({ presenting_doc: pdetails.presenting_doc })
          this.setState({ attending_doc: pdetails.attending_doc })
          this.setState({ patientname: pdetails.patientname })

        })
    }
    

    activateMenuItem(id) {
        const div = document.getElementById(id);
        if (id == "listTB") {
            window.location.reload(false);
        }
        document.getElementById("listTB").classList.remove('active');
        document.getElementById("createTB").classList.remove('active');
        document.getElementById("notification").classList.remove('active');
        document.getElementById("abc").classList.remove('active');
        div.classList.add('active');
    
    };

    handleSubmit = event => {

        if ((this.state.mode == "VIDEO") && (this.state.video_link == "")) {
            alert("Please enter link for Video Conference !!");
            return;
        }
        event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            name:this.state.tbtype,
            purpose:this.state.purpose,
            start_time: this.state.start_time,
            duration: this.state.duration,
            mode: this.state.mode,
            location: this.state.location,
            video_link: this.state.video_link,
            status: this.state.status,
            purpose: this.state.purpose,
            frequency_in_days: this.state.frequency_in_days,
            presenting_doc: this.state.presenting_doc,
            attending_doc: this.state.attending_doc.toString(),
            
        }
            
        fetch('https://tumorboard-308606.el.r.appspot.com/update/' + this.state.tbid, {
            method: "PUT",
            body: JSON.stringify(requestOptions),
            headers: { "Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*" }
        })
            .then((response) => {
                if (!response.ok) {
                    alert("There is an error");
                    throw new Error(response.status);
                }
                else {
                    alert("TumorBoard Updated");
                    return;
                }
            })
            .then(json => console.log(json));
        //.catch(err => console.log(err)); 
    };

    render() {
        // disable past dates
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
                    <img src="/mainlogo.png" alt="My logo" />
            </div>
            <div id="header_sec_2">
              <div id="header_buttons">
               <Link to="/doctor"><button id="back">Home</button></Link>
            
                </div>
            </div>
            <div id="header_sec_3">
              <i className="fas fa-user" />
            </div>
          </div>
        
                </div>
        
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px', background: '#eee' }}>
                   
                    <div id="content_div">
                       <div id="tabnotification"  style={{ }}>
                        <div id="content_header"><h3>Edit Tumorboard</h3></div>
                            <div
                                id="container"
                                className="theme theme_font_neoskeuo theme_space_neoskeuo theme_color_neoskeuo"
                                style={{ display: "flex" }}
                            >
                                <div id="testModal" style={{ width: "70%" }}>

                                    <section>
                                        <div>

                                            <div style={{ display: "flex" }}>
                                                

                                                <div className="w_sec w_sec_select_50">
                                                    <h5>Location</h5>
                                                    <select className="select" name="location" value={this.state.location} onChange={this.handleInputChange}>
                                                        <option value={" "}>Select Location</option>
                                                        <option value={"Bangalore"}>Bangalore</option>
                                                        <option value={"Chennai"}>Chennai</option>
                                                        <option value={"Hyderabad"}>Hyderabad</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div style={{ display: "flex" }}>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Date*</h5>

                                                <DatePicker id="start_time" name="start_time" value={this.state.start_time} isValidDate={disablePastDt} minDate={new Date(2021, 4, 27)} onChange={this.Changedate} />
                                            </div>

                                            <div className="w_sec w_sec_select_50">
                                                <h5>Duration</h5>
                                                <select className="select" id="duration" name="duration" value={this.state.duration} onChange={this.handleInputChange}>
                                                    <option>In Minutes</option>
                                                    <option value={"15"}>15</option>
                                                    <option selected value={"30"}>30</option>
                                                    <option value={"45"}>45</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div style={{ display: "flex" }}>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Tumor Board Type*</h5>
                                                <select className="select" id="tbtype" name="tbtype" value={this.state.tbtype} onChange={this.handleInputChange}>
                                                    <option value={"General"}>General</option>
                                                    <option value={"Breast"}>Breast</option>
                                                    <option value={"Lung"}>Lung</option>
                                                    <option value={"Brain"}>Brain</option>
                                                </select>
                                            </div>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Purpose*</h5>
                                                <select className="select" id="purpose" name="purpose" value={this.state.purpose} onChange={this.handleInputChange}>
                                                    <option value={"Review"}>Review</option>
                                                    <option value={"Follow-Up"}>Follow-Up</option>
                                                    <option value={"Relapse"}>Relapse</option>
                                                    <option value={"Others"}>Others</option>
                                                </select>
                                            </div>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Priority</h5>
                                                <select id="priority" className="select" name="priority" value={this.state.priority} onChange={this.handleInputChange}>
                                                    <option >High</option>
                                                    <option >Medium</option>
                                                    <option >Regular</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div style={{ display: "flex" }}>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Mode*</h5>
                                                <select className="select" name="mode" value={this.state.mode} onChange={this.handleInputChange}>
                                                    <option value={"VIDEO"} selected>Virtual</option>
                                                    <option value={"AUDIO"}>Audio</option>
                                                    <option value={"INPERSON"}>In Person</option>
                                                </select>
                                            </div>
                                            <div className="w_sec w_sec_select_50  e-disabled">
                                                <h5>Video Link*</h5>
                                                <input
                                                    type="text"
                                                    className="input decorator decorator_indent-b_xl"
                                                    id="video_link"
                                                    placeholder="VideoConferencingLink"
                                                    name="video_link" value={this.state.video_link}
                                                    onChange={this.handleInputChange}
                                                    disabled={this.state.videolinkdisabled}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div style={{ paddingTop: 7, paddingLeft: 130 }}>
                                    <div className="w_sec w_sec_select_50" style={{ width: '75%' }}>
                                        <h5>Presenting Doctor*</h5>
                                        <select className="select" style={{ width: '300px' }} name="presenting_doc" value={this.state.presenting_doc} onChange={this.handleInputChange}>
                                            {
                                                this.state.docsList.map(
                                                    doc =>

                                                        <option value={doc.doctorId}>{doc.doctorName}</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className="w_sec w_sec_select_50" style={{ width: '75%' }}>
                                        <h5>Attending Doctors*</h5>
                                        <select className="select" style={{ width: '300px' }} id="attending_doc" name="attending_doc" multiple={true} value={this.state.attending_doc} onChange={this.handleChangeAttendingDoc}>
                                            {
                                                this.state.docsList.map(
                                                    doc =>

                                                        <option value={doc.doctorId}>{doc.doctorName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="w_sec w_sec_select_50" style={{ width: '75%' }}>
                                        <h5>Repeat Frequency</h5>
                                        <select className="select" id="frequency_in_days" name="frequency_in_days" value={this.state.frequency_in_days} onChange={this.handleInputChange}>
                                            <option value={0}>None</option>
                                            <option value={30}>Monthly</option>
                                            <option value={180}>Bi-Annual</option>
                                            <option value={120}>Tri-Annual</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div id="header_buttons">
                                <button onClick={this.handleSubmit}>Submit</button>
                            </div>

                        

                        </div>
                        <div id="tababc"></div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Edit;


