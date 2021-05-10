import axios from "axios";

export default axios.create({
    baseURL: 'https://quize-6144f-default-rtdb.firebaseio.com/'
})