import '../components/Tumor.css' ;
import react from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import dateFormat from 'dateformat';

class TumorboardDetails extends react.Component {
    constructor(props) {
        var abc = "yes";
        super(props)
        this.state = {
            type: "Diagnosis",
            notes: "",
            nextaction: "",
            date_time: (moment()),
            responsible: "",
            docsList: [],
            nursenav: "",
            priority: "",
            patientIdFk: 0,
            inserted_time:"",
            patientName: "",
            feedback: "",
            nurse: [],
            result: {},
            start_time:"",
            name:"",
            tbid:"",
            status:"REQUESTED" ,
            varabc : 1,
            videolinkdisabled: false,
        };

         this.handledeleteStatus = this.handledeleteStatus.bind(this);
    }

    componentDidMount() {
        
        var x =  this.props.location.state.tbid;
        this.setState({tbid:x})
        //alert("in tb details"+this.props.location.state.userRole)
        var userRole = this.props.location.state.userRole;
        var userName = this.props.location.state.userName;
        this.setState({ userRole: userRole })
        this.setState({ userName: userName })

       

        axios.get(process.env.REACT_APP_BASE_URL + '/getTumorboardDetails?tbid='+ x)
        .then(res => {
          const pdetails = res.data;
          this.setState({ start_time: pdetails.start_time })
          this.setState({ priority: pdetails.priority })
          this.setState({ patientIdFk: pdetails.patientIdFk })
          this.setState({ patientname: pdetails.patientname })
          this.setState({ name: pdetails.name })
          this.setState({ doctorName: pdetails.doctorName })
          this.setState({ video_link: pdetails.video_link })
          this.setState({ name: pdetails.name })
          this.setState({ purpose: pdetails.purpose })
          this.setState({ requested_time: pdetails.requested_time })
          this.setState({ duration: pdetails.duration })
          this.setState({ location: pdetails.location })
          this.setState({ status: pdetails.status })
          this.setState({ presenting_doc: pdetails.presenting_doc })
          this.setState({ attending_doc: pdetails.attending_doc })
          this.setState({ inserted_time: pdetails.inserted_time })
           })
         axios.get(process.env.REACT_APP_BASE_URL + '/getAttendingDocsByTbid?tbid='+ x)
        .then(res => {
          const pdetails = res.data;
          this.setState({ attending_doc: pdetails})
        })

    }

    handledeleteStatus () {
       // event.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            name: this.state.name,
            patientIdFk: this.state.patientIdFk,
            mode: this.state.mode,  
            purpose: this.state.purpose,
            start_time: this.state.start_time,
            requested_time: this.state.start_time,
            duration: this.state.duration,
            location: this.state.location,
            video_link: this.state.video_link,
            priority: this.state.priority,
            frequency_in_days: this.state.frequency_in_days,
            status: "DELETED",
            presenting_doc: this.state.presenting_doc,
            attending_doc: this.state.attending_doc,
            inserted_time:this.state.inserted_time
        }
           
        fetch(process.env.REACT_APP_BASE_URL+'/update/' + this.state.tbid, {
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
                    alert("TumorBoard status updated to : Deleted");
                    window.open(process.env.REACT_APP_URL+"/doctor","_self")
                    return;
                }
            })
            .then(json => console.log(json));
    };

    render() {
        return (
            <div>
                <div id="header" style={{ background: '#eee' }}>
                 
          <div id="sub_header">
            <div id="header_sec_1">
                    <img src="/logoo.jpg" alt="My logo" />
            </div>
            <div id="header_sec_2">
              <div id="header_buttons">
                                {this.state.userRole == "doctor" && <Link to={{ pathname: '/doctor', state: { start_time: this.state.start_time,userRole: this.state.userRole,userName: this.state.userName } }} ><button id="back">Home</button></Link>}
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
                       
                        <div id="header_sec_4"> {this.state.userRole}:<b>{this.state.userName}</b>
                                                 
                                                    </div>

                            <div id="content_header"><h3>TumorBoard Details</h3>
                            <h5 className="field">TBID:{this.props.location.state.tbid} </h5>
                            </div>
                            <div
                                id="container"
                                className="theme theme_font_neoskeuo theme_space_neoskeuo theme_color_neoskeuo">
                                <table class="table shadow-soft rounded">
                                        <tbody >
                                        {<tr>
                                                        <div style={{ display: "flex"}} className="neumorphic-cardd">  
                                                        
                                                        <div  style={{ width:"100%",display: "flex"}} ><b>PatientID/Name:</b><p>{this.state.patientIdFk}/{this.state.patientname}</p>  </div>
                                                        <div  style={{ width:"100%",display: "flex"}}><b>Date & Time:</b> <p>{this.state.start_time}</p></div>
                                                        <div  style={{ width:"100%",display: "flex"}}> <b>Priority: </b>{this.state.priority}</div>
                                                        </div>
                                                        <div style={{ }} className="neumorphic-cardd">
                                                         <ul class="alignMe">
                                            <li><b>Created Date & Time</b> {this.state.inserted_time}</li>
                                            <li><b>TumorBoard Type</b> {this.state.name}</li>
                                            <li><b>Presenting Doctor</b>{this.state.doctorName}</li> 
                                            <li><b>Attending Doctor</b>{this.state.attending_doc}</li>
                                            <li><b>Created by</b>Mary</li>
                                            <li><b>AI Opinion</b></li>
                                            <li><b>Notes</b></li>
                                            <li><b>Status</b>{this.state.status}</li>
                                            <li><b>Presentation</b></li>
                                            <li><b>Video link</b>{this.state.video_link}</li>
                                            <li><b>Purpose</b>{this.state.purpose}</li>
                                            <li><b>Mode</b><a href={this.state.video_link} target="_blank"> {this.state.video_link != "" && <i class="fa fa-video-camera" aria-hidden="true"></i>}</a></li>
                                            <li><b>Conclusion</b><Link to={{ pathname: '/ShowConclusion', state: { tbid: this.state.tbid, userRole: this.state.userRole } }} id="CheckConclusion">Show Conclusions</Link></li>
                                        </ul>
                                                        </div>
                                                        <div id="header_buttons">
                                                        <Link to={{ pathname: '/Edit', state: { tbid: this.state.tbid, userRole: this.state.userRole }}} id="ShowConclusion"><button> Edit</button></Link>
                                                       { this.state.status != "DELETED" && <button onClick={this.handledeleteStatus} >Delete</button>}
                                    </div>
                                                    </tr>
                                      
                                        }

                                    </tbody>
                                                                   </table>

                            </div>


                        



                       
                    </div>
                </div>
            </div>
        )
    }

}


export default TumorboardDetails;


