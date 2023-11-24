import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #f1f3f5;
  display: flex;
  justify-content: space-around;
`;

const ChildComponent = forwardRef((props, ref) => {
  const myRef = useRef();

  // useImperativeHandle를 사용하여 ref에 함수를 전달
  useImperativeHandle(ref, () => ({
    scrollToMyElement: () => {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    },
  }));
  return (
    <div ref={myRef}>
      <h1>{props.member.name}</h1>
      <h2>{props.member.age}</h2>
      <h3>{props.member.group}</h3>
    </div>
  );
});

const ParentComponent = () => {
  const members = [
    { name: "Nayeon", age: 25, group: "Twice" },
    { name: "Jeongyeon", age: 23, group: "Twice" },
    { name: "Momo", age: 24, group: "Twice" },
    { name: "Sana", age: 24, group: "Twice" },
    { name: "Jihyo", age: 25, group: "Twice" },
    { name: "Mina", age: 23, group: "Twice" },
    { name: "Dahyun", age: 22, group: "Twice" },
    { name: "Chaeyoung", age: 22, group: "Twice" },
    { name: "Tzuyu", age: 22, group: "Twice" },
    { name: "Jisoo", age: 27, group: "Blackpink" },
    { name: "Jennie", age: 26, group: "Blackpink" },
    { name: "Rosé", age: 25, group: "Blackpink" },
    { name: "Lisa", age: 24, group: "Blackpink" },
    { name: "Karina", age: 22, group: "aespa" },
    { name: "Giselle", age: 21, group: "aespa" },
    { name: "Winter", age: 21, group: "aespa" },
    { name: "Ningning", age: 19, group: "aespa" },
    { name: "Miyeon", age: 25, group: "(G)I-DLE" },
    { name: "Minnie", age: 24, group: "(G)I-DLE" },
    { name: "Soojin", age: 23, group: "(G)I-DLE" },
    { name: "Soyeon", age: 23, group: "(G)I-DLE" },
    { name: "Yuqi", age: 22, group: "(G)I-DLE" },
    { name: "Shuhua", age: 21, group: "(G)I-DLE" },
    { name: "Solar", age: 30, group: "Mamamoo" },
    { name: "Moonbyul", age: 29, group: "Mamamoo" },
    { name: "Wheein", age: 27, group: "Mamamoo" },
    { name: "Hwasa", age: 26, group: "Mamamoo" },
    { name: "Irene", age: 30, group: "Red Velvet" },
    { name: "Seulgi", age: 28, group: "Red Velvet" },
    { name: "Wendy", age: 28, group: "Red Velvet" },
  ];

  const childRef = useRef();

  const handleClick = () => {
    if (childRef.current) {
      console.log("childRef.current : " + childRef.current);
      childRef.current.scrollToMyElement(); // 하위 컴포넌트의 함수 호출
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Add Member</button>

      {members.map((member, index) => (
        <Container>
          <ChildComponent key={index} member={member} ref={childRef} />
        </Container>
      ))}
    </div>
  );
};

export default ParentComponent;
