import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  margin: auto;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
`;

const RadioButtonLabel = styled.label`
  // Your base styles for the label
  padding: 5px;
  border: 1px solid #ddd;
  display: block;
  margin-right: 10px;

  // Conditional styling based on props
  background-color: ${(props) => (props.isChecked ? "royalBlue" : "#fff")};
  color: ${(props) => (props.isChecked ? "white" : "black")};
  border-color: ${(props) => (props.isChecked ? "#007bff" : "#ddd")};
`;

const FruitRadioBtn = () => {
  const [selectedValue, setSelectedValue] = useState("apple");

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  return (
    <Container>
      <RadioButtonLabel htmlFor="apple" isChecked={selectedValue === "apple"}>
        <input
          type="radio"
          name="fruits"
          id="apple"
          value="apple"
          onChange={handleChange}
        />
        사과
      </RadioButtonLabel>
      <br />
      <RadioButtonLabel htmlFor="orange" isChecked={selectedValue === "orange"}>
        <input
          type="radio"
          name="fruits"
          id="orange"
          value="orange"
          onChange={handleChange}
        />
        오렌지
      </RadioButtonLabel>
      <br />
      <RadioButtonLabel
        htmlFor="strawberry"
        isChecked={selectedValue === "strawberry"}
      >
        <input
          type="radio"
          name="fruits"
          id="strawberry"
          value="strawberry"
          onChange={handleChange}
        />
        딸기
      </RadioButtonLabel>
      <br />
      <p>Selected value: {selectedValue}</p>
    </Container>
  );
};

export default FruitRadioBtn;
