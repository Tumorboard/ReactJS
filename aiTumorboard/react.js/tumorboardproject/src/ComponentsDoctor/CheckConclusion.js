import './Tumor.css';

import '../ComponentsDoctor/Tumor.css'

import react from 'react';
import SpringApiUrl from '../services/UserServiceApi';
import SpringApiDocsListUrl from '../services/DoctorsList';
import SpringPatientsListApiUrl from '../services/PatientsList';
import NursenavigatorUrl from '../services/NursenavigatorURL';
//Gimport './Tumor.css';
import axios from 'axios';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
//import { Multiselect } from 'multiselect-react-dropdown';
//import Select from "react-select";




import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import CheckConclusionUrl from '../services/CheckConclusionUrl';


class CheckConclusion extends react.Component {

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
            feedback: "",
            nurse: [],
            result: [],
            Conclusion: []
            
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.patientChange = this.patientChange.bind(this);
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
        SpringApiDocsListUrl.getApi().then((response) => {
            this.setState({ docsList: response.data })
        });

       
        SpringApiUrl.getApi().then((response) => {
            this.setState({ result: response.data })
        });

         SpringPatientsListApiUrl.getApi().then((response) => {
      this.setState({ patientsList: response.data })
    });
    if (this.props.location.state == undefined)
      return;
    this.patientChange();
  

       // CheckConclusionUrl.getApiC().then((response) => {
          //  this.setState({ Conclusion: response.data })
       // });
    }

    
  patientChange = event => {
    var x = 0;
    if (event == undefined) {
      // alert("undefined")
      x = this.props.location.state.patientID;
    }
    //else x = event.value;


    
        axios.get('https://tumorboard-308606.el.r.appspot.com/getCheckconclusion?id=' + x)
          .then(res => {
            const Con = res.data;
            this.setState({ Conclusion: Con });
          })
       
          .catch(e => {
            console.log("error: " + e);
            alert("This Patient ID does not exist in the system");
    
          });
    
      };


    handleSubmit = event => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },


            type: this.state.type,
            notes: this.state.notes,
            nextaction: this.state.nextaction,
            date_time: (moment()),
            responsible: this.state.responsible,
            docsList: [],
            nursenav: this.state.nursenav,
            priority: this.state.priority,
            feedback: this.state.feedback,
            patientIdFk: this.state.patientIdFk,
            nurse: []
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

                </div>
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px', background: '#eee' }}>

                    <div id="content_div">
                       

                            <div id="content_header"><h3>Conclusions</h3></div>
                            <div
                                id="container"
                                className="theme theme_font_neoskeuo theme_space_neoskeuo theme_color_neoskeuo"
                            >
                               <table class="table shadow-soft rounded">
                                    <thead>
                                        <tr style={{  fontWeight: "bolder", color: "#3498DB" }}>
                                            <td scope="row"> Type </td>
                                            <td scope="row"> Notes </td>
                                            <td scope="row"> Next Action </td>
                                            <td scope="row"> Date & Time </td>
                                            <td scope="row"> Responsible Doctor </td>
                                            <td scope="row">Priority </td>
                                            <td scope="row">Feedback </td>
                                            <td scope="row"> Doctor id </td>
                                            


                                        </tr>

                                    </thead>
                                    <tbody style={{ fontWeight: "bold" }}>
                                        {
                                            this.state.Conclusion.map(
                                                user =>
                                                    <tr key={user.id}>
                                                        <td> {user.type}</td>
                                                        <td>{user.notes}</td>
                                                        <td> {user.nextaction}</td>
                                                        <td> {user.date_time}</td>
                                                        <td> {user.responsible}</td>
                                                        <td> {user.priority}</td>
                                                        <td> {user.feedback}</td>
                                                        <td>{user.dr_id}</td>
                                                       
                                                    </tr>
                                            )
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


export default CheckConclusion;


