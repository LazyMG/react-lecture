import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
