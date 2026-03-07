import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx } from 'clsx';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  priority?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 50, scale: 1.04 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -50, scale: 1.04 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  right: {
    hidden: { opacity: 0, x: 50, scale: 1.04 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
};

/** Clip-path curtain reveal for the container */
const curtainVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)' },
};

export function RevealImage({
  src,
  alt,
  className,
  containerClassName,
  delay = 0,
  direction = 'up',
  priority = false,
  style,
  children,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={curtainVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={clsx('overflow-hidden', containerClassName)}
      style={style}
    >
      <motion.img
        src={src}
        alt={alt}
        variants={variants[direction]}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          duration: 0.85,
          delay: delay + 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        loading={priority ? 'eager' : 'lazy'}
        className={clsx('w-full h-full object-cover', className)}
        draggable={false}
      />
      {children}
    </motion.div>
  );
}
