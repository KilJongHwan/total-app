import {
  ButtonContainer,
  TransBtn,
} from "../../component/menu/ButtonContainer";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";

const ThemeSetting = () => {
  const context = useContext(UserContext);
  const { setColor } = context;
  const themeColorChange = (color) => {
    setColor(color);
  };

  return (
    <>
      <ButtonContainer>
        <TransBtn>테마 설정</TransBtn>
      </ButtonContainer>
      <ButtonContainer>
        <TransBtn color="orange" onClick={() => themeColorChange("orange")}>
          오렌지
        </TransBtn>
        <TransBtn color="green" onClick={() => themeColorChange("green")}>
          그린
        </TransBtn>
        <TransBtn
          color="lightgrey"
          onClick={() => themeColorChange("lightgrey")}
        >
          밝은 회색
        </TransBtn>
        <TransBtn color="grey" onClick={() => themeColorChange("grey")}>
          어두운 회색
        </TransBtn>
        <TransBtn
          color="royalblue"
          onClick={() => themeColorChange("royalblue")}
        >
          로얄 블루
        </TransBtn>
      </ButtonContainer>
    </>
  );
};
export default ThemeSetting;
