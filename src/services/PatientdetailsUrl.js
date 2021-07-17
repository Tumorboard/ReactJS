import axios from 'axios';

const PatientdetailsUrl=process.env.REACT_APP_BASE_URL+"/getpatientdetails?id=1";

class Local{

    getApipd(){
        return axios.get(PatientdetailsUrl);
    }
}


export default new Local();