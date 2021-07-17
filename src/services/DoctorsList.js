import axios from 'axios';

const SpringApiDocsListUrl=process.env.REACT_APP_BASE_URL+"/getDoctorsDetails";

class DocsList{

    getApi(){
        return axios.get(SpringApiDocsListUrl);
    }
}
export default new DocsList();