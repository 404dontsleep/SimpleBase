import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (
    token &&
    config.url !== "/auth/login" &&
    config.url !== "/auth/register"
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
AxiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.token) localStorage.setItem("token", response.data.token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default AxiosInstance;
