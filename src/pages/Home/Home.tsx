import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Award, Clock } from 'lucide-react';
import Hero from '@/widgets/Hero/Hero';
import ServiceCards from '@/widgets/ServiceCards/ServiceCards';
import Testimonials from '@/widgets/Testimonials/Testimonials';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';
import ImageCarousel from '@/widgets/ImageCarousel/ImageCarousel';

const GalleryGrid = lazy(() => import('@/widgets/GalleryGrid/GalleryGrid'));
const BeforeAfterSlider = lazy(() => import('@/widgets/BeforeAfter/BeforeAfterSlider'));

const WHY_US = [
  {
    icon: Award,
    title: 'Industry-Certified',
    desc: '3M, Avery Dennison & XPEL certified installers with 8+ years of hands-on experience.',
  },
  {
    icon: Zap,
    title: 'Precision Installation',
    desc: 'State-of-the-art tools and a temperature-controlled environment for flawless results every time.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    desc: 'Most full wraps completed in 3–5 days. Same-week availability for partial wraps.',
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* ── Wrap Showcase Carousel ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-500 mb-3">
                  <span className="w-6 h-px bg-cyan-500" />
                  Showcase
                </span>
                <h2
                  className="text-4xl sm:text-5xl font-black leading-tight"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif', color: 'var(--text-primary)' }}
                >
                  WRAPS THAT TURN <span className="gradient-text">HEADS</span>
                </h2>
              </div>
              <Link to="/gallery">
                <Button variant="secondary" size="md" className="group shrink-0">
                  View Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <ImageCarousel interval={4500} />
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <ServiceCards />

      {/* Why Us */}
      <section className="py-24 bg-[#0a0a18] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
                  <span className="w-6 h-px bg-cyan-400" />
                  Why Martin Wrap Studio
                </span>
                <h2
                  className="text-5xl font-black text-white mb-6 leading-tight"
                  style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
                >
                  THE DIFFERENCE IS IN THE DETAILS
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  We don't just wrap cars — we craft automotive identities. Every edge is tucked, every seam is hidden, every surface is perfect. It's not just a wrap. It's an obsession.
                </p>
              </ScrollReveal>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                className="space-y-6"
              >
                {WHY_US.map(({ icon: Icon, title, desc }) => (
                  <motion.div key={title} variants={staggerItem} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <ScrollReveal delay={0.3} className="mt-8">
                <Link to="/about">
                  <Button variant="secondary" size="md" className="group">
                    Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            {/* Right — Before/After slider */}
            <ScrollReveal>
              <Suspense fallback={<div className="aspect-video rounded-2xl bg-[#0d0d1a] animate-pulse" />}>
                <BeforeAfterSlider
                  beforeSrc="https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=900&q=80"
                  afterSrc="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=900&q=80"
                  beforeLabel="Factory Silver"
                  afterLabel="Matte Black Wrap"
                  flipAfter={true}
                  beforePosition="50% 60%"
                  afterPosition="50% 60%"
                />
              </Suspense>
              <p className="text-center text-xs text-slate-500 mt-3">
                Drag the handle left/right to see the transformation
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
              eyebrow="Our Work"
              title="Recent Wraps"
              centered={false}
              className="mb-0"
            />
            <Link to="/gallery">
              <Button variant="secondary" size="md" className="group shrink-0">
                Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            READY TO <span className="gradient-text">TRANSFORM</span> YOUR RIDE?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Book a free consultation today. Tell us your vision and we'll bring it to life — with precision, quality, and zero compromise.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact">
              <Button size="xl" variant="primary" className="group">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="xl" variant="secondary">
                View Pricing
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
