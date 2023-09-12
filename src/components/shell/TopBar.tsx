import React from "react";
import { useMe } from "../../API/hooks/UserHooks";
import { Outlet } from "react-router-dom";
import { ApiClient, userContextProvider } from "../../API/apiClient";

import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/Sekret Piękna.svg";
const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const Nav = styled.nav`
  display: flex;
  height: 50px;
  max-height: 50px;
  padding: 0rem 10px;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0px 4px 4px 0px #cacae1;
`;
const Main = styled.main`
  height: 100%;
  flex: 1;
  padding: 40px;
`;
const Logo = styled.img`
  height: calc(100% - 10px);
  padding: 5px;
  object-fit: cover;
  object-position: center;
`;
function TopBar() {
  const me = useMe();

  return (
    <userContextProvider.Provider value={me}>
      <Body>
        <Nav>
          <Logo src={logo} />

          {me ? (
            <button onClick={() => ApiClient.logout()}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Nav>

        <Main>
          <Outlet />
        </Main>
      </Body>
    </userContextProvider.Provider>
  );
}

export default TopBar;
