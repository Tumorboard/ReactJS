import axios from 'axios';

const SpringApiDocsListUrl="https://tumorboard-308606.el.r.appspot.com/getDoctorsDetails";

class DocsList{

    getApi(){
        return axios.get(SpringApiDocsListUrl);
    }
}
export default new DocsList();