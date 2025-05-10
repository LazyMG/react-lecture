import { useOutletContext } from "react-router-dom";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useState } from "react";
import { useCoinPrice } from "./useCoinPrice";

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

const getDifference = (to: string, from: string) =>
  parseFloat(to) - parseFloat(from);

const getPercentage = (to: string, from: string) =>
  ((parseFloat(to) - parseFloat(from)) / parseFloat(from)) * 100;

const Price = () => {
  const [range, setRange] = useState<number>(7);

  const { coinId } = useOutletContext<{ coinId: string }>();

  const { isLoading, start, end, error } = useCoinPrice(coinId, range);

  const rangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = event.currentTarget.value;
    if (rangeValue === "ONE") {
      setRange(7);
    } else if (rangeValue === "TWO") {
      setRange(14);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader>
          <Spinner />
        </Loader>
      ) : error || !start || !end ? (
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
              {getDateInfo(new Date(start.time_close * 1000))}
            </OverviewHeader>
            <OverviewHeader $isDate={false}>AND</OverviewHeader>
            <OverviewHeader $isDate={true}>
              {getDateInfo(new Date(end.time_close * 1000))}
            </OverviewHeader>
          </Overview>
          <Tabs>
            <Tab>
              <TabHeader>Close</TabHeader>
              <TabContent>
                <TabRow>
                  {getDateInfo(new Date(start.time_close * 1000))}:{" "}
                  {start.close}
                </TabRow>
                <TabRow>
                  {getDateInfo(new Date(end.time_close * 1000))}: {end.close}
                </TabRow>
              </TabContent>
              <TabContent>
                <TabResult
                  $color={getDifference(end.close, start.close) > 0 || false}
                >
                  {getPercentage(end.close, start.close).toFixed(2)}%
                </TabResult>
              </TabContent>
            </Tab>
            <Tab>
              <TabHeader>Volume</TabHeader>
              <TabContent>
                <TabRow>
                  {getDateInfo(new Date(start.time_close * 1000))}:{" "}
                  {start.volume}
                </TabRow>
                <TabRow>
                  {getDateInfo(new Date(end.time_close * 1000))}: {end.volume}
                </TabRow>
              </TabContent>
              <TabContent>
                <TabResult
                  $color={getDifference(end.volume, start.volume) > 0 || false}
                >
                  {getPercentage(end.volume, start.volume).toFixed(2)}%
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
