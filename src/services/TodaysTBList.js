import axios from 'axios';

const SpringTodaysTBApiUrl=process.env.REACT_APP_BASE_URL+"/getTodaysMeetingDetails/1";

class TodaysTBList{

    getApi(){
        return axios.get(SpringTodaysTBApiUrl);
    }
}
export default new TodaysTBList();