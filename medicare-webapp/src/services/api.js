import axios from "axios";

const api = axios.create({
  baseURL: "https://medicare-webapi.herokuapp.com/api/v1/",
  "Access-Control-Allow-Origin": "*"
});

export default api;
