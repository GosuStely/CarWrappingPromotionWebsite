import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-full cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] active:scale-95',
        secondary:
          'border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 active:scale-95',
        ghost:
          'text-slate-300 hover:text-white hover:bg-white/10 active:scale-95',
        danger:
          'bg-red-500 text-white hover:bg-red-400 active:scale-95',
        gold:
          'bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] active:scale-95',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
        xl: 'px-10 py-5 text-lg',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={clsx(buttonVariants({ variant, size }), className)}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export { Button, buttonVariants };
