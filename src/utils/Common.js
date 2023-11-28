import moment from "moment";
import axios from "axios";
import "moment/locale/ko"; // 한글 로컬라이제이션
moment.locale("ko"); // 한글 설정 적용

export const KH_DOMAIN = "http://localhost:8111";
export const KH_SOCKET_URL = "ws://localhost:8111/ws/chat";

const Common = {
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

  // 401 에러 처리 함수
  handleUnauthorized: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${KH_DOMAIN}/auth/refresh`,
        refreshToken,
        config
      );
      console.log(res.data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default Common;
