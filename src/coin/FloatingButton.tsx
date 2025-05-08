import styled from "styled-components";

const Wrapper = styled.div<{ $top: number }>`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 20px;
  top: ${(props) => `${props.$top}px`};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 50%;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  svg {
    color: ${(props) => props.theme.coin.accentColor};
    width: 25px;
    stroke-width: 2px;
  }
  a,
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FloatingButton = ({
  top,
  children,
}: {
  top: number;
  children: React.ReactNode;
}) => {
  return <Wrapper $top={top}>{children}</Wrapper>;
};

export default FloatingButton;
