import { useRef, useEffect } from "react";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();
  let id: string | number | NodeJS.Timeout | undefined;
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback?.current?.();
    }
    if (delay !== null) {
      id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    if (delay <= 0) {
    }
  }, [delay]);
  return id;
}
