import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: "https://talkify-chat-app-backend.onrender.com/api",
    withCredentials: true
})