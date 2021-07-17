import axios from 'axios';

const ComorbiditiesUrl="https://tumorboard-308606.el.r.appspot.com/getcomorbidities?id=1";

class Como{

    getApiC(){
        return axios.get(ComorbiditiesUrl);
    }
}


export default new Como();