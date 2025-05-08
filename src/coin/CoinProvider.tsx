import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";

const coinQueryClient = new QueryClient();

const CoinProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={coinQueryClient}>
        <RecoilRoot>
          <HelmetProvider>{children}</HelmetProvider>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default CoinProvider;
