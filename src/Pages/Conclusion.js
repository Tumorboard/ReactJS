import react from 'react';
import SpringApiMeetingDetails from '../services/MeetingDetails';
import SpringApiDocsListUrl from '../services/DoctorsList';
import SpringPatientsListApiUrl from '../services/PatientsList';
import NursenavigatorUrl from '../services/NursenavigatorURL';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

class Conclusion extends react.Component {

    constructor(props) {
        var abc = "yes";
        super(props)
        this.state = {
            docsList:[],
            nurseList:[],
            tbid:0,
            type: "Diagnosis",
            notes: "",
            nextaction: "",
            date_time: (moment()),
            responsibleDr: "",
            assignedToNursenav: "",
            priority: "",
            patientIdFk: 0,
            feedback:"",
            userId:1,
            start_time:""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    Changedate = (event) => {
        this.setState({
            date_time: event
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {

        var userRole = this.props.location.state.userRole;
        this.setState({ userRole: userRole })
        
        axios.get(process.env.REACT_APP_BASE_URL + '/getDoctorsDetails')
        .then(res => {
            const docsDetails = res.data;
            this.setState({ docsList: docsDetails });
        })

        NursenavigatorUrl.getApi().then((response) => {
            this.setState({ nurseList: response.data })
        });

        this.setState({tbid:this.props.location.state.tbid})
        this.setState({patientIdFk:this.props.location.state.patientIdFk})
        this.setState({start_time:this.props.location.state.start_time})
        this.setState({userId:this.props.location.state.userId})
    }

    handleSubmit = event => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            tbid:this.state.tbid,
            type: this.state.type,
            notes:this.state.notes,
            nextaction: this.state.nextaction,
            date_time: this.state.date_time,
            responsibleDr: this.state.responsibleDr,
            assignedToNursenav: this.state.assignedToNursenav,
            priority: this.state.priority,
            feedback:this.state.feedback,
            patientIdFk: this.state.patientIdFk,
            addedBy:this.state.userId
        }

        fetch(process.env.REACT_APP_BASE_URL + '/addConclusion', {
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
                    alert("Conclusion Added");
                    return;
                }
            })
            .then(json => console.log(json));
    }

    render() {
        const yesterday = moment().subtract(1, 'day');
        const disablePastDt = current => {
            return current.isAfter(yesterday);
        };

        return (
            <div>
                 <div id="header" style={{ background: '#eee' }}>
                 
          <div id="sub_header">
            <div id="header_sec_1">
                    <img src="/logoo.jpg" alt="My logo" />
            </div>
            <div id="header_sec_2">
              <div id="header_buttons">
                                {this.state.userRole == "doctor" && <button id="back"><Link to={{ pathname: '/doctor', state: { start_time: this.state.start_time,userRole: this.state.userRole,userName: this.state.userName  } }} className="btn btn-primary">Home</Link></button>}
                                {this.state.userRole != "doctor" && <button id="back"><Link to={{ pathname: '/tumorboardinterface', state: { start_time: this.state.start_time,userRole: this.state.userRole,userName: this.state.userName } }} className="btn btn-primary">Home</Link></button>}
                            </div>
            </div>
            <div id="header_sec_3">
              <Link to="/LoginPage"> <i className="fas fa-user" /></Link>
            </div>
          </div>
                </div>
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px', background: '#eee' }}>

                    <div id="content_div">
                        <div id="tabcreateTB">

                            <div id="content_header"><h3>Doctor's Conclusion Form</h3> <h5 className="field">TBID:{this.props.location.state.tbid} PatientID: {this.state.patientIdFk}</h5></div>
                            <div
                                id="container"
                                className="theme theme_font_neoskeuo theme_space_neoskeuo theme_color_neoskeuo"
                                style={{ display: "flex" }}
                            >
                                <div id="testModal" style={{ width: "70%" }}>

                                    <section>
                                        <div >

                                            <div style={{ display: "flex" }}>


                                                <div className="w_sec w_sec_select_50">
                                                     <h5 className="field">Treatment</h5>
                                                    <select className="select" name="type" value={this.state.type} onChange={this.handleInputChange}>
                                                        <option value="diagnosis">Diagnosis</option>
                                                        <option value="treatment">Treatment</option>
                                                        <option value="followup">Follow-Up</option>
                                                    </select>
                                                </div>
                                                
                                        <div >
                                            <div className="w_sec w_sec_select_50" >
                                                 <h5 className="field">Priority</h5>
                                                <select id="priority" className="select" name="priority" value={this.state.priority} onChange={this.handleInputChange}>
                                                    <option>High</option>
                                                    <option>Medium</option>
                                                    <option selected>Regular</option>
                                                </select>
                                            </div>
                                        </div>
                                            </div>
                                            <div style={{ display: "flex" }}>
                                            <div className="w_sec w_sec_select_50" style={{ width: "100%" }}>
                                                 <h5 className="field">Date*</h5>

                                                <DatePicker id="date_time" name="date_time" value={this.state.date_time} isValidDate={disablePastDt} minDate={new Date(2021, 4, 27)} onChange={this.Changedate} />
                                            </div>
                                            <div className="w_sec w_sec_select_50" style={{ width: "100%" }} >
                                                 <h5 className="field"> Responsible</h5>
                                                <select style={{ width: "100%" }} className="select" id="responsibleDr" name="responsibleDr" value={this.state.responsibleDr} onChange={this.handleInputChange}>
                                                <option value="" selected>Responsible Dr</option>
                                                    {
                                                        this.state.docsList.map(
                                                            doc =>

                                                                <option value={doc.doctorId}>{doc.doctorName}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="w_sec w_sec_select_50" style={{ width: '100%' }}>
                                                 <h5 className="field">Nurse Navigator </h5>
                                                <select className="select" id="assignedToNursenav" name="assignedToNursenav" value={this.state.assignedToNursenav} onChange={this.handleInputChange}>
                                                {
                                                        this.state.nurseList.map(
                                                            nur =>

                                                                <option value={nur.id}>{nur.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        
                                        </div>
                                        <div className="w_sec w_sec_select_50  e-disabled">
                                             <h5 className="field">Next course of Action</h5>
                                            <textarea  rows="3" cols="70"
                                                type="text"
                                                className="input decorator decorator_indent-b_xl"
                                                id="nextaction"
                                                placeholder="   Description..."
                                                name="nextaction" value={this.state.nextaction}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="w_sec w_sec_select_50  e-disabled">
                                            <textarea rows="3" cols="70"
                                                type="text"
                                                className="input decorator decorator_indent-b_xl"
                                                id="notes"
                                                placeholder="  Conclusion Notes..."
                                                name="notes" value={this.state.notes}
                                                onChange={this.handleInputChange}>
                                            </textarea>
                                        </div>
                                        
                                                       
                                    <div className="w_sec w_sec_select_50  e-disabled" style={{ width: "100%" }}>
                                        <textarea  rows="3" cols="70"
                                            type="text"
                                            className="input decorator decorator_indent-b_xl"
                                            id="feedback"
                                            placeholder="  Please provide your feedback against AI Opinion..."
                                            name="feedback" value={this.state.video_link}
                                            onChange={this.handleInputChange}
                                        />
                                         </div>
                                    </section> 
                                    
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

export default Conclusion;
