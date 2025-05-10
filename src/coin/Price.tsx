import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useMemo, useState } from "react";
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

const RangeDiv = styled.div`
  display: flex;
  gap: 5px;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 10px;
`;

const RadioLabel = styled.label<{ $checked: boolean }>`
  color: ${(props) =>
    props.$checked
      ? props.theme.coin.accentColor
      : props.theme.coin.descriptionColor};
  font-weight: 400;
  cursor: pointer;
`;

const PriceTitle = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.coin.accentColor};
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewHeader = styled.span<{ $isDate: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) =>
    props.$isDate
      ? props.theme.coin.accentColor
      : props.theme.coin.overviewColor};
  font-size: 12px;
  font-weight: 400;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 14px;
  border-radius: 10px;
  color: ${(props) => props.theme.coin.overviewColor};
`;

const TabHeader = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TabRow = styled.p`
  margin: 0;
`;

const TabResult = styled(TabRow)<{ $color: boolean }>`
  color: ${(props) => (props.$color ? "red" : "blue")};
  font-size: 16px;
  font-weight: 600;
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

const getDateInfo = (dateInfo: Date) => {
  return `${dateInfo.getFullYear()}. ${(dateInfo.getMonth() + 1)
    .toString()
    .padStart(2, "0")}. ${dateInfo.getDate().toString().padStart(2, "0")}`;
};

const Price = () => {
  const [range, setRange] = useState<number>(7);

  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data } = useQuery<IChartData[] | IErrorData>({
    queryKey: ["price", `${coinId}`],
    queryFn: () => fetchCoinHistory(coinId),
  });

  const rangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = event.currentTarget.value;
    if (rangeValue === "ONE") {
      setRange(7);
    } else if (rangeValue === "TWO") {
      setRange(14);
    }
  };

  const rangedDiff = useMemo(() => {
    if (!data || "error" in data) return null;

    const startClose = parseFloat(data[data.length - 2 - range].close ?? "0");
    const endClose = parseFloat(data[data.length - 2].close ?? "0");

    if (!startClose || !endClose) return null;

    const closePercent = ((endClose - startClose) / startClose) * 100;

    const startVolume = parseFloat(data[data.length - 2 - range].volume ?? "0");
    const endVolume = parseFloat(data[data.length - 2].volume ?? "0");

    if (!startVolume || !endVolume) return null;

    const volumePercent = ((endVolume - startVolume) / startVolume) * 100;

    const dateStart = getDateInfo(
      new Date(data[data.length - 2 - range].time_close * 1000)
    );

    const dateEnd = getDateInfo(
      new Date(data[data.length - 2].time_close * 1000)
    );

    return {
      close: {
        start: startClose,
        end: endClose,
        value: closePercent.toFixed(2),
        isPositive: closePercent > 0,
      },
      volume: {
        start: startVolume,
        end: endVolume,
        value: volumePercent.toFixed(2),
        isPositive: volumePercent > 0,
      },
      date: {
        start: dateStart,
        end: dateEnd,
      },
    };
  }, [data, range]);

  return (
    <div>
      {isLoading ? (
        <Loader>
          <Spinner />
        </Loader>
      ) : !data || "error" in data ? (
        <Error>No Data</Error>
      ) : (
        <>
          <RangeDiv>
            <RadioWrapper>
              <input
                onChange={rangeChange}
                id="one"
                name="range"
                type="radio"
                value="ONE"
                checked={range === 7}
              />
              <RadioLabel $checked={range === 7} htmlFor="one">
                1주전
              </RadioLabel>
            </RadioWrapper>
            <RadioWrapper>
              <input
                onChange={rangeChange}
                id="two"
                name="range"
                type="radio"
                value="TWO"
                checked={range === 14}
              />
              <RadioLabel $checked={range === 14} htmlFor="two">
                2주전
              </RadioLabel>
            </RadioWrapper>
          </RangeDiv>
          <PriceTitle>Difference Between</PriceTitle>
          <Overview>
            <OverviewHeader $isDate={true}>
              {rangedDiff?.date.start}
            </OverviewHeader>
            <OverviewHeader $isDate={false}>AND</OverviewHeader>
            <OverviewHeader $isDate={true}>
              {rangedDiff?.date.end}
            </OverviewHeader>
          </Overview>
          <Tabs>
            <Tab>
              <TabHeader>Close</TabHeader>
              <TabContent>
                <TabRow>
                  {rangedDiff?.date.start}: {rangedDiff?.close.start}
                </TabRow>
                <TabRow>
                  {rangedDiff?.date.end}: {rangedDiff?.close.end}
                </TabRow>
              </TabContent>
              <TabContent>
                <TabResult $color={rangedDiff?.close.isPositive || false}>
                  {rangedDiff?.close.value}%
                </TabResult>
              </TabContent>
            </Tab>
            <Tab>
              <TabHeader>Volume</TabHeader>
              <TabContent>
                <TabRow>
                  {rangedDiff?.date.start}: {rangedDiff?.volume.start}
                </TabRow>
                <TabRow>
                  {rangedDiff?.date.end}: {rangedDiff?.volume.end}
                </TabRow>
              </TabContent>
              <TabContent>
                <TabResult $color={rangedDiff?.volume.isPositive || false}>
                  {rangedDiff?.volume.value}%
                </TabResult>
              </TabContent>
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Price;
