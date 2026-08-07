import axios from "axios";

// ===============================
// Base URL
// ===============================

const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000/api"
        : "https://textile-marketplace-zt3y.onrender.com/api";

const api = axios.create({
    baseURL: API_URL,

    headers: {
        "Content-Type": "application/json",
    },

    withCredentials: true,
});

// ===============================
// Attach JWT Token Automatically
// ===============================

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

// ===============================
// Handle Unauthorized Response
// ===============================

api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
        }

        return Promise.reject(error);
    }
);

export default api;