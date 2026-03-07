import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { fadeInUp, VIEWPORT_CONFIG } from '@/helpers/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  variants = fadeInUp,
  delay = 0,
  className,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT_CONFIG, once }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
