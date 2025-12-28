import axios from "axios";

const api = axios.create({
  baseURL: "https://movie-time-backend.vercel.app/api",
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
