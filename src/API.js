import axios from 'axios'

const api = axios.create({
    baseURL: 'http://101.101.210.248/api',
    headers:{
        'Content-Type': 'application/json',
    }
})

export default api;
