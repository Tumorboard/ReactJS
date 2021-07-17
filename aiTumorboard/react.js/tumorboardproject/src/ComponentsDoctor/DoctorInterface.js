import react from 'react';
import SpringApiUrl from '../services/UserServiceApi';
import SpringApiDocsListUrl from '../services/DoctorsList';
import SpringPatientsListApiUrl from '../services/PatientsList';
//Gimport './Tumor.css';
//import axios from 'axios';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { Multiselect } from 'multiselect-react-dropdown';
import Select from "react-select";
import ReactSearchBox from 'react-search-box';

//https://stackoverflow.com/questions/56017457/react-select-multi-select-check-box-with-select-all
// <--input name="patient_id_fk" type="text" id="patient_id_fk" value={this.state.patient_id_fk} onChange={this.handleInputChange} onKeyPress={this.onKeyUp} /-->


class Doctor extends react.Component {


    // const [dt, setDt] = useState(moment());

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
            priority: 3,
            frequency_in_days: 0,
            //notes :$("#videoLink").val(),
            inserted_time: "2018-06-06 12:12:12",
            updated_time: "2018-06-06 12:12:12",

            patient_id_fk: "",
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
        this.patientChange = this.patientChange.bind(this);

    }



    Changedate = (event) => {
        this.setState({
            start_time: event
        });
    };



    handleInputChange(event) {

        const target = event.target;
        // alert("name:"+target.name) ;
        const value = target.value;
        const name = target.name;
        // alert(target + "  "+ name + "   "+value);
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
        SpringApiUrl.getApi().then((response) => {
            this.setState({ result: response.data })
        });

        SpringApiDocsListUrl.getApi().then((response) => {
            this.setState({ docsList: response.data })
        });

        SpringPatientsListApiUrl.getApi().then((response) => {
            this.setState({ patientsList: response.data })
        });


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
        //  alert("activeTab: " + activeTab);
        document.getElementById("tablistTB").style.display = "none";
        document.getElementById("tabcreateTB").style.display = "none";

        document.getElementById(activeTab).style.display = "block";

    };

    patientChange = event => {
        //alert(event) ;
        //   if (event.charCode === 13) {
        this.setState({ patient_id_fk: event });
        //  }
        // {this.setState({name: data.cancertype});}
        fetch('http://localhost:8080/cancerMoonshot/getPatientDetailsByID?id=' + event)
            .then(response => response.json())
            .then((data) => {
                { this.setState({ tbtype: data.cancertype }); }
                console.log("Patient name,type: " + data.name + "" + data.cancertype)
                // document.getElementById("alertText").style.display = "none";
            })
            .catch(e => {
                console.log("error: " + e);
                alert("This Patient ID does not exist in the system");
                this.setState({ patient_id_fk: 0 });
                this.setState({ tbtype: "General" });
                //   document.getElementById("alertText").style.display = "block";
                // this.setState({...this.state, isFetching: false});
            });
    };



    handleSubmit = event => {
        //   alert("id:" + this.state.patient_id_fk);

        if (this.state.patient_id_fk == 0) {
            alert("Please enter a valid Patient ID !!");
            return;
        }


        if (this.state.patient_id_fk == "") {
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
            patient_id_fk: this.state.patient_id_fk,
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
            attending_doc: this.state.attending_doc.toString()
        }

        fetch('http://localhost:8080/cancerMoonshot/trial', {
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

                </div>
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px', background: '#eee' }}>
                    <div id="first_row">
                        <div className="neumorphic-card active" onClick={() => this.activateMenuItem("listTB")} id="listTB"><i className="fas fa-columns" /></div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("createTB")} id="createTB"><i className="fas fa-plus-square" /></div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("notification")} id="notification"><i className="fas fa-calendar-check" /></div>
                        <div className="neumorphic-card" onClick={() => this.activateMenuItem("abc")} id="abc"><i className="fas fa-cogs" /></div>
                    </div>
                    <div id="content_div">
                        <div id="tabcreateTB" style={{ display: "none" }}>

                            <div id="content_header"><h3>Create New Tumorboard</h3></div>
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
                                                    <h5>Patient ID/Mobile No*</h5>
                                                    <ReactSearchBox
                                                        className="select" name="patient_id_fk"
                                                        placeholder="Search for Patient ID"
                                                        data={this.state.patientsList}
                                                        onSelect={record => console.log("selected:" + record)}
                                                        onFocus={() => {
                                                            console.log('This function is called when is focussed')
                                                        }}
                                                        onChange={this.patientChange}
                                                        fuseConfigs={{
                                                            threshold: 0.05,
                                                        }}

                                                    />
                                                </div>

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
                                                    <option value={1}>High</option>
                                                    <option value={2}>Medium</option>
                                                    <option value={3} selected>Regular</option>
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
                        <div id="tablistTB">
                            <div id="content_header">
                                <h3 className="text-left">TumorBoard meetings</h3>
                                <table class="table shadow-soft rounded">
                                    <thead>
                                        <tr style={{ textAlign: "center", fontWeight: "bolder", color: "#3498DB" }}>
                                            <td scope="row" > ID </td>
                                            <td scope="row"> Type </td>
                                            <td scope="row"> PatientID/Name </td>
                                            <td scope="row"> Date & Time </td>
                                            <td scope="row"> Presenting Doctor </td>
                                            <td scope="row"> Purpose </td>
                                            <td scope="row"> Priority </td>
                                            <td scope="row">Join Meeting </td>
                                            <td scope="row"> Presentation </td>
                                            <td scope="row"> AI Opinion </td>
                                            <td scope="row"> Status </td>
                                            <td scope="row">Details</td>


                                        </tr>

                                    </thead>
                                    <tbody style={{ fontWeight: "bold" }}>
                                        {
                                            this.state.result.map(
                                                user =>
                                                    <tr key={user.tbid}>
                                                        <td> {user.tbid}</td>
                                                        <td> {user.name}</td>
                                                        <td> {user.patient_id_fk}/{user.patientname}</td>
                                                        <td> {user.start_time}</td>
                                                        <td> {user.doctorName}</td>
                                                        <td> {user.purpose}</td>
                                                        <td style={{ textAlign: "center" }}> {user.priority}</td>
                                                        <td style={{ contentAlign: "center", paddingLeft: "50px" }}><a href={user.video_link} target="_blank"> {user.video_link != "" && <i class="fa fa-video-camera" aria-hidden="true"></i>}</a></td>
                                                        <td> {user.presentationlink}</td>

                                                        <td> {user.aiopinionlink}</td>
                                                        <td> {user.status}</td>
                                                        <td style={{ contentAlign: "center", paddingLeft: "50px" }}><i class="fa fa-info-circle" style={{ color: "blue" }} aria-hidden="true"></i></td>
                                                    </tr>
                                            )
                                        }

                                    </tbody>
                                </table>

                            </div>



                        </div>

                        <div id="tabnotification" style={{ display: "none" }}>
                            <div id="content_header">
                                <h3 className="text-left">Notification</h3>
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
                                            <td> {user.start_time}</td>
                                            <td> </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div id="tababc"></div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Doctor;


