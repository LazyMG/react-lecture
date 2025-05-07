import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  max-width: 480px;
  height: 100px;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  pointer-events: none;
`;

const FloatingButton = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 50%;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface ILocationState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as ILocationState;

  const { isLoading: isInfoLoading, data: info } = useQuery<InfoData>({
    queryKey: ["coinInfo", `${coinId || ""}`],
    queryFn: () => fetchCoinInfo(coinId || ""),
  });
  const { isLoading: isPriceLoading, data: priceInfo } = useQuery<PriceData>({
    queryKey: ["coinPrice", `${coinId || ""}`],
    queryFn: () => fetchCoinTickers(coinId || ""),
  });
  const chartMatch = useMatch("/coin/:coinId/chart");
  const priceMatch = useMatch("/coin/:coinId/price");

  const loading = isInfoLoading || isPriceLoading;

  return (
    <>
      <Container>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading..." : info?.name}
          </title>
        </Helmet>
        <Header>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : info?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{info?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${info?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{priceInfo?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{info?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{priceInfo?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{priceInfo?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab $isActive={chartMatch !== null}>
                <Link to={`/coin/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab $isActive={priceMatch !== null}>
                <Link to={`/coin/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>
            <Outlet context={{ coinId }} />
          </>
        )}
      </Container>
      <Overlay>
        <FloatingButton>
          <Link to={"/coin"}>홈</Link>
        </FloatingButton>
      </Overlay>
    </>
  );
};

export default Coin;
