import { Outlet } from "react-router-dom";
import styled from "styled-components";
import MetflixHeader from "./components/MetflixHeader";
import MetflixProvier from "./MetflixProvier";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: black;
  color: ${(props) => props.theme.textColor};
`;

const MetflixApp = () => {
  return (
    <MetflixProvier>
      <Wrapper>
        <MetflixHeader />
        <Outlet />
      </Wrapper>
    </MetflixProvier>
  );
};

export default MetflixApp;
