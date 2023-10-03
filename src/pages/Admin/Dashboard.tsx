import StyledLink from "@/components/Utils/StyledLink";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;
function Dashboard() {
  return (
    <Body>
      <StyledLink to="../users" linkType="button">
        Użytkownicy
      </StyledLink>
      <StyledLink to="/posts" linkType="button">
        Posty
      </StyledLink>
    </Body>
  );
}

export default Dashboard;
