import { useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCounter } from '@/hooks/useCounter';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { count, startCounting } = useCounter({ end, duration });

  useEffect(() => {
    if (isInView) startCounting();
  }, [isInView]); // eslint-disable-line

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className={className}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}
