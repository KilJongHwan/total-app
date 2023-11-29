import axios from "axios";
import Common from "../utils/Common";

const Interceptor = axios.create({
  baseURL: Common.KH_DOMAIN,
});

Interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken && refreshToken !== "") {
        const newAccessToken = await Common.handleUnauthorized();
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          Interceptor.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;
          return Interceptor(originalRequest);
        } else {
          // 리프레시 토큰이 만료되었을 경우
          alert("토큰이 만료되었습니다.");
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default Interceptor;
