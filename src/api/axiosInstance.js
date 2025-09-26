// // src/api/axiosInstance.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.82:6162",
});

// Assume you store token somewhere (localStorage/sessionStorage)
const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstance;
