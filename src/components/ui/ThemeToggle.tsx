import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.88 }}
      className={[
        'relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200',
        'border',
        isDark
          ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
          : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100',
      ].join(' ')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="absolute"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="absolute"
          >
            <Sun className="w-4 h-4 text-amber-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
