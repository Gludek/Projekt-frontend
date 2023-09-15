import styled from "styled-components";
import StyledLink from "../Utils/StyledLink";
import { useContext } from "react";
import { userContext } from "../../API/apiClient";

const ServiceBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
`;

const Service = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary["100"]};
  border-radius: 10px;
  padding: 10px;
`;

const ServiceTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  h5 {
    font-weight: 600;
  }
`;
const ServiceFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  span {
    font-weight: 600;
  }
  div {
    display: flex;
    flex-direction: row;
    width: 60%;
    gap: 10px;
    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
  }
`;

type ServiceProps = {
  service: {
    name: string;
    description: string;
    price: string;
  };
};
const StyledButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.primary["500"]};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
  transition: 0.3s ease-out;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.primary["300"]};
    color: ${({ theme }) => theme.colors.primary["700"]};
  }
  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.primary["600"]};
    transition: 0.3s ease-in;
  }
`;
function ServiceCard({ service }: ServiceProps) {
  const isLoggedIn = useContext(userContext);
  return (
    <Service>
      <ServiceTitle>
        <h5>{service.name}</h5>
        <span>{service.price} zł</span>
      </ServiceTitle>
      <ServiceBody>
        <p>{service.description}</p>
        <ServiceFooter>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <StyledButton disabled={!isLoggedIn}>
              {isLoggedIn
                ? "Umów wizytę online"
                : "Zaloguj się, aby umawiać wizyty online"}
            </StyledButton>
            <StyledLink to="tel:+48609824011">
              Umów się telefonicznie
            </StyledLink>
          </div>
        </ServiceFooter>
      </ServiceBody>
    </Service>
  );
}

export default ServiceCard;
