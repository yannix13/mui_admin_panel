import axios from "axios";
// const BASE_URL = 'http://localhost:5000'
const BASE_URL = 'https://mern-base-back.onrender.com/';

export default axios.create({
    withCredentials: true,
    headers: { 'Content-Type': 'application/json', 
                "Access-Control-Allow-Credentials": true},
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})