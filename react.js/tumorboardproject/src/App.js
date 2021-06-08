import './App.css';
import Tumorboard from './components/Tumorboardinterface';
import Patient from './Componentspatient/Patientinterface';
import Doctor from './ComponentsDoctor/DoctorInterface';
import Conclusion from './ComponentsDoctor/Conclusion';
import  TumorboardDetails from './ComponentsDoctor/TumorboardDetails';
import CheckConclusion from './ComponentsDoctor/CheckConclusion';
import Edit from "./ComponentsDoctor/Edit";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Route exact path="/tumorboardinterface" component={Tumorboard}></Route>
        <Route path="/patient/:id?" component={Patient}></Route>
        <Route path="/doctor" component={Doctor}></Route>
        <Route path="/conclusion" component={Conclusion}></Route>
        <Route path="/Tumorboarddetails" component={TumorboardDetails}></Route>
        <Route path="/CheckConclusion" component={CheckConclusion}></Route>
        <Route path="/Edit" component={Edit}></Route>
      </Router>

    </div>
  );
}

export default App;
