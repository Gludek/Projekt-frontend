import styled from "styled-components";
import Button from "../Utils/StyledButton";
import Dialog from "./Dialog";
import cross from "@assets/cross.svg";
import { ReactElement } from "react";
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
  min-width: 300px;
  max-width: 60vw;
`;
const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary["200"]};
  span {
    font-weight: 600;
  }
  img {
    width: 16px;
    aspect-ratio: 1;
  }
`;
const ModalContent = styled.div``;
type TitledModalProps = {
  title: string;
  opener?: ReactElement;
  children: (props: {
    closeFunction?: () => void;
    submitFunction?: (value: boolean) => void;
  }) => React.ReactNode;
};
function TitledModal({
  title,
  opener = <Button>Open Modal</Button>,
  children,
}: TitledModalProps) {
  return (
    <Dialog opener={opener}>
      {(props) => {
        return (
          <ModalBody>
            <ModalHeader>
              <span>{title}</span>
              <img src={cross} />
            </ModalHeader>
            <ModalContent>
              {children({
                closeFunction: props.closeFunction,
                submitFunction: props.submitFunction,
              })}
            </ModalContent>
          </ModalBody>
        );
      }}
    </Dialog>
  );
}

export default TitledModal;
