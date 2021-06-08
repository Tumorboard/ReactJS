import react from 'react';
import SpringApiUrl from '../services/UserServiceApi';
import SpringApiDocsListUrl from '../services/DoctorsList';
import SpringPatientsListApiUrl from '../services/PatientsList';
import NursenavigatorUrl from '../services/NursenavigatorURL';
//Gimport './Tumor.css';
//import axios from 'axios';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
//import { Multiselect } from 'multiselect-react-dropdown';
//import Select from "react-select";




import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class Conclusion extends react.Component {

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
            patientIdFk: 1,
            feedback:"",
            nurse:[]

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
        // alert("name:"+target.name) ;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }





    componentDidMount() {
        SpringApiDocsListUrl.getApi().then((response) => {
            this.setState({ docsList: response.data })
        });

        NursenavigatorUrl.getApi().then((response) => {
            this.setState({ nurse: response.data })
        });


    }


    handleSubmit = event => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },


            type: this.state.type,
            notes:this.state.notes,
            nextaction: this.state.nextaction,
            date_time: (moment()),
            responsible: this.state.responsible,
            docsList: [],
            nursenav: this.state.nursenav,
            priority: this.state.priority,
            feedback:this.state.feedback,
            patientIdFk: this.state.patientIdFk,
            nurse:[]
        }

        fetch('https://tumorboard-308606.el.r.appspot.com/addConclusion', {
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
        //.catch(err => console.log(err)); 


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
                        <div id="tabcreateTB">

                            <div id="content_header"><h3>Doctor's Conclusion Form</h3></div>
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
                                                    <h5>Treatment</h5>
                                                    <select className="select" name="type" value={this.state.type} onChange={this.handleInputChange}>
                                                        <option value="diagnosis">Diagnosis</option>
                                                        <option value="treatment">Treatment</option>
                                                        <option value="followup">Follow-Up</option>
                                                    </select>
                                                </div>
                                                
                                        <div >
                                            <div className="w_sec w_sec_select_50" >
                                                <h5 >Priority</h5>
                                                <select id="priority" className="select" name="priority" value={this.state.priority} onChange={this.handleInputChange}>
                                                    <option value={1}>High</option>
                                                    <option value={2}>Medium</option>
                                                    <option value={3} selected>Regular</option>
                                                </select>
                                            </div>

                                        </div>
                                
                                            </div>

                                            <div style={{ display: "flex" }}>
                                            <div className="w_sec w_sec_select_50" style={{ width: "100%" }}>
                                                <h5>Date*</h5>

                                                <DatePicker id="date_time" name="date_time" value={this.state.date_time} isValidDate={disablePastDt} minDate={new Date(2021, 4, 27)} onChange={this.Changedate} />
                                            </div>
                                            <div className="w_sec w_sec_select_50" style={{ width: "100%" }} >
                                                <h5 > Responsible</h5>
                                                <select style={{ width: "100%" }} className="select" id="responsible" name="responsible" value={this.state.responsible} onChange={this.handleInputChange}>
                                                    {
                                                        this.state.docsList.map(
                                                            doc =>

                                                                <option value={doc.doctorId}>{doc.doctorName}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="w_sec w_sec_select_50" style={{ width: '100%' }}>
                                                <h5>Nurse Navigator </h5>
                                                <select className="select" id="nav" name="nursenav" value={this.state.nursenav} onChange={this.handleInputChange}>
                                                {
                                                        this.state.nurse.map(
                                                            nur =>

                                                                <option value={nur.id}>{nur.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <section>
                                        <div style={{ display: "flex" }}>


                                            
                                           <div style={{ display: "flex" }}>
                                           

                                        </div>

                                        </div>
                                    </section>


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
                                        <div className="w_sec w_sec_select_50  e-disabled">
                                            <h5>Next course of Action</h5>
                                            <textarea  rows="3" cols="70"
                                                type="text"
                                                className="input decorator decorator_indent-b_xl"
                                                id="nextaction"
                                                placeholder="   Description..."
                                                name="nextaction" value={this.state.nextaction}
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </section>
                                    <section>
                                       
                                    </section>
                                   
                                    <section>
                                        
                                    </section>
                                   
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

                                    <div id="header_buttons">
                                        <button onClick={this.handleSubmit}>Submit</button>
                                    </div>
                                </div>

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


