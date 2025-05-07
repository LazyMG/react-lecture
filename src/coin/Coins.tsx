import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
    select: (data) => data.slice(0, 100),
  });

  return (
    <>
      <Container>
        <Helmet>코인</Helmet>
        <Header>
          <Title>코인</Title>
        </Header>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {data?.map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/coin/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptoicon-api.pages.dev/icons/128/color/${coin.symbol.toLowerCase()}.png`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
};

export default Coins;
