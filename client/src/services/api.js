import axios from "axios";

let adminToken = "";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000/api").trim(),
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  if (adminToken) config.headers.Authorization = `Bearer ${adminToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
      adminToken = "";
      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

export const setAdminToken = (token = "") => {
  adminToken = token;
};

export default api;