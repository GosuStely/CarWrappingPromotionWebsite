import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

// ── Types ────────────────────────────────────────────────────────────────────
export interface CarouselSlide {
  id: number;
  src: string;
  alt: string;
  title: string;
  tag: string;
}

interface ImageCarouselProps {
  slides?: CarouselSlide[];
  /** Autoplay interval in ms. Set to 0 to disable. Default: 4500 */
  interval?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  className?: string;
}

// ── Default slide data ────────────────────────────────────────────────────────
const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1400&q=85',
    alt: 'Matte black Lamborghini wrap',
    title: 'Matte Black Supercar',
    tag: 'Full Wrap',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=85',
    alt: 'BMW color change wrap — front three-quarter view',
    title: 'BMW Color Change',
    tag: 'Color Change',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1400&q=85',
    alt: 'Dark chrome sports car wrap',
    title: 'Satin Dark Chrome',
    tag: 'Full Wrap',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1400&q=85',
    alt: 'Color-shift iridescent wrap on Lamborghini',
    title: 'Iridescent Color Shift',
    tag: 'Custom Wrap',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85',
    alt: 'Commercial van fleet wrap with branding',
    title: 'Commercial Fleet Branding',
    tag: 'Commercial',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85',
    alt: 'Red Ferrari sports car',
    title: 'Gloss Red Sports Car',
    tag: 'Full Wrap',
  },
];

// ── Slide animation variants ──────────────────────────────────────────────────
function getVariants(direction: 1 | -1): Variants {
  return {
    enter:  { x: direction * 60, opacity: 0, scale: 0.97 },
    center: { x: 0,              opacity: 1, scale: 1,
      transition: { duration: 0.5,  ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    exit:   { x: direction * -60, opacity: 0, scale: 0.97,
      transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] } },
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ImageCarousel({
  slides = DEFAULT_SLIDES,
  interval = 4500,
  showArrows = true,
  showDots = true,
  className,
}: ImageCarouselProps) {
  const [index, setIndex]         = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused]       = useState(false);

  // Touch / swipe state
  const touchStartX = useRef<number>(0);
  const touchEndX   = useRef<number>(0);

  const go = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  const prev = useCallback(() => go(index - 1, -1), [go, index]);
  const next = useCallback(() => go(index + 1,  1), [go, index]);

  // Autoplay
  useEffect(() => {
    if (!interval || paused) return;
    const id = setInterval(() => go(index + 1, 1), interval);
    return () => clearInterval(id);
  }, [interval, paused, index, go]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  const slide = slides[index];

  return (
    <div
      className={clsx('relative w-full overflow-hidden rounded-2xl select-none', className)}
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slide image ────────────────────────────────────────────────────── */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={getVariants(direction)}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* ── Slide caption ──────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`caption-${slide.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex items-end justify-between gap-4"
          >
            <div>
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-cyan-400 text-black mb-2">
                {slide.tag}
              </span>
              <h3
                className="text-white font-black text-xl sm:text-2xl leading-tight"
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                {slide.title}
              </h3>
            </div>

            {/* Slide counter */}
            <span className="text-white/60 text-sm font-mono shrink-0">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* ── Arrow buttons ─────────────────────────────────────────────── */}
        {showArrows && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:border-cyan-400/50"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:border-cyan-400/50"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* ── Dot indicators ──────────────────────────────────────────────────── */}
      {showDots && (
        <div className="flex items-center justify-center gap-2 mt-4 pb-1">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i, i > index ? 1 : -1)}
              className={clsx(
                'rounded-full transition-all duration-300',
                i === index
                  ? 'w-6 h-2 bg-cyan-400'
                  : 'w-2 h-2 opacity-40 hover:opacity-70'
              )}
              style={{ backgroundColor: i === index ? undefined : 'var(--text-muted)' }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Autoplay progress bar ────────────────────────────────────────────── */}
      {interval > 0 && !paused && (
        <motion.div
          key={`progress-${index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: interval / 1000, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 origin-left rounded-full"
          style={{ width: '100%' }}
        />
      )}
    </div>
  );
}
