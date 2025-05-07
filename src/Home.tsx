import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 20px;
`;

const Container = styled.ul`
  display: flex;
  gap: 3px;

  a {
    background-color: yellowgreen;
    padding: 5px 10px;
    border-radius: 15px;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <Link to={"/coin"}>Coin App</Link>
        <Link to={"/metflix"}>Metflix App</Link>
      </Container>
    </Wrapper>
  );
};

export default Home;
