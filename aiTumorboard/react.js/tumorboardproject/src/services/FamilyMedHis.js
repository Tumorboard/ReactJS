import axios from 'axios';

const FamilyMedicalHisUrl="https://tumorboard-308606.el.r.appspot.com/getfamilymedicalhistory?id=1";

class Familymed{

    getApiF(){
        return axios.get(FamilyMedicalHisUrl);
    }
}


export default new Familymed();