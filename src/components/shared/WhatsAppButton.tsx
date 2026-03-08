import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/helpers/constants';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent('Hi! I\'d like to get a quote for a car wrap.')}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-6 z-50"
        >
          <div className="relative">
            {/* Tooltip */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0d0d1a] border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl pointer-events-none"
                >
                  Chat on WhatsApp
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-[#0d0d1a] border-r border-t border-white/10 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              aria-label="Chat on WhatsApp"
              className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5 text-white" fill="white" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
