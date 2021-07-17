import react from 'react';
import SpringApiMeetingDetails from '../services/MeetingDetails';
import SpringApiDocsListUrl from '../services/DoctorsList';
import SpringPatientsListApiUrl from '../services/PatientsList';
import SpringTodaysTBApiUrl from '../services/TodaysTBList';
import '../components/Tumor.css';
import dateFormat from 'dateformat';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
import ReactSearchBox from 'react-search-box';
import Patient from '../Pages/Patientinterface';
import PageTitle from '../components/PageTitle';
import CreateForm from '../components/CreateForm';
import NursenavigatorUrl from '../services/NursenavigatorURL';
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Doctor extends react.Component {
    constructor(props) {
        var abc = "yes";
        super(props)
        this.state = {
            result: [],
            todaysTBList: [],
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
            status: "REQUESTED",
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
            values: [],
            userId: 1,
            varx: 1,
            aiOpinion: "YES",
            userName: "Dr.Brian",
            userRole: "Doctor",
            todayCount: 99,
            nurse:""
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

    componentDidMount () {
       // var userId = 1;
       const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('userId');
        const name = queryParams.get('userName');
        const role = queryParams.get('userRole');
        //alert("id:"+id) ;
        this.setState({ userName: name })
        this.setState({ userId: id })
        this.setState({ userRole: role })

        axios.get(process.env.REACT_APP_BASE_URL + '/getMeetingDetails/' + this.state.userId)
            .then(res => {
                const meetingDetails = res.data;
                this.setState({ result: meetingDetails });
            })

        SpringApiDocsListUrl.getApi().then((response) => {
            this.setState({ docsList: response.data })
        });

        SpringPatientsListApiUrl.getApi().then((response) => {
            this.setState({ patientsList: response.data })
        });

        NursenavigatorUrl.getApi().then((response) => {
            this.setState({ nurse: response.data })
        });
        

        
        
        if(role==null) {
            var userRole = this.props.location.state.userRole;
        this.setState({ userRole: userRole })}

        axios.get(process.env.REACT_APP_BASE_URL + '/getTodaysMeetingDetails/' + this.state.userId)
            .then(res => {
                const todayMeetingDetails = res.data;
                this.setState({ todaysTBList: todayMeetingDetails });
                if (todayMeetingDetails == "") {
                    this.setState({ todayCount: 0 })
                }
            })

        if ((this.props.location.state == undefined) || (this.state.varx == 0)) { } else {
            this.setState({ varx: this.props.location.state.start_time })
            var strToDate = dateFormat(this.props.location.state.start_time, 'yyyy-mm-dd');
            var toDate = dateFormat(new Date(), 'yyyy-mm-dd');
            if (strToDate != toDate) {
                this.activateMenuItem("createTB");
            }
        }
    };

    activateMenuItem(id) {

        const div = document.getElementById(id);
        if (id == "listTB") {
           // var userId = 1;
            axios.get(process.env.REACT_APP_BASE_URL + '/getMeetingDetails/' + this.state.userId)
                .then(res => {
                    const meetingDetails = res.data;
                    this.setState({ result: meetingDetails });
                })

            axios.get(process.env.REACT_APP_BASE_URL + '/getTodaysMeetingDetails/' + this.state.userId)
                .then(res => {
                    const todayMeetingDetails = res.data;
                    this.setState({ todaysTBList: todayMeetingDetails });
                })
        }
        document.getElementById("listTB").classList.remove('active');
        document.getElementById("createTB").classList.remove('active');
        document.getElementById("notification").classList.remove('active');
        document.getElementById("abc").classList.remove('active');
        div.classList.add('active');

        var activeTab = 'tab' + id;
        document.getElementById("tabcreateTB").style.display = "none";
        document.getElementById("tablistTB").style.display = "none";
        document.getElementById("tabnotification").style.display = "none";
        document.getElementById(activeTab).style.display = "block";

    };


    patientChange = event => {
        this.setState({ patientIdFk: event });
        fetch(process.env.REACT_APP_BASE_URL + '/getPatientDetailsByID/' + event)
            .then(response => response.json())
            .then((data) => {
                {
                    this.setState({ tbtype: data.cancertype });
                    this.setState({ presenting_doc: data.owning_doctor });
                }

                console.log("Patient name,type: " + data.name + "" + data.cancertype)

            })
            .catch(e => {
                console.log("error: " + e);
                alert("This Patient ID does not exist in the system");
                this.setState({ patientIdFk: 0 });
                this.setState({ tbtype: "General" });

            });
    };


    handleSubmit = event => {
        if (this.state.patientIdFk == 0) {
            alert("Please enter a valid Patient ID !!");
            return;
        }

        if (this.state.patientIdFk == "") {
            alert("Please enter Patient ID !!");
            return;
        }

        if ((this.state.mode == "VIDEO") && (this.state.video_link == "")) {
            alert("Please enter link for Video Conference !!");
            return;
        }

        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            name: this.state.tbtype,
            patientIdFk: this.state.patientIdFk,
            mode: this.state.mode,
            status: "REQUESTED",
            purpose: this.state.purpose,
            start_time: this.state.start_time,
            requested_time: this.state.start_time,
            end_time: "2025-12-12 12:12:12",
            duration: this.state.duration,
            location: this.state.location,
            video_link: this.state.video_link,
            priority: this.state.priority,
            frequency_in_days: this.state.frequency_in_days,
            inserted_time: "2018-06-06 12:12:12",
            updated_time: "2018-06-06 12:12:12",
            presenting_doc: this.state.presenting_doc,
            attending_doc: this.state.attending_doc.toString(),
            aiOpinion: this.state.aiOpinion,
            createdBy: this.state.userId,
            nurse:this.state.nurse
        }

        fetch(process.env.REACT_APP_BASE_URL + '/createTumorBoard', {
            method: "POST",
            body: JSON.stringify(requestOptions),
            headers: { "Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*" }
        })
            .then((response) => {
                if (!response.ok) {
                    alert("There is an error");
                    throw new Error(response.status);
                }
                else {
                    alert("TumorBoard Creation Complete");
                    return;
                }
            })
            .then(json => console.log(json));

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
                <div id="header" >
                 <div id="sub_header">
                        <div id="header_sec_1">
                            <img src="/logoo.jpg" alt="My logo" />
                        </div>
                        <div id="header_sec_2">
                            
                        </div>
                        <div id="header_sec_3">

                            <Link to="/LoginPage"> <i className="fas fa-user" /></Link>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px', background: '#eee' }}>
                    <div id="first_row">
                        <div className="neumorphic-card active" onClick={() => this.activateMenuItem("listTB")} id="listTB"><i className="fas fa-columns" /></div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("createTB")} id="createTB"><i className="fas fa-plus-square" /></div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("notification")} id="notification"><i className="fas fa-calendar-check" /></div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("abc")} id="abc"><i className="fas fa-cogs" /></div>
                    </div>
                    <div id="content_div">
                        <div id="header_sec_4"> {this.state.userRole}:<b>{this.state.userName}</b>
                                                 
                                                    </div>
                        <div id="tabcreateTB" style={{ display: "none" }}>

                            <div id="content_header">
                                <PageTitle title=" TumorBoard Meetings" />
                                <table class="table shadow-soft rounded">
                                    <thead>
                                        <tr >
                                            <td scope="row"> tbid </td>
                                            <td scope="row"> Type </td>
                                            <td scope="row"> PID/Name </td>
                                            <td scope="row"> Date & Time </td>
                                            <td scope="row"> Presenting Doctor </td>
                                            <td scope="row"> Purpose </td>
                                            <td scope="row">Join Meeting </td>
                                            <td scope="row"> Presentation </td>
                                            <td scope="row"> Status </td>
                                            <td scope="row"> Conclusion </td>
                                            <td scope="row">Details</td>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            this.state.result.map(
                                                user =>
                                                    <tr key={user.tbid}>
                                                        <td> {user.tbid}</td>
                                                        <td> {user.name}</td>
                                                        <td ><Link to={{ pathname: '/patient/' + user.patientIdFk, state: { patientID: user.patientIdFk,userRole: this.state.userRole } }} className="btn"style={{backgroundColor: "#df6420"}}>{user.patientIdFk}/{user.patientname}</Link></td>
                                                        <td> {user.start_time}</td>
                                                        <td> {user.doctorName}</td>
                                                        <td>{user.purpose}</td>
                                                        <td style={{ contentAlign: "center", paddingLeft: "50px" }}><a href={user.video_link} target="_blank"> {user.video_link != "" && <i class="fa fa-video-camera" aria-hidden="true"></i>}</a></td>
                                                        <td> {user.presentationlink}</td>
                                                        <td> {user.status}</td>

                                                        <td > <Link className="cons" to={{ pathname: "/conclusion", state: { tbid: user.tbid, patientIdFk: user.patientIdFk, start_time: user.start_time, userId: this.state.userId,userRole: this.state.userRole } }}><p style={{ color: "#df6420" }}>Conclusion</p></Link></td>
                                                        <td style={{ contentAlign: "center", paddingLeft: "30px", paddingTop: "30px" }}><Link to={{ pathname: '/Tumorboarddetails', state: { tbid: user.tbid, userRole: this.state.userRole } }}><i class="fa fa-info-circle"  aria-hidden="true"></i></Link></td> </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="tablistTB" >
                            {this.state.todayCount == 0 &&
                                <div id="content_header">
                                    <PageTitle title="Today's TumorBoard Meetings" />
                                    <p style={{ fontWeight: "bold", color: "#df6420", fontSize: "20px" }}>There are no TumorBoard meetings scheduled for today.</p>
                                </div>}
                            {this.state.todayCount != 0 &&
                                <div id="content_header">
                                    <h3 className="text-left">Today's TumorBoard Meetings</h3>
                                    <table class="table shadow-soft rounded">
                                        <thead>
                                            <tr>
                                                <td scope="row"> tbid </td>
                                                <td scope="row"> Type </td>
                                                <td scope="row"> PatientID/Name </td>
                                                <td scope="row"> Date & Time </td>
                                                <td scope="row"> Presenting Doctor </td>
                                                <td scope="row"> Purpose </td>
                                                <td scope="row">Join Meeting </td>
                                                <td scope="row"> Presentation </td>

                                                <td scope="row"> Conclusion </td>
                                                <td scope="row">Details</td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                this.state.todaysTBList.map(
                                                    user =>
                                                        <tr key={user.tbid}>
                                                            <td> {user.tbid}</td>
                                                            <td> {user.name}</td>
                                                            <td><Link to={{ pathname: '/patient/0', state: { patientID: user.patientIdFk,userRole: this.state.userRole } }} className="btn " style={{backgroundColor: "#df6420"}}> {user.patientIdFk}/{user.patientname}</Link></td>
                                                            <td> {user.start_time}</td>
                                                            <td> {user.doctorName}</td>
                                                            <td> {user.purpose}</td>
                                                            <td style={{ contentAlign: "center", paddingLeft: "50px" }}><a href={user.video_link} target="_blank"> {user.video_link != "" && <i class="fa fa-video-camera" aria-hidden="true"></i>}</a></td>
                                                            <td> {user.presentationlink}</td>

                                                            <td > <Link to={{ pathname: "/conclusion", state: { tbid: user.tbid, patientIdFk: user.patientIdFk, start_time: user.start_time } }}><p>Conclusion</p></Link></td>
                                                            <td style={{ contentAlign: "center", paddingLeft: "50px", paddingTop: "30px" }}><Link to={{ pathname: '/Tumorboarddetails', state: { tbid: user.tbid, userRole: this.state.userRole } }}><i class="fa fa-info-circle"  aria-hidden="true"></i></Link></td></tr>
                                                )}
                                        </tbody>
                                    </table>
                                </div>}
                        </div>

                       <div id="tabnotification" style={{ display: "none" }}>
                            <PageTitle title="Create New Tumorboard" />
                            <CreateForm userId={this.state.userId} />
                        </div>
                        <div id="tababc"></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Doctor;


