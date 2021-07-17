import axios from 'axios';

const SpringApiTHRecordsListUrl="https://tumorboard-308606.el.r.appspot.com/threcordsByID?id=1";

class THRecordsList{

    getApi(){
        return axios.get(SpringApiTHRecordsListUrl);
    }
}
export default new THRecordsList();