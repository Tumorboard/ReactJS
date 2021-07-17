import axios from 'axios';

const NursenavigatorUrl=process.env.REACT_APP_BASE_URL+"/getNursenavigator";

class Nursenavigtor{

    getApi(){
        return axios.get(NursenavigatorUrl);
    }
}


export default new Nursenavigtor();