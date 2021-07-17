import react from 'react';
import SpringApiMeetingDetails from '../services/MeetingDetails';
import SpringApiDocsListUrl from '../services/DoctorsList';
import SpringPatientsListApiUrl from '../services/PatientsList';
import '../components/Tumor.css'
import dateFormat from 'dateformat';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import CreateForm from '../components/CreateForm';
import 'react-datetime/css/react-datetime.css';
import ReactSearchBox from 'react-search-box';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PageTitle from '../components/PageTitle';

class Tumorboard extends react.Component {

    constructor(props) {

        var abc = "yes";
        super(props)
        this.state = {
            result: [],
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
            priority: "",
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
            tasks: [],
            aiOpinion: "YES",
            userId: 1
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeAttendingDoc = this.handleChangeAttendingDoc.bind(this);
        this.patientChange = this.patientChange.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.handleAIChange = this.handleAIChange.bind(this);
    }

    handleDeleteRow(i) {
        let rows = [this.state.rows]
        rows.splice(i);
        this.setState({
            rows: rows
        })
    }

    Changedate = (event) => {
        this.setState({
            start_time: event
        });
    };

    handleAIChange = (event) => {
        alert("checked " + event.target.checked);
        if ((event.target.checked) == true) {
            this.setState({ aiOpinion: "YES" });
        }
        else this.setState({ aiOpinion: "" });
    }


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
        /*SpringApiMeetingDetails.getApi().then((response) => {
            this.setState({ result: response.data })
        }); */

        var userId = 1;
        axios.get(process.env.REACT_APP_BASE_URL + '/getMeetingDetails/' + userId)
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

        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('userId');
        const name = queryParams.get('userName');
        const role = queryParams.get('userRole');
        this.setState({ userName: name })
        this.setState({ userId: id })
        this.setState({ userRole: role })
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

        var activeTab = 'tab' + id;
        document.getElementById("tablistTB").style.display = "none";
        document.getElementById("tabcreateTB").style.display = "none";
        document.getElementById("tabnotification").style.display = "none";
        document.getElementById(activeTab).style.display = "block";
    };

    patientChange = event => {
        this.setState({ patientIdFk: event });
        fetch(process.env.REACT_APP_BASE_URL + '/getPatientDetailsByID/' + event)
            .then(response => response.json())
            .then((data) => {
                { this.setState({ tbtype: data.cancertype }); }
                this.setState({ presenting_doc: data.owning_doctor });
                console.log("Patient name,type,owning_doctor: " + data.name + "" + data.cancertype + + data.owning_doctor)
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
            createdBy: this.state.userId
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

        const customDates = ['22-04-2021', '22-04-2021', '22-04-2021'];
        const disableCustomDt = current => {
            return customDates.includes(current.format('DD-MM-YYYY'));
        }

        return (
            <div>
                <div id="header" >

                    <div id="sub_header">
                        <div id="header_sec_1">
                            <img src="/logoo.jpg" alt="My logo" />
                        </div>
                        <div id="header_sec_2">
                            <div id="header_buttons">
                                <Link to="/tumorboardinterface"><button id="tumorboard">Tumorboard</button></Link>
                                <Link to={{ pathname: "/patient/0", state: { userRole:this.state.userRole}}}><button id="patients" >Patients</button></Link>

                                
                            </div>
                        </div>
                        <div id="header_sec_3">

                           <Link to="/LoginPage"> <i className="fas fa-user" /></Link>

                        </div>
                    </div>

                </div>
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px' }}>
                    <div id="first_row">
                        <div className="neumorphic-card active" onClick={() => this.activateMenuItem("listTB")} id="listTB" title="Tumorboard Meetings"><i className="fas fa-columns" /></div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("createTB")} id="createTB" title="Create tumorboard"><i className="fas fa-plus-square" />
                        </div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("notification")} id="notification" title="Notification"><i className="fas fa-calendar-check" /></div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("abc")} id="abc" ><i className="fas fa-cogs" /></div>
                    </div>
                    <div id="content_div">
                        <div id="header_sec_4"> {this.state.userRole}:<b>{this.state.userName}</b>
                                                 
                                                    </div>
                       <div id="tabcreateTB" style={{ display: "none" }}>
                            <PageTitle title="Create New Tumorboard" />
                            <CreateForm userId={this.state.userId} />
                        </div>
                        <div id="tablistTB">
                            <div id="content_header">
                                <PageTitle title="TumorBoard Meetings" />
                                <table class="table shadow-soft rounded">
                                    <thead className="table_fields">
                                        <tr >
                                            <td scope="row"> TBID/Type </td>
                                            <td scope="row"> PId/Name </td>
                                            <td scope="row"> Date&Time </td>
                                            <td scope="row"> Presenting Doctor </td>
                                            <td scope="row"> Purpose </td>
                                            <td scope="row">Join Meeting </td>
                                            <td scope="row"> Presentation </td>
                                            <td scope="row"> AI Opinion </td>
                                            <td scope="row"> Status </td>
                                            <td scope="row">Details</td>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            this.state.result.map((
                                                user) =>
                                                <tr key={user.tbid} className="col">
                                                    <td> {user.tbid}/{user.name}</td>
                                                    <td> {user.patientIdFk}/{user.patientname}</td>
                                                    <td> {user.start_time, dateFormat(user.start_time, "mmmm dS , hh:mm TT")}</td>
                                                    <td> {user.doctorName}</td>
                                                    <td> {user.purpose}</td>
                                                    <td style={{ contentAlign: "center", paddingLeft: "50px" }}><a href={user.video_link} target="_blank"> {user.video_link != "" && <i class="fa fa-video-camera" aria-hidden="true"></i>}</a></td>
                                                    <td> {user.presentationlink}</td>
                                                    <td> {user.aiOpinion}</td>
                                                    <td> {user.status}</td>
                                                    <td style={{ contentAlign: "center", paddingLeft: "30px", paddingTop: "30px" }}><Link to={{ pathname: '/Tumorboarddetails', state: { tbid: user.tbid, userRole: this.state.userRole, userName: this.state.userName}}}><i class="fa fa-info-circle"  aria-hidden="true"></i></Link></td>
                                                    {/* <td><button onClick={this.handleDeleteRow}>Delete</button></td> */}
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>

                            </div>



                        </div>

                        <div id="tabnotification" style={{ display: "none" }}>
                            <div id="content_header">
                                <PageTitle title="Notification" />
                            </div>
                            <table class="table shadow-soft rounded">
                                <thead>
                                    <tr>
                                        <td scope="row">
                                            <b> Patient ID </b>
                                        </td>
                                        <td scope="row">
                                            <b> Tumor Board </b>
                                        </td>
                                        <td scope="row">
                                            <b> Date&Time </b>
                                        </td>
                                        <td scope="row">
                                            <b> Assigned By</b>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.result.map((user) => (
                                        <tr key={user.tbid}>
                                            <td> {user.tbid}</td>
                                            <td> {user.name}</td>
                                            <td> {user.start_time, dateFormat(user.start_time, "mmmm dS yy, hh:mm TT")}</td>
                                            <td> </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div id="tababc" >
                        </div>

                    </div>

                </div>

                
            </div>
        )
    }

}


export default Tumorboard;