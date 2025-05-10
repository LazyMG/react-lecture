import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import { IChartData, IErrorData } from "./types";

export const useCoinPrice = (coinId: string, range: number) => {
  const { data, isLoading, error } = useQuery<IChartData[] | IErrorData>({
    queryKey: ["price", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  if (!data || "error" in data) {
    return { isLoading, error, start: null, end: null };
  }

  const endIndex = data.length - 2;
  const startIndex = endIndex - range;

  const start = startIndex < 0 ? null : data[startIndex];
  const end = startIndex < 0 ? null : data[endIndex];

  return { isLoading, error, start, end };
};
