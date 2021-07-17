import axios from 'axios';

const PatientdetailsUrl="https://tumorboard-308606.el.r.appspot.com/getpatientillness?id=1";

class Local{

    getApipd(){
        return axios.get(PatientdetailsUrl);
    }
}


export default new Local();