import '../components/Tumor.css' ;

import react from 'react';
import SpringApiMeetingDetails from '../services/MeetingDetails';
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


class ShowConclusion extends react.Component {

    constructor(props) {
        super(props)
        this.state = {
        Conclusion:[]
    } ;
} 
  

    componentDidMount() {
        axios.get(process.env.REACT_APP_BASE_URL + '/getConclusion/' + this.props.location.state.tbid)
          .then(res => {
            const Con = res.data;
            this.setState({ Conclusion: Con });
          })
    }

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
               <Link to={{pathname:"/Tumorboarddetails", state: { tbid: this.props.location.state.tbid }}}><button id="back">...back</button></Link>
                </div>
            </div>
            <div id="header_sec_3">
              <Link to="/LoginPage"> <i className="fas fa-user" /></Link>
            </div>
          </div>
        
                </div>
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px', background: '#eee' }}>

                    <div id="content_div">
                       

                            <div id="content_header"><h3>Conclusions</h3><h5>TBID:{this.props.location.state.tbid}</h5></div>
                            <div
                                id="container"
                                className="theme theme_font_neoskeuo theme_space_neoskeuo theme_color_neoskeuo"
                            >
                               <table class="table shadow-soft rounded">
                                    <thead>
                                        <tr>
                                            <td scope="row"> Type </td>
                                            <td scope="row"> Notes </td>
                                            <td scope="row"> Next Action </td>
                                            <td scope="row"> Date & Time </td>
                                            <td scope="row"> Responsible Doctor </td>
                                            <td scope="row">Priority </td>
                                            <td scope="row">Feedback </td>
                                            <td scope="row"> Assigned to (NN)</td>
                                            <td scope="row"> Added By </td>
                                            <td scope="row"> Added Date </td>
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
                                                        <td> {user.responsibleDr}</td>
                                                        <td> {user.priority}</td>
                                                        <td> {user.feedback}</td>
                                                        <td>{user.assignedToNursenav }</td>
                                                        <td>{user.addedBy}</td>
                                                        <td>{user.insertedTime}</td>
                                                       
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


export default ShowConclusion;


