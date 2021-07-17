import axios from 'axios';

const MedicationsUrl="https://tumorboard-308606.el.r.appspot.com/getmedications?id=1";

class Medication{

    getApiM(){
        return axios.get(MedicationsUrl);
    }
}


export default new Medication();