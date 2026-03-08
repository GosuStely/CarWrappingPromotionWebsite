import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Zap, Clock, HelpCircle, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import Hero from '@/widgets/Hero/Hero';
import ServiceCards from '@/widgets/ServiceCards/ServiceCards';
import Testimonials from '@/widgets/Testimonials/Testimonials';
import HowItWorks from '@/widgets/HowItWorks/HowItWorks';
import TrustBar from '@/components/shared/TrustBar';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';
import ImageCarousel from '@/widgets/ImageCarousel/ImageCarousel';

const GalleryGrid = lazy(() => import('@/widgets/GalleryGrid/GalleryGrid'));
const BeforeAfterSlider = lazy(() => import('@/widgets/BeforeAfter/BeforeAfterSlider'));

const WHY_US_ICONS = [Award, Zap, Clock] as const;

const HOME_FAQS = [
  {
    q: 'Will wrapping damage my paint?',
    a: "No — a quality wrap actually protects your paint. When professionally removed, your original finish is fully preserved underneath.",
  },
  {
    q: 'How long does a wrap last?',
    a: "Our wraps last 5–7 years with proper care. We use premium 3M and Avery Dennison vinyl rated for long-term exterior use.",
  },
  {
    q: 'Can I wash my wrapped car?',
    a: "Yes. Hand-washing is best. Avoid high-pressure jets aimed directly at edges and seams. Skip automatic brush car washes.",
  },
  {
    q: 'How long does installation take?',
    a: "Most full wraps take 2–4 days in our studio. Partial wraps and accents can be completed in as little as one day.",
  },
  {
    q: 'Can I choose any color or finish?',
    a: "Absolutely. We offer 200+ colors across matte, satin, gloss, chrome, color-shift, and textured finishes. If you can imagine it, we can wrap it.",
  },
] as const;

function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#080810]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
            <span className="w-6 h-px bg-cyan-400" />
            Quick Answers
            <span className="w-6 h-px bg-cyan-400" />
          </span>
          <h2
            className="text-5xl font-black text-white"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            Common Questions
          </h2>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="space-y-3"
        >
          {HOME_FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              variants={staggerItem}
              className={clsx(
                'rounded-xl border transition-colors duration-200 overflow-hidden',
                open === i ? 'border-cyan-400/30 bg-cyan-400/5' : 'border-white/5 bg-[#0d0d1a] hover:border-white/10'
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-semibold text-white text-sm">{faq.q}</span>
                </div>
                <ChevronDown
                  className={clsx(
                    'w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300',
                    open === i && 'rotate-180'
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed pl-12">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal delay={0.1} className="text-center mt-8">
          <p className="text-slate-500 text-sm mb-4">Have a more specific question?</p>
          <Link to="/contact">
            <Button variant="secondary" size="md" className="group">
              Ask Us Anything
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const whyUsItems = t('home.whyUs.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <div>
      <Hero />

      {/* Trust Bar — certifications + rating */}
      <TrustBar />

      {/* Wrap Showcase Carousel */}
      <section className="py-16 sm:py-20 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-3">
                  <span className="w-6 h-px bg-cyan-500" />
                  {t('home.showcase.eyebrow')}
                </span>
                <h2
                  className="text-4xl sm:text-5xl font-black leading-tight"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--text-primary)' }}
                >
                  {t('home.showcase.title')}
                </h2>
              </div>
              <Link to="/gallery">
                <Button variant="secondary" size="md" className="group shrink-0">
                  {t('home.showcase.cta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <ImageCarousel interval={4500} />
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <ServiceCards />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Us */}
      <section className="py-24 bg-[#0a0a18] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl hidden sm:block" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                  <span className="w-6 h-px bg-cyan-400" />
                  {t('home.whyUs.eyebrow')}
                </span>
                <h2
                  className="text-5xl font-black text-white mb-6 leading-tight"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
                >
                  {t('home.whyUs.title')}
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  {t('home.whyUs.body')}
                </p>
              </ScrollReveal>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                className="space-y-6"
              >
                {whyUsItems.map(({ title, desc }, idx) => {
                  const Icon = WHY_US_ICONS[idx];
                  return (
                    <motion.div key={title} variants={staggerItem} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
              <ScrollReveal delay={0.3} className="mt-8">
                <Link to="/about">
                  <Button variant="secondary" size="md" className="group">
                    {t('home.whyUs.cta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <Suspense fallback={<div className="aspect-video rounded-2xl bg-[#0d0d1a] animate-pulse" />}>
                <BeforeAfterSlider
                  beforeSrc="src\assets\643792834_1461665968846549_3424580119758697255_n.jpg"
                  afterSrc="src\assets\645628049_1488770759525735_4056995413333055352_n.jpg"
                  beforeLabel={t('home.beforeAfter.beforeLabel')}
                  afterLabel={t('home.beforeAfter.afterLabel')}
                  flipAfter={false}
                  beforePosition="50% 60%"
                  afterPosition="50% 60%"
                />
              </Suspense>
              <p className="text-center text-xs text-slate-500 mt-3">
                {t('home.beforeAfter.hint')}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeader
              eyebrow={t('home.gallery.eyebrow')}
              title={t('home.gallery.title')}
              centered={false}
              className="mb-0"
            />
            <Link to="/gallery">
              <Button variant="secondary" size="md" className="group shrink-0">
                {t('home.gallery.cta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <Suspense fallback={<div className="h-96 bg-[#0d0d1a] rounded-2xl animate-pulse" />}>
            <GalleryGrid limit={6} />
          </Suspense>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <HomeFaq />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-70" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,245,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.2) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            {t('home.cta.title')}
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            {t('home.cta.body')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact">
              <Button size="xl" variant="primary" className="group">
                {t('home.cta.quote')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="xl" variant="secondary">
                {t('home.cta.pricing')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
