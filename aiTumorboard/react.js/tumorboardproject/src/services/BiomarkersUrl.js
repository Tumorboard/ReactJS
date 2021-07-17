import axios from 'axios';

const BiomarkersUrl="https://tumorboard-308606.el.r.appspot.com/getbiomarkers?id=1";

class Biomarker{

    getApiB(){
        return axios.get(BiomarkersUrl);
    }
}


export default new Biomarker();