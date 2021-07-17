import axios from 'axios';

const TumorInfoUrl=process.env.REACT_APP_BASE_URL+"/gettumorinformation?id=1";

class Tumorinfo{

    getApiT(){
        return axios.get(TumorInfoUrl);
    }
}


export default new Tumorinfo();