import { useEffect, useRef, useState } from 'react';

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  easing = easeOutCubic,
  onComplete,
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const startCounting = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const current = Math.round(start + (end - start) * easedProgress);

      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(end);
        setIsRunning(false);
        onComplete?.();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { count, startCounting, isRunning };
}
