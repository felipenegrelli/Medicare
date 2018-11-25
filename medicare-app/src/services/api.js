import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://10.0.2.2:3333/',
//   'Access-Control-Allow-Origin': '*'
// });



const api = axios.create({
  baseURL: 'https://medicare-webapi.herokuapp.com/api/v1/',
  'Access-Control-Allow-Origin': '*'
});




export default api;
