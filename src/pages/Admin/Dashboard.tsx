import StyledLink from "@/components/Utils/StyledLink";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;
function Dashboard() {
  return (
    <Body>
      <StyledLink to="../users" linkType="button">
        Użytkownicy
      </StyledLink>
    </Body>
  );
}

export default Dashboard;
