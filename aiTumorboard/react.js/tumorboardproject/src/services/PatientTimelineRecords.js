import axios from 'axios';

const SpringApiTimelineRecordsListUrl="https://tumorboard-308606.el.r.appspot.com/timelineByID?id=1";

class TimelineRecordsList{

    getApi(){
        return axios.get(SpringApiTimelineRecordsListUrl);
    }
}
export default new TimelineRecordsList();