import axios from 'axios';



const CancerinfoUrl="https://tumorboard-308606.el.r.appspot.com/getcancerinfo?id=1";

class Caninfo{

    getApis(){
        return axios.get(CancerinfoUrl);
    }
}


export default new Caninfo();