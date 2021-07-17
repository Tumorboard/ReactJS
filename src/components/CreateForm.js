import './Tumor.css'
import React, { useEffect, useState } from "react";
import dateFormat from 'dateformat';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
import ReactSearchBox from 'react-search-box';
import { useForm } from "react-hook-form";
import CustomSelect from './/CustomSelect';
import axios from "axios";

const yesterday = moment().subtract(1, 'day');
const disablePastDt = current => {
  return current.isAfter(yesterday);
};

const customDates = ['2021-04-22', '2021-04-25', '2021-04-26'];
const disableCustomDt = current => {
  return !customDates.includes(current.format('YYYY-MM-DD'));
}

function CreateForm(props) {
  const [docsList, setDocsList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [patientIdFk, setPatientIdFk] = useState(1);
  const durationOptions = [{ value: "15", name: "15" }, { value: "30", name: "30" }, { value: "45", name: "45" }, { value: "60", name: "60" }];
  const repeatFrequency = [{ value: "0", name: "None" }, { value: "30", name: "Monthly" }, { value: "90", name: "Quarterly" }, { value: "180", name: "Half-Yearly" }, { value: "360", name: "Annual" }];
  const purposeOptions = [{ value: "Review", name: "Review" }, { value: "Follow-Up", name: "Follow-Up" }, { value: "Relapse", name: "Relapse" }, { value: "Others", name: "Others" }];
  const tbtypeOptions = [{ value: "General", name: "General" }, { value: "Breast", name: "Breast" }, { value: "Lung", name: "Lung" }, { value: "Brain", name: "Brain" }];
  const locationOptions = [{ value: "", name: "Select Location" }, { value: "Bangalore", name: "Bangalore" }, { value: "Chennai", name: "Chennai" }, { value: "Hyderabad", name: "Hyderabad" }];
  //const docsListOptions = [{ doctorId: "1", name: "Dr.B.Chandrasekhar Reddy" }, { doctorId: "2", name: "Dr.CH Ratna Kishore" }, { doctorId: "3", name: "Dr.Anjan Pyal" }, { doctorId: "4", name: "Dr.C.Nikhileshwar Reddy" }];
  //const patientsListOptions = [{ "key": 1, "value": 1 }, { "key": 2, "value": 2 }, { "key": 3, "value": 3 }, { "key": 4, "value": 4 }, { "key": 6, "value": 6 }, { "key": 7, "value": 7 }, { "key": 8, "value": 8 }, { "key": 9, "value": 9 }, { "key": 10, "value": 10 }, { "key": 11, "value": 11 }];
  const [duration, setDuration, counterRef] = useState();
  const [frequency_in_days, setFrequency_in_days] = useState(0);
  const [tbtype, setTbtype] = useState("General");
  const [purpose, setPurpose] = useState("Review");
  const [location, setLocation] = useState("");
  const [presenting_doc, setPresenting_doc] = useState("");
  const [attending_doc, setAttending_doc] = useState("");
  const [mode, setMode] = useState("VIDEO");
  const [priority, setPriority] = useState("Regular");
  const [start_time, setStart_time] = useState(moment());
  const [video_link, setVideo_link] = useState("");
  const [aiOpinion, setAIOpinion] = useState("");

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + '/getDoctorsDetails')
      .then(res => {
        const list = res.data;
        setDocsList(list);
      })

    axios.get(process.env.REACT_APP_BASE_URL + '/getPatientDetailsKeyValue')
      .then(res => {
        const list = res.data;
        setPatientsList(list);
      })

  }, [])

  function handleInputChange(id, abc) {
    if (id == "duration") setDuration(abc);
    if (id == "frequency_in_days") setFrequency_in_days(abc);
    if (id == "tbtype") setTbtype(abc);
    if (id == "purpose") setPurpose(abc);
    if (id == "location") setLocation(abc);
    if (id == "presenting_doc") setPresenting_doc(abc);
    if (id == "attending_doc") setAttending_doc(abc);
  }

  function handleAIChange(event) {
    if ((event.target.checked) == true) {
      setAIOpinion("YES");
    } else
      setAIOpinion("");
  }

  function handleRadioChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    const name = target.name;
    // alert("id: " + id + " target: " + target + " value: " + value + " name: " + name);
    if (name == "mode") setMode(value);
    if (name == "priority") setPriority(value);
    if (name == "video_link") setVideo_link(value);
  }


  function handleChangeAttendingDoc(event) {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setAttending_doc(value);
  }

  function Changedate(event) {
    setStart_time(event);
  };

  function patientChange(event) {
    //alert("event " + event);
    var result;
    setPatientIdFk(event);

    fetch(process.env.REACT_APP_BASE_URL + '/getPatientDetailsByID/' + event)
      .then(response => response.json())
      .then((data) => {
        {
          setTbtype(data.cancertype);
          setPresenting_doc(data.owning_doctor);
        }
        console.log("Patient name,type: " + data.name + "" + data.cancertype)
      })
      .catch(e => {
        console.log("error: " + e);
        alert("This Patient ID does not exist in the system");
        setPatientIdFk(0);
        setTbtype("General");
      });
  };

  function handleChangePresentingingDoc(event) {
    const target = event.target;
    const value = target.value;
    setPresenting_doc(value);
  }

  function handleSubmit() {
    alert("duration " + duration + " \nfrequency_in_days " + frequency_in_days + "\n tbtype: " + tbtype + "\n purpose " + purpose +
      "\n location " + location + "\npresenting_doc " + presenting_doc + "\nattending_doc " + attending_doc + "\nstart_time " + start_time + "\npatientid " + patientIdFk
      + "\nmode " + mode + "\npriority " + priority + "\nvideo_link " + video_link + "\naiopinion " + aiOpinion);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      name: tbtype,
      patientIdFk: patientIdFk,
      mode: mode,
      status: "REQUESTED",
      purpose: purpose,
      requested_time: start_time,
      start_time: start_time,
      end_time: "2025-12-12 12:12:12",
      duration: duration,
      location: location,
      video_link: video_link,
      priority: priority,
      frequency_in_days: frequency_in_days,
      inserted_time: "2018-06-06 12:12:12",
      updated_time: "2018-06-06 12:12:12",
      presenting_doc: presenting_doc,
      attending_doc: attending_doc.toString(),
      aiOpinion: aiOpinion,
      createdBy: props.userId
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
  }
  return (
    <div class="container" style={{ marginLeft: "0px", width: "100%" }} className="theme theme_font_neoskeuo theme_space_neoskeuo theme_color_neoskeuo" >
      <div class="row">
        <div class="col-3">
          <div >
            <h5 className="field">Patient ID/Mobile*</h5>
            <div>
              <ReactSearchBox
                type="text" name="patientIdFk"
                placeholder="Search for Patient ID"
                data={patientsList}
                onSelect={record => console.log("selected:" + record)}
                onFocus={() => {
                  console.log('This function is called when is focussed')
                }}
                onChange={patientChange}
                fuseConfigs={{
                  threshold: 0.05,
                }}
              />
            </div>
          </div>
        </div>

        <div class="col-3">
          <div>
            <h5 className="field">Date*</h5>
            <DatePicker className="dpck" id="start_time" name="start_time" inputProps={{ className: 'datetime' }}
              value={start_time}
              dateFormat={"DD-MM-YYYY"}
              isValidDate={disablePastDt}
              minDate={new Date(27, 4, 2021)}
              onChange={Changedate}
            />
          </div>
        </div>
        <div class="col-3">
          <div>
            <CustomSelect data={durationOptions} id="duration" name="duration" labelName="In Minutes" onSelectChange={handleInputChange} />
          </div>

        </div>
        <div class="col-3">
          <CustomSelect data={repeatFrequency} id="frequency_in_days" name="frequency_in_days" labelName="Repeat Frequency" onSelectChange={handleInputChange} />
        </div>
      </div>
      <div class="row" style={{ marginTop: "50px" }}>
        <div class="col-3">
          <CustomSelect data={tbtypeOptions} id="tbtype" name="tbtype" labelName="Tumor Board Type*" value={tbtype} onSelectChange={handleInputChange} />
        </div>
        <div class="col-3">
          <div>
            <CustomSelect data={purposeOptions} id="purpose" name="purpose" labelName="Purpose*" onSelectChange={handleInputChange} />
          </div>
        </div>
        <div class="col-3">
          <div>
            <CustomSelect data={locationOptions} id="location" name="location" labelName="Location" onSelectChange={handleInputChange} />
          </div>
        </div>
        <div class="col-3">
          <div className="forms">
            <h5 className="field">Priority</h5>

            <label for="rdo1">
              <input type="radio" id="rdo1" name="priority" value="Regular" defaultChecked onChange={handleRadioChange} />
              <span class="rdo"></span>
              <span>Regular</span>
            </label>
            <label for="rdo2">
              <input type="radio" id="rdo2" name="priority" value="Medium" onChange={handleRadioChange} />
              <span class="rdo"></span>
              <span>Medium</span>
            </label>
            <label for="rdo3">
              <input type="radio" id="rdo3" name="priority" value="High" onChange={handleRadioChange} />
              <span class="rdo"></span>
              <span>High</span>
            </label>

          </div>
        </div>
      </div>
      <div class="row" style={{ marginTop: "50px" }}>
        <div class="col-3">
          <div className="forms">
            <h5 className="field">Mode</h5>
            <label for="rdo4">
              <input type="radio" id="rdo4" name="mode" value="VIDEO" defaultChecked onChange={handleRadioChange} />
              <span class="rdo"></span>
              <span>Virtual</span>
            </label>
            <label for="rdo5">
              <input type="radio" id="rdo5" name="mode" value="AUDIO" onChange={handleRadioChange} />
              <span class="rdo"></span>
              <span>Audio</span>
            </label>
            <label for="rdo6">
              <input type="radio" id="rdo6" name="mode" value="INPERSON" onChange={handleRadioChange} />
              <span class="rdo"></span>
              <span>In Person</span>
            </label>

          </div>
        </div>
        <div class="col-3">
          <div>
            <h5 className="field">Video Link*</h5>
            <input
              type="text"
              className="input decorator decorator_indent-b_xl"
              id="video_link"
              placeholder="VideoConferencingLink"
              name="video_link"
              onChange={handleRadioChange}
            />
          </div>
        </div>
        <div class="col-3">
          <div >
            <h5 className="field">Presenting Doctor*</h5>
            <select className="select" id="presenting_doc" name="presenting_doc" value={presenting_doc} onChange={handleChangePresentingingDoc}>
              {docsList.map(doc => <option value={doc.doctorId}>{doc.doctorName}</option>)}
            </select>
          </div>
        </div>
        <div class="col-3">
          <div >
            <h5 className="field">Attending Doctors*</h5>
            <select className="select" id="attending_doc" name="attending_doc" onChange={handleChangeAttendingDoc} multiple={true}>
              {docsList.map(doc => <option value={doc.doctorId}>{doc.doctorName}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div class="row" style={{ marginTop: "50px" }}>

        <div class="col-3">
          <div style={{ display: "flex" }}>
            <input id="switch" name="aiOpinion" type="checkbox" class="switch" defaultChecked={false} onChange={handleAIChange} />
            <label for="switch" className="toggle">Toggle</label>
            <h5 className="field">AI Opinion</h5>
          </div>
        </div>
      </div>
      <div id="header_buttons">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default CreateForm;