import styled from "styled-components";
import image from "@assets/profileTest.avif";
import { useState } from "react";
import StyledLink from "../Utils/StyledLink";
const Body = styled.div<{ open?: boolean }>`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  background-color: ${({ open, theme }) =>
    open ? theme.colors.light : "transparent"};
`;
const UserNameDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px;
  height: 100%;
  align-self: stretch;
  &&:hover {
    cursor: pointer;
    background-color: color-mix(in oklab, transparent, gray 20%);
  }
  span {
    font-weight: 600;
  }
  img {
    width: 24px;
    aspect-ratio: 1;
    border-radius: 100%;
    border: 2px solid ${({ theme }) => theme.colors.primary["200"]};
  }
`;
const Menu = styled.ul<{ open?: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 0 0 10px 10px;
  z-index: 10;
  box-shadow: 0px 4px 4px 0px #cacae1;
  hr {
    width: 70%;
  }
`;

const MenuItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px;
  height: 100%;
  align-self: stretch;
  &&:hover {
    cursor: pointer;
    background-color: color-mix(in oklab, transparent, gray 20%);
  }
  span {
    font-weight: 600;
  }
  img {
    width: 24px;
    aspect-ratio: 1;
    border-radius: 100%;
    border: 2px solid ${({ theme }) => theme.colors.primary["200"]};
  }
`;
function UserBox() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Body
      onMouseLeave={() => setIsOpen(false)}
      open={isOpen}
      onClick={() => setIsOpen(true)}
    >
      <UserNameDisplay>
        <span>name</span>
        <img src={image} />
      </UserNameDisplay>
      <Menu open={isOpen}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <hr />
        <MenuItem>
          <StyledLink linkType="text" to="/users/logout">
            Logout
          </StyledLink>
        </MenuItem>
      </Menu>
    </Body>
  );
}

export default UserBox;
