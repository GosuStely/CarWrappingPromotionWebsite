import { clsx } from 'clsx';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full text-xs font-medium px-3 py-1',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-slate-300 border border-white/10',
        neon: 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30',
        gold: 'bg-amber-400/10 text-amber-400 border border-amber-400/30',
        success: 'bg-green-400/10 text-green-400 border border-green-400/30',
        popular: 'bg-cyan-400 text-black font-semibold',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={clsx(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
