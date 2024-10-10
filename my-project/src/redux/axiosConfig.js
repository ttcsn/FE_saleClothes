import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "./apiRequest";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      let date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        const newTokenData = await refreshToken(token);
        localStorage.setItem("token",newTokenData.result.token);
        config.headers["Authorization"] = "Bearer " + newTokenData.result.token;
      } else {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;