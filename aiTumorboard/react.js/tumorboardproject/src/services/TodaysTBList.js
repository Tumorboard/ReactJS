import axios from 'axios';

const SpringTodaysTBApiUrl="https://tumorboard-308606.el.r.appspot.com/getTodaysMeetingDetails";

class TodaysTBList{

    getApi(){
        return axios.get(SpringTodaysTBApiUrl);
    }
}
export default new TodaysTBList();