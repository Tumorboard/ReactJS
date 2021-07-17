import axios from 'axios';

const AllergiesUrl="https://tumorboard-308606.el.r.appspot.com/getallergies?id=1";

class All{

    getApiU(){
        return axios.get(AllergiesUrl);
    }
}


export default new All();