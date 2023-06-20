import React from "react";
import { useMe } from "../../../API/hooks/UserHooks";
import { Outlet } from "react-router-dom";
import { ApiClient, userContextProvider } from "../../../API/apiClient";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const Nav = styled.nav`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e7e7e7;
  a,
  button {
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
  }
`;
function TopBar() {
  const me = useMe();

  return (
    <userContextProvider.Provider value={me}>
      <Body>
        <Nav>
          <button
            onClick={() => ApiClient.getTest().finally((e) => console.log(e))}
          >
            Test
          </button>
          <button
            onClick={() =>
              ApiClient.getTestAuth().finally((e) => console.log(e))
            }
          >
            Auth Test
          </button>
          {me ? (
            <button onClick={() => ApiClient.logout()}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/users">Users</Link>
        </Nav>

        <Outlet />
      </Body>
    </userContextProvider.Provider>
  );
}

export default TopBar;
