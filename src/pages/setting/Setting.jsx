import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";

const Container = styled.div`
  padding: 20px;
  margin: 20px auto;
  border-radius: 8px;
`;
const Title = styled.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 10px;
`;
const ContainerList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerListItem = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  border-bottom: 2px solid #ccc;
  padding: 10px 30px;
`;
const LinkContainer = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  width: 100%;
`;

const LinkStyled = styled(Link)`
  color: #333;
  font-size: 1em;
  text-decoration: none;
`;

const Setting = () => {
  return (
    <Container>
      <Title>설정</Title>
      <ContainerList>
        <ContainerListItem>
          <LinkContainer>
            <LinkStyled to="/category">게시글 카테고리 설정</LinkStyled>
            <LinkStyled to="/category">
              <FaChevronRight />
            </LinkStyled>
          </LinkContainer>
        </ContainerListItem>
        <ContainerListItem>
          <LinkContainer>
            <LinkStyled to="/themesetting">약관</LinkStyled>
            <LinkStyled to="/themesetting">
              <FaChevronRight />
            </LinkStyled>
          </LinkContainer>
        </ContainerListItem>
        <ContainerListItem>
          <LinkContainer>
            <LinkStyled to="/themesetting">테마 설정</LinkStyled>
            <LinkStyled to="/themesetting">
              <FaChevronRight />
            </LinkStyled>
          </LinkContainer>
        </ContainerListItem>
      </ContainerList>
    </Container>
  );
};

export default Setting;
