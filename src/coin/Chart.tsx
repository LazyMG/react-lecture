import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import Spinner from "./Spinner";
import { IChartData, IErrorData } from "./types";

const Loader = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  height: 200px;
`;

const Error = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-weight: 600;
  font-size: 24px;
`;

const Chart = () => {
  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data } = useQuery<IChartData[] | IErrorData>({
    queryKey: ["chart", `${coinId}`],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return (
    <div>
      {isLoading ? (
        <Loader>
          <Spinner />
        </Loader>
      ) : !data || "error" in data ? (
        <Error>No Data</Error>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => parseFloat(price.close)) || [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories:
                data?.map((price) =>
                  new Date(price.time_close * 1000).toUTCString()
                ) || [],
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100],
              },
              colors: ["#0fbcf9"],
            },
            tooltip: {
              y: {
                formatter: (val) => `$ ${val.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
