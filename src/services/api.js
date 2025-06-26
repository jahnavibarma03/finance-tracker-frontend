import axios from "axios";

const API = axios.create({
  baseURL: "https://finance-backend-1epq.onrender.com/api",
  withCredentials: true,
});

// Send token with every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
