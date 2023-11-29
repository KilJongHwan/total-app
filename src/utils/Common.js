import moment from "moment";
import axios from "axios";
import "moment/locale/ko"; // 한글 로컬라이제이션
moment.locale("ko"); // 한글 설정 적용

const Common = {
  KH_DOMAIN: "http://localhost:8111",
  KH_SOCKET_URL: "ws://localhost:8111/ws/chat",

  timeFromNow: (timestamp) => {
    return moment(timestamp).fromNow();
  },
  formatDate: (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  },

  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },

  // 401 에러 처리 함수
  handleUnauthorized: async () => {
    console.log("handleUnauthorized");
    const refreshToken = Common.getRefreshToken();
    const accessToken = Common.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${Common.KH_DOMAIN}/auth/refresh`,
        refreshToken,
        config
      );
      console.log(res.data);
      Common.setAccessToken(res.data);
      if (res.data) {
        Common.setAccessToken(res.data);
        return res.data;
      } else {
        throw new Error("Access token is not included in the response");
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default Common;
