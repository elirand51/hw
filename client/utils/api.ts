import axios from 'axios';
import {CURRENT_URL} from "@/contants";

const api = axios.create({
    baseURL: CURRENT_URL + '/api/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    res => res,
    error => {
        return Promise.reject(error);
    }
);

export default api;
