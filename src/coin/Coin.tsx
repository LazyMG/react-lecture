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
import Spinner from "./Spinner";
import FloatingButton from "./FloatingButton";
import ThemeButton from "./ThemeButton";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 190px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.coin.accentColor};
`;

const Loader = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 0px 20px;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  height: calc(100% - 20vh);
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.coin.overviewColor};

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.coin.descriptionColor};
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
    props.$isActive
      ? props.theme.coin.accentColor
      : props.theme.coin.overviewColor};
  a {
    display: block;
  }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  max-width: 480px;
  height: 150px;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  pointer-events: none;
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
          <Loader>
            <Spinner />
          </Loader>
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
        <FloatingButton top={0}>
          <ThemeButton />
        </FloatingButton>
        <FloatingButton top={55}>
          <Link to={"/coin"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </Link>
        </FloatingButton>
      </Overlay>
    </>
  );
};

export default Coin;
