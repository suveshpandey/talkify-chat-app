import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: "https://talkify-backend-a3cu.onrender.com/api", // Updated backend URL
    withCredentials: true
})