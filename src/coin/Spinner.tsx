import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #ccc;
  border-top-color: ${(props) => props.theme.coin.accentColor};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin: auto;
`;

const Spinner = () => {
  return <SpinnerWrapper />;
};

export default Spinner;
