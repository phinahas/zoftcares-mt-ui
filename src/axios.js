import axios from 'axios'


const instance = axios.create({
    baseURL:'https://zoftcares-mt-api.vercel.app/api'  //'http://localhost:8080/api',
});

export default instance