import './App.css';
import Tumorboard from './components/Tumorboardinterface';
import Patient from './Componentspatient/Patientinterface';
import Doctor from './ComponentsDoctor/DoctorInterface';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/tumorboardinterface" component={Tumorboard}></Route>
        <Route path="/patient" component={Patient}></Route>
        <Route path="/doctor" component={Doctor}></Route>
      </Router>

    </div>
  );
}

export default App;
