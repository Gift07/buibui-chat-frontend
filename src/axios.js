import axios from "axios";
// base URLS
const baseURL = "http://localhost:8800/api";
// TOKENS
const access = localStorage.getItem("access");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: access ? `Bearer ${access}` : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
