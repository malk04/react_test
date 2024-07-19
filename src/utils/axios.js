import axios from "axios";

const API_URL = 'http://localhost:8080';

const instance = axios.create({
    baseURL: API_URL,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    return config
})

export default instance