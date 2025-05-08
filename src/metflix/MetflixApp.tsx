import { Outlet } from "react-router-dom";
import styled from "styled-components";
import MetflixHeader from "./components/MetflixHeader";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: black;
  color: ${(props) => props.theme.metflix.black.darker};
`;

const MetflixApp = () => {
  return (
    <Wrapper>
      <MetflixHeader />
      <Outlet />
    </Wrapper>
  );
};

export default MetflixApp;
