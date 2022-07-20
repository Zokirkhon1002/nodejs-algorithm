import axios from "axios";

const mainUrl = axios.create({
  baseURL: "http://localhost:5000",
});

export default mainUrl;
