import axios from "axios";

const api = axios.create({
  baseURL: "https://foodbridgesystem.onrender.com/api",
});

// Automatically add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;