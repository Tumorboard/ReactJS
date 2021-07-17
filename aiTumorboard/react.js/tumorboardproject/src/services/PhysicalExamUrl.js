import axios from 'axios';

const PhysicalExaminationUrl="https://tumorboard-308606.el.r.appspot.com/getphysicalexamination?id=1";

class Physicalexam{

    getApiP(){
        return axios.get(PhysicalExaminationUrl);
    }
}


export default new Physicalexam();