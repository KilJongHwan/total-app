import axios from "axios";
import { useEffect, useState } from "react";

const useWeather = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 }); // 위도, 경도
  const [coords, setCoords] = useState(""); // 기상청 좌표
  const [addr, setAddr] = useState(""); // 주소
  const [temp, setTemp] = useState(""); // 온도
  const [intervalId, setIntervalId] = useState(null); // 갱신 주기를 관리하기 위한 상태
  const updateInterval = 60000; // 주기적 갱신 간격 (예: 1분)

  // 현재 위치 기져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  // 현재 위치 가져오기
  const onSuccess = (position) => {
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };

  const onError = (error) => {
    console.log(error);
  };
  // 현재 위치가 변경되면 주소를 가져온다.
  useEffect(() => {
    console.log(location.lat, location.long);
    getGeocodeKakao(location.lat, location.long);
  }, [location]);
  // 주소 가져 오기(카카오 API 이용)
  const getGeocodeKakao = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK 78a8aa1e1e9b342d32a0518005cf3cc5`,
          },
        }
      );
      const fullAddress = response.data.documents[0].address;
      const neighborhoodAddress = `${fullAddress.region_1depth_name} ${fullAddress.region_2depth_name} ${fullAddress.region_3depth_name}`;
      setAddr(neighborhoodAddress); // context에 저장
    } catch (error) {
      console.error("Kakao Geocoding error:", error);
    }
  };
  // 주소가 변경되면 좌표 변환을 실행한다.
  useEffect(() => {
    if (addr) {
      dfs_xy_conv("toXY", location.lat, location.long);
    }
  }, [addr]);

  // 주소가 변경되면 좌표 변환을 실행한다.
  useEffect(() => {
    if (addr) {
      dfs_xy_conv("toXY", location.lat, location.long);
    }
  }, [addr]);

  // 좌표가 변경되면 날씨 정보를 가져온다.
  useEffect(() => {
    if (coords) {
      getWeather();
      // 주기적 갱신 설정
      if (!intervalId) {
        const newIntervalId = setInterval(() => {
          getWeather();
        }, updateInterval);
        setIntervalId(newIntervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [coords]);

  function dfs_xy_conv(code, v1, v2) {
    const RE = 6371.00877; // 지구 반경(km)
    const GRID = 5.0; // 격자 간격(km)
    const SLAT1 = 30.0; // 투영 위도1(degree)
    const SLAT2 = 60.0; // 투영 위도2(degree)
    const OLON = 126.0; // 기준점 경도(degree)
    const OLAT = 38.0; // 기준점 위도(degree)
    const XO = 43; // 기준점 X좌표(GRID)
    const YO = 136; // 기1준점 Y좌표(GRID)

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    let rs = {};
    if (code === "toXY") {
      rs["lat"] = v1;
      rs["lng"] = v2;
      let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
      ra = (re * sf) / Math.pow(ra, sn);
      let theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    } else {
      rs["x"] = v1;
      rs["y"] = v2;
      let xn = v1 - XO;
      let yn = ro - v2 + YO;
      let ra = Math.sqrt(xn * xn + yn * yn);
      if (sn < 0.0) ra = -ra;
      var alat = Math.pow((re * sf) / ra, 1.0 / sn);
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

      let theta = 0.0;
      if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5;
          if (xn < 0.0) theta = -theta;
        } else theta = Math.atan2(xn, yn);
      }
      var alon = theta / sn + olon;
      rs["lat"] = alat * RADDEG;
      rs["lng"] = alon * RADDEG;
    }
    setCoords({ x: rs.x, y: rs.y });
  }

  const getWeather = async () => {
    console.log("weather Call", coords.x, coords.y);
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/weather2?x=${coords.x}&y=${coords.y}`
      );
      console.log(response.data);
      setTemp(response.data.tmp); // context에 저장
    } catch (error) {
      console.error("Weather error:", error);
    }
  };

  return { addr, temp };
};
export default useWeather;
