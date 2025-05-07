import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";

const metflixQueryClient = new QueryClient();

const MetflixProvier = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={metflixQueryClient}>
      <HelmetProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default MetflixProvier;
