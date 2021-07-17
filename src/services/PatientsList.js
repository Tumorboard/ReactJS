import axios from 'axios';

const SpringPatientsListApiUrl=process.env.REACT_APP_BASE_URL+"/getPatientDetailsKeyValue";

class PatientsList{

    getApi(){
        return axios.get(SpringPatientsListApiUrl);
    }
}
export default new PatientsList();