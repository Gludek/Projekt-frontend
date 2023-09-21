import { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { userContext } from "../../API/apiClient";

import styled from "styled-components";
import logo from "../../assets/Sekret Piękna.svg";
import StyledLink from "../Utils/StyledLink";
import UserBox from "../User/UserBox";
import { User } from "@/API/types/user";
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
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
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0px 4px 4px 0px #cacae1;
`;
const Main = styled.main`
  height: 100vh;
  flex: 1;
  padding: 40px;
  padding-bottom: 50px;
  overflow-y: auto;
  scrollbar-gutter: stable;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const login = useCallback((res: User | null) => {
    setCurrentUser(res);
  }, []);
  const contextValue = useMemo(
    () => ({
      currentUser,
      login,
    }),
    [currentUser, login]
  );
  return (
    <userContext.Provider value={contextValue}>
      <Body>
        <Nav>
          <LogoContainer>
            <Logo src={logo} />
          </LogoContainer>
          <NavLinkWrapper>
            <NavLinkContainer>
              <StyledLink linkStyle="nav" linkType="button" to="/">
                Home
              </StyledLink>
              <StyledLink linkStyle="nav" linkType="button" to="/services">
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
