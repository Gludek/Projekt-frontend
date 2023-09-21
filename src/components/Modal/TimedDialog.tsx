import Dialog from "./Dialog";
import { ForwardedRef, forwardRef } from "react";

type TimerProps = {
  children: (props: {
    closeFunction?: () => void;
    submitFunction?: (shouldClose: boolean) => void;
    time?: number;
  }) => JSX.Element;
  time?: number;
};
const TimedDialog = forwardRef(
  (
    { time = 1000, children }: TimerProps,
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    return (
      <Dialog opener={undefined} defaultOpen={true} ref={ref}>
        {(props) => {
          setTimeout(() => {
            props.closeFunction?.();
          }, time);
          return (
            <>
              {children({
                closeFunction: props.closeFunction,
                submitFunction: props.submitFunction,
              })}
            </>
          );
        }}
      </Dialog>
    );
  }
);

export default TimedDialog;
