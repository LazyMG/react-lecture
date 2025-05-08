import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Spinner from "./Spinner";
import FloatingButton from "./FloatingButton";
import ThemeButton from "./ThemeButton";

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
  color: ${(props) => props.theme.coin.accentColor};
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.coin.textColor};
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px ${(props) => props.theme.coin.shadowColor};
  a {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.coin.accentColor};
    }
    transform: scale(1.05);
  }
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
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

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
    select: (data) => data.slice(0, 100),
  });

  const imgErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.onerror = null; // 무한 루프 방지
    event.currentTarget.src = "/coin.png"; // public 폴더
  };

  return (
    <>
      <Container>
        <Helmet>코인</Helmet>
        <Header>
          <Title>코인</Title>
        </Header>
        {isLoading ? (
          <Loader>
            <Spinner />
          </Loader>
        ) : (
          <CoinsList>
            {data?.map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/coin/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://cryptoicon-api.pages.dev/icons/128/color/${coin.symbol.toLowerCase()}.png`}
                    onError={imgErrorHandler}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
      <Overlay>
        <FloatingButton top={0}>
          <ThemeButton />
        </FloatingButton>
      </Overlay>
    </>
  );
};

export default Coins;
