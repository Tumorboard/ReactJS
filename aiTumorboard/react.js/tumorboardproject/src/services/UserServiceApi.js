import axios from 'axios';

const SpringApiUrl="https://tumorboard-308606.el.r.appspot.com/getMeetingDetails";

class Service{

    getApi(){
        return axios.get(SpringApiUrl);
    }
}
export default new Service();