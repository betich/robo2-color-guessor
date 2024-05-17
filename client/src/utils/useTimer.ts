import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer() {
  const [time, setTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current as NodeJS.Timeout);
  }, []);

  return { time, stopTimer };
}
