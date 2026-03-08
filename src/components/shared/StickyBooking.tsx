import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function StickyBooking() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="flex flex-col items-end gap-1">
            <p className="text-[10px] text-slate-400 flex items-center gap-1 pr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Limited slots this month
            </p>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black font-semibold text-sm shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(0,245,255,0.7)] transition-all duration-200 group"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {t('common.bookAWrap')}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
