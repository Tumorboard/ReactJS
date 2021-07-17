import axios from 'axios';

const SpringPatientsListApiUrl="https://tumorboard-308606.el.r.appspot.com/getPatientDetailsKeyValue";

class PatientsList{

    getApi(){
        return axios.get(SpringPatientsListApiUrl);
    }
}
export default new PatientsList();