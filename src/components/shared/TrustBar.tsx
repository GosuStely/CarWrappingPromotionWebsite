import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';
import { VIEWPORT_CONFIG } from '@/helpers/animations';

const CERTS = ['3M Certified', 'Avery Dennison', 'XPEL Partner'] as const;

export default function TrustBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a18] border-y border-white/5 py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          {/* Google rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-white">5.0</span>
            <span className="text-slate-500">Google Reviews</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-white/10" />

          {/* Certifications */}
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Certified by</span>
          </div>
          {CERTS.map((cert, i) => (
            <div key={cert} className="flex items-center gap-2">
              {i > 0 && <span className="hidden sm:block w-px h-4 bg-white/10" />}
              <span className="font-bold text-white tracking-wide">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
