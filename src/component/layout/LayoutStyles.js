import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: auto;
  background-color: ${(props) => props.color || "#f9aa06"};
  .mainhead {
    display: flex;
    justify-content: space-between;
    position: fixed;
    height: 54px;
    width: 100%;
    background-color: ${(props) => props.color || "#f9aa06"};
    border-bottom: 1px solid #ccc;
    z-index: 100;
    top: 0;
    left: 0;

    .hambeger {
      margin-top: 12px;
      margin-left: 34px;
    }
    .setting {
      margin-top: 12px;
      margin-right: 34px;
    }
  }
  .mainbody {
    height: calc(100vh - 54px - 50px);
  }
  .footer {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    color: #222;
    font-size: 0.8em;
    justify-content: center;
    align-items: center;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  margin: 40px 20px;
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

export const UserIdAndName = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin: 2px 10px;
  line-height: 1.5;
`;

export const StyledSideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 54px;
  width: 250px;
  height: calc(100vh - 54px);
  background-color: #eee;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
`;

export const StyledMenuList = styled.ul`
  list-style: none;
  padding: 0;
`;
export const StyledMenuItem = styled.li`
  clear: left;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex; // 메뉴 항목을 플렉스 아이템으로 만듭니다.
  align-items: center; // 아이콘과 텍스트를 세로 중앙에 배치합니다.
`;
export const MenuIcon = styled.span`
  margin-right: 10px; // 아이콘과 텍스트 사이에 여백을 추가합니다.
  margin-top: 2px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; // Link의 기본 색상을 상속받도록 설정합니다.

  &:hover {
    color: #3498db; // 호버 상태일 때 색상 변경
  }
`;
export const Dummy = styled.div`
  height: 54px;
`;

export default Container;
