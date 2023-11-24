import { useNavigate } from "react-router-dom";
import { ButtonContainer, TransBtn } from "../component/menu/ButtonContainer";

const Home = () => {
  const navigate = useNavigate();

  const onClickBtn = (num) => {
    switch (num) {
      case 1:
        navigate("/members");
        break;
      case 2:
        navigate("/news");
        break;
      case 3:
        navigate("/profile/frontend");
        break;
      case 4:
        navigate("/themeSetting");
        break;
      case 5:
        navigate("/boards");
        break;
      case 6:
        navigate("/category");
        break;
      case 7:
        navigate("/movies");
        break;
      case 8:
        navigate("/Calendar");
        break;
      case 9:
        navigate("/FruitRadioBtn");
        break;
      case 10:
        navigate("/PositionMove");
        break;
      case 11:
        navigate("/Wheather");
        break;
      case 12:
        navigate("/Chat");
        break;
      default:
    }
  };

  return (
    <>
      <div>
        <ButtonContainer>
          <TransBtn onClick={() => onClickBtn(1)}>회원리스트</TransBtn>
          <TransBtn onClick={() => onClickBtn(2)}>뉴스 보기</TransBtn>
          <TransBtn onClick={() => onClickBtn(3)}>사진 업로드</TransBtn>
          <TransBtn onClick={() => onClickBtn(4)}>테마 변경</TransBtn>
          <TransBtn onClick={() => onClickBtn(5)}>게시판</TransBtn>
          <TransBtn onClick={() => onClickBtn(6)}>카테고리</TransBtn>
          <TransBtn onClick={() => onClickBtn(7)}>영화 목록</TransBtn>
          <TransBtn onClick={() => onClickBtn(8)}>캘린더</TransBtn>
          <TransBtn onClick={() => onClickBtn(9)}>라디오 버튼</TransBtn>
          <TransBtn onClick={() => onClickBtn(10)}>포지션 이동</TransBtn>
          <TransBtn onClick={() => onClickBtn(11)}>날씨</TransBtn>
          <TransBtn onClick={() => onClickBtn(12)}>채팅</TransBtn>
        </ButtonContainer>
      </div>
    </>
  );
};
export default Home;
