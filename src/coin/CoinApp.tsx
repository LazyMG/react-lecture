import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const coinQueryClient = new QueryClient();

const CoinApp = () => {
  return (
    <>
      <QueryClientProvider client={coinQueryClient}>
        <HelmetProvider>
          <Wrapper>
            <Outlet />
          </Wrapper>
          <ReactQueryDevtools initialIsOpen={true} />
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
};

export default CoinApp;
