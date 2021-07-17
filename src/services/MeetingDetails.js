import axios from 'axios';

const SpringApiMeetingDetails=process.env.REACT_APP_BASE_URL+"/getMeetingDetails";

class Service{

    getApi(){
        return axios.get(SpringApiMeetingDetails);
    }
}
export default new Service();