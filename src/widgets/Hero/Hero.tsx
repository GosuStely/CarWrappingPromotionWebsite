import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { STATS } from '@/helpers/constants';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const disableParallax = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const { t } = useTranslation();

  const y = useTransform(scrollYProgress, [0, 1], disableParallax ? [0, 0] : [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, disableParallax ? 1 : 0]);

  const words = t('hero.words', { returnObjects: true }) as string[];
  const currentWord = words[0];

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 animated-gradient-bg" />
      <div
        className="absolute inset-0 opacity-20 hidden sm:block"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 hidden sm:block">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 flex flex-col justify-center pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-cyan-400" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">
                {t('hero.eyebrow')}
              </span>
            </motion.div>

            <div className="mb-6 overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                <span className="text-white">{currentWord}</span>
                <br />
                <span className="gradient-text">{t('hero.yourRide')}</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/contact">
                <Button size="lg" variant="primary" className="group">
                  {t('hero.bookConsultation')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/gallery">
                <Button size="lg" variant="secondary" className="group">
                  <Play className="w-4 h-4" />
                  {t('hero.viewGallery')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="relative z-10 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
            {STATS.map((stat) => (
              <div key={stat.key} className="text-center lg:px-8">
                <div
                  className="text-3xl sm:text-4xl font-black text-white mb-1 neon-text"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
                >
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-400">{t(`stats.${stat.key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div animate={disableParallax ? {} : { y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
