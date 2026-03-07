import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export const glowPulse: Variants = {
  initial: { boxShadow: '0 0 0px rgba(0,245,255,0)' },
  animate: {
    boxShadow: [
      '0 0 10px rgba(0,245,255,0.3)',
      '0 0 30px rgba(0,245,255,0.6)',
      '0 0 10px rgba(0,245,255,0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const navbarVariants: Variants = {
  top: {
    backgroundColor: 'rgba(8,8,16,0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(255,255,255,0)',
  },
  scrolled: {
    backgroundColor: 'rgba(8,8,16,0.9)',
    backdropFilter: 'blur(20px)',
    borderBottomColor: 'rgba(0,245,255,0.1)',
  },
};

export const textReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)', y: 30 },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideFromLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const VIEWPORT_CONFIG = {
  once: true,
  margin: '-80px',
} as const;
