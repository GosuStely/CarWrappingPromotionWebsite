import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[#080810] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(0,245,255,0.6)]">
                <Zap className="w-8 h-8 text-white" fill="white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-md"
              />
            </div>

            <span
              className="text-3xl font-black tracking-wider text-white"
              style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
            >
              MARTIN <span className="text-cyan-400">WRAP</span>
            </span>

            {/* Progress bar */}
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
