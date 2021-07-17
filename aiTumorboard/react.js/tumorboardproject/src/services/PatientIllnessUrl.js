import axios from 'axios';

const PatientIllnessUrl="https://tumorboard-308606.el.r.appspot.com/getpatientillness?id=1";

class Service{

    getApi(){
        return axios.get(PatientIllnessUrl);
    }
}


export default new Service();