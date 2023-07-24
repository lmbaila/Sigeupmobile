import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sigeup.up.ac.mz/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'S-AppId': 'base64:cLTbevn5ay7Tae+1o2gu2FnXmAlVlg5MphC+CwKaqAw=',
  },
});
// if(Token())
// api.defaults.headers.Authorization = `bearer ${Token()}`;


export default api;
