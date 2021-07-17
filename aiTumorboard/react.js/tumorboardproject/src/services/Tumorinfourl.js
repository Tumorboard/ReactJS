import axios from 'axios';

const TumorInfoUrl="https://tumorboard-308606.el.r.appspot.com/gettumorinformation?id=1";

class Tumorinfo{

    getApiT(){
        return axios.get(TumorInfoUrl);
    }
}


export default new Tumorinfo();