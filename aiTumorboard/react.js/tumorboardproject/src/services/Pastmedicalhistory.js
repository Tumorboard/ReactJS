import axios from 'axios';

const PastmedicalhistoryUrl="https://tumorboard-308606.el.r.appspot.com/getpastmedicalhistory?id=1";

class Pastmedhis{

    getApiPA(){
        return axios.get(PastmedicalhistoryUrl);
    }
}


export default new Pastmedhis();