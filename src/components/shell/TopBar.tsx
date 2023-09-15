import React from "react";
import { useMe } from "../../API/hooks/UserHooks";
import { Outlet } from "react-router-dom";
import { ApiClient, userContext } from "../../API/apiClient";

import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/Sekret Piękna.svg";
import StyledLink from "../Utils/StyledLink";
import UserBox from "../User/UserBox";
const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const Nav = styled.nav`
  position: sticky;
  top: 0;
  isolation: isolate;
  z-index: 100;
  background: ${({ theme }) => theme.colors.light};
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
const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
`;
const Logo = styled.img`
  height: calc(100% - 10px);
  padding: 5px;
  object-fit: cover;
  object-position: center;
`;
const NavLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  flex: 2;
`;
const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  flex: 1;
`;
function TopBar() {
  const me = useMe();

  return (
    <userContext.Provider value={me}>
      <Body>
        <Nav>
          <LogoContainer>
            <Logo src={logo} />
          </LogoContainer>
          <NavLinkWrapper>
            <NavLinkContainer>
              <StyledLink linkStyle="nav" to="/">
                Home
              </StyledLink>
              <StyledLink linkStyle="nav" to="/services">
                Usługi
              </StyledLink>
            </NavLinkContainer>
            <UserBox />
          </NavLinkWrapper>
        </Nav>

        <Main>
          <Outlet />
        </Main>
      </Body>
    </userContext.Provider>
  );
}

export default TopBar;
