import './App.css';
import Tumorboard from './Pages/Tumorboardinterface';
import Patient from './Pages/Patientinterface';
import Doctor from './Pages/DoctorInterface';
import Conclusion from './Pages/Conclusion';
import  TumorboardDetails from './Pages/TumorboardDetails';
import ShowConclusion from './Pages/ShowConclusion';
import LoginPage from './Pages/LoginPage';
import OTPLogin from './Pages/OTPLogin' ;
import EnterOTP from './Pages/EnterOTP' ;

import Edit from "./Pages/Edit";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  return (
    <div className="App">
      <Router>
        <Route path="/tumorboardinterface" component={Tumorboard}></Route>
        <Route path="/patient/:patientId" component={Patient}></Route>
        <Route path="/doctor" component={Doctor}></Route>
        <Route path="/conclusion" component={Conclusion}></Route>
        <Route path="/Tumorboarddetails" component={TumorboardDetails}></Route>
        <Route path="/OTPLogin" component={OTPLogin}></Route>
        <Route path="/EnterOTP/:mobile" component={EnterOTP}></Route>
        <Route path="/ShowConclusion" component={ShowConclusion}></Route>
        <Route path="/Edit" component={Edit}></Route>
        <Route path="/LoginPage" component={LoginPage}></Route>
         </Router>

    </div>
  );
}

export default App;
