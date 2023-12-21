import TimedDialog from "./TimedDialog";
import styled from "styled-components";
import Button from "../Utils/StyledButton";
import { Ref, useContext, useEffect, useRef } from "react";
import { userContext } from "@/API/apiClient";
const Body = styled.div`
  min-width: 400px;
  max-width: 60vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary["700"]};
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
function LoggedOutModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const { login: logout } = useContext(userContext);

  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, [ref.current?.open]);
  return (
    <TimedDialog time={3000} ref={ref}>
      {(props) => {
        return (
          <Body>
            <Container>
              <h1>Wylogowano pomyślnie</h1>
              <p>Okno zostanie zamknięte w ciągu 3 sekund.</p>
            </Container>
            <Row>
              <Button
                onClick={() => {
                  if (ref.current) {
                    const loginModal = document.getElementById(
                      "login-modal"
                    ) as HTMLDialogElement;
                    loginModal.showModal();
                    logout(null);
                    // sessionStorage.removeItem("token");
                    ref.current.close();
                  }
                }}
                outlined
              >
                Zaloguj się ponownie
              </Button>
              <Button
                buttonStyle="primary"
                onClick={() => props.closeFunction?.()}
              >
                Zamknij
              </Button>
            </Row>
          </Body>
        );
      }}
    </TimedDialog>
  );
}

export default LoggedOutModal;
