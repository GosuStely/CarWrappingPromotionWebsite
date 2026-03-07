import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/helpers/constants';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-[#0a0a18] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from the car owners who trusted us with their pride and joy."
          className="mb-16"
        />

        {/* Featured testimonial slider */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-8 sm:p-12 border border-white/5 relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-cyan-400/10" />

              <StarRating rating={TESTIMONIALS[current].rating} />

              <blockquote className="text-lg sm:text-xl text-white leading-relaxed mt-4 mb-6">
                "{TESTIMONIALS[current].text}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {TESTIMONIALS[current].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{TESTIMONIALS[current].name}</div>
                  <div className="text-sm text-slate-400">{TESTIMONIALS[current].role}</div>
                  {TESTIMONIALS[current].vehicleType && (
                    <div className="text-xs text-cyan-400 mt-0.5">{TESTIMONIALS[current].vehicleType}</div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-cyan-400' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mini testimonial grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <motion.div
              key={t.id}
              variants={staggerItem}
              className="p-5 rounded-xl bg-[#0d0d1a] border border-white/5 hover:border-cyan-400/20 transition-colors duration-300"
            >
              <StarRating rating={t.rating} />
              <p className="text-sm text-slate-400 mt-3 mb-4 line-clamp-3">"{t.text}"</p>
              <div className="text-sm font-semibold text-white">{t.name}</div>
              <div className="text-xs text-slate-500">{t.vehicleType}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
