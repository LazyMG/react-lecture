import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";

const metflixQueryClient = new QueryClient();

const MetflixProvier = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={metflixQueryClient}>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MetflixProvier;
