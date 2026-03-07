import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { fadeInUp, VIEWPORT_CONFIG } from '@/helpers/animations';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className={clsx('max-w-3xl', centered && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-3">
          <span className="w-6 h-px bg-cyan-400" />
          {eyebrow}
          <span className="w-6 h-px bg-cyan-400" />
        </span>
      )}
      <h2
        className={clsx(
          'text-4xl sm:text-5xl font-black leading-tight',
          light ? 'text-white' : 'text-white',
          'mb-4'
        )}
        style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={clsx('text-lg leading-relaxed', light ? 'text-slate-300' : 'text-slate-400')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
