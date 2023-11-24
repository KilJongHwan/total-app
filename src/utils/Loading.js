import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    </LoadingContainer>
  );
};

export default Loading;
