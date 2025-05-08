import styled, { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import { darkTheme, theme } from "../theme";
import { useTheme } from "./useTheme";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.coin.bgColor};
  color: ${(props) => props.theme.coin.textColor};
`;

const CoinApp = () => {
  const { isDark } = useTheme();
  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </ThemeProvider>
  );
};

export default CoinApp;
