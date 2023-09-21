import useForwardedRef from "@/Utils/Hooks/useForwardedRef";
import {
  ReactElement,
  cloneElement,
  useRef,
  useEffect,
  forwardRef,
  ForwardedRef,
} from "react";
import styled from "styled-components";

const StyledDialog = styled.dialog`
  border: none;
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: 2px 2px 10px 3px ${({ theme }) => theme.colors.primary["600"]};
  border-radius: 8px;
  &&::backdrop {
    background-color: ${({ theme }) => theme.colors.primary["200"]};
    opacity: 0.6;
  }
`;
type DialogProps = {
  opener: ReactElement | undefined;
  defaultOpen?: boolean;
  mode?: "modal" | "dialog";
  modalId?: string;
  onClose?: () => void;
  onProceed?: () => void;
  children?: (props: {
    closeFunction?: () => void;
    submitFunction?: (shouldClose: boolean) => void;
  }) => JSX.Element;
};
const Dialog = forwardRef(
  (
    {
      opener,
      defaultOpen,
      mode = "modal",
      modalId,
      onProceed,
      onClose,
      children,
    }: DialogProps,
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    const modalRef = ref
      ? useForwardedRef(ref)
      : useRef<HTMLDialogElement>(null);

    useEffect(() => {
      defaultOpen &&
        (mode === "dialog"
          ? modalRef.current?.show()
          : modalRef.current?.showModal());
    }, []);

    function closeFunction() {
      onClose && onClose();
      modalRef.current?.close();
    }
    function submitFunction(shouldClose: boolean) {
      onProceed && onProceed();
      shouldClose && closeFunction();
    }
    function openingFunction() {
      if (modalRef?.current?.open) {
        modalRef.current?.close();
      } else {
        mode === "dialog"
          ? modalRef.current?.show()
          : modalRef.current?.showModal();
      }
    }
    return (
      <>
        {opener &&
          cloneElement(opener, {
            onClick: openingFunction,
          })}
        <StyledDialog ref={modalRef} id={modalId}>
          {children && children({ closeFunction, submitFunction })}
        </StyledDialog>
      </>
    );
  }
);

export default Dialog;
