import '../ComponentsDoctor/Tumor.css'
import react from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
            status:"REQUESTED" 
        };

         this.handledeleteStatus = this.handledeleteStatus.bind(this);
    }

    componentDidMount() {
        var x =  this.props.location.state.tbid;
        this.setState({tbid:x})
        axios.get('https://tumorboard-308606.el.r.appspot.com/getTumorboardDetails?tbid='+ x)
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
           
        axios.get('https://tumorboard-308606.el.r.appspot.com/getDoctorsDetailsByPatientId?patientId='+ x)
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
                    alert("TumorBoard status delete");
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
                       

                            <div id="content_header"><h3>TumorBoard Details</h3></div>
                            <div
                                id="container"
                                className="theme theme_font_neoskeuo theme_space_neoskeuo theme_color_neoskeuo">
                                <table class="table shadow-soft rounded">
                                        <tbody style={{ display: "block"}}>
                                        {<tr>
                                                        <div style={{ display: "flex"}} className="neumorphic-cardd">  
                                                        
                                                        <div  style={{ width:"100%"}} style={{ width:"100%"}}><b>PatientID/Name:</b>  <Link to={{ pathname: '/patient', state: { patientID: this.state.patientIdFk } }} className="btn btn-primary"> {this.state.patientIdFk}/{this.state.patientname}</Link></div>
                                                        <div  style={{ width:"100%"}}><b>Date & Time:</b> <p>{this.state.start_time}</p></div>
                                                        <div  style={{ width:"100%"}}> <b>Priority: </b>{this.state.priority}</div>
                                                        </div>
                                                        <div style={{ }} className="neumorphic-cardd">
                                                        <div  style={{ width:"100%"}}> <b>Created Date & Time:</b>{this.state.inserted_time}</div>
                                                        <div  style={{ width:"100%"}}> <b>TumorBoard Type:</b> {this.state.name}</div>
                                                        <div  style={{ width:"100%"}}>  <b>Presenting Doctor:</b>{this.state.doctorName}</div>
                                                        <div  style={{ width:"100%"}}> <b> Attending Doctor:</b>{this.state.attending_doc}</div>
                                                        <div  style={{ width:"100%"}}> <b>Created by:</b>Mary</div>
                                                        <div><b>AI Opinion:</b></div>
                                                        <div><b>Notes:</b></div>
                                                        <div><b>Video link:</b>{this.state.video_link}</div>
                                                        <div  style={{ width:"100%"}}> <b>Point of Discussion:</b>Patient Presents with severe hypercalceminia and diffuse hypercalceminia </div>
                                                       
                                                        <div  style={{ width:"100%"}}> <b>Mode:</b> <a href={this.state.video_link} target="_blank"> {this.state.video_link != "" && <i class="fa fa-video-camera" aria-hidden="true"></i>}</a></div>
                                                        {/* <div  style={{ width:"100%"}}><b>Status:</b><span style={{ color:'green'}}>Completed</span></div>*/}
                                                        <div  style={{ width:"100%"}}><b>Conclusion:</b><Link to={{ pathname: '/CheckConclusion', state: { patientID: this.state.patientIdFk } }} id="CheckConclusion">Check Conclusion</Link></div> 
                                                        </div>
                                                        <div id="header_buttons">
                                                        <Link to={{ pathname: '/Edit', state: { tbid: this.state.tbid }}} id="CheckConclusion"><button> Edit</button></Link>
                                                        <button onClick={this.handledeleteStatus}>Delete</button>
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


