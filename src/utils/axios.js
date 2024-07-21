import axios from "axios";

const API_URL = 'https://authentication-cb803-default-rtdb.europe-west1.firebasedatabase.app';

const instance = axios.create({
    baseURL: API_URL,
})

instance.interceptors.request.use((config) => {
    const url = config.url;
    if (url !== undefined && (url.includes("signInWithPassword") || url.includes("signUp"))) {
        return config;
    }
    let token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    console.log(url, config)
    let params = new URLSearchParams()
    params.append("auth", token)
    config.params = params
    console.log(config)

    return config
})

export default instance