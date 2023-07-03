import axios from "axios";
// import { useSelector } from "react-redux";

// const token = localStorage.getItem("token");

let api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer ' + token,
  },
  withCredentials: true,
});

export default api;
