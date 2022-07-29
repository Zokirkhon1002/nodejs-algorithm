import axios from "axios"
const mainURL = axios.create({
    baseURL : "http://localhost:8000"
})
export default mainURL;