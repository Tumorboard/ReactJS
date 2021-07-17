import axios from 'axios';

const NursenavigatorUrl="https://tumorboard-308606.el.r.appspot.com/getNursenavigator";

class Nursenavigtor{

    getApi(){
        return axios.get(NursenavigatorUrl);
    }
}


export default new Nursenavigtor();