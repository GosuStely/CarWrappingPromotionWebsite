import { writeFileSync } from 'fs';

// ─── Home ────────────────────────────────────────────────────────────────────
const home = `import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Zap, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

const WHY_US_ICONS = [Award, Zap, Clock] as const;

export default function Home() {
  const { t } = useTranslation();
  const whyUsItems = t('home.whyUs.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <div>
      <Hero />

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

      {/* Why Us */}
      <section className="py-24 bg-[#0a0a18] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
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
                  beforeSrc="https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=900&q=80"
                  afterSrc="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=900&q=80"
                  beforeLabel={t('home.beforeAfter.beforeLabel')}
                  afterLabel={t('home.beforeAfter.afterLabel')}
                  flipAfter={true}
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
`;
writeFileSync('src/pages/Home/Home.tsx', home);
console.log('✓ Home.tsx');

// ─── Services ────────────────────────────────────────────────────────────────
const services = `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Palette, Layers, Truck, Shield, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { RevealImage } from '@/components/animations/RevealImage';
import { Button } from '@/components/ui/Button';
import { SERVICES } from '@/helpers/constants';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';
import { formatPrice } from '@/helpers/format';

const iconMap: Record<string, React.ElementType> = {
  car: Car, palette: Palette, layers: Layers, truck: Truck, shield: Shield,
};

const SERVICE_IMAGES: Record<string, string> = {
  'full-wrap': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=900&q=80',
  'color-change': 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=80',
  'partial-wrap': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  'commercial': 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=900&q=80',
  'ppf': 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=900&q=80',
};

function idToKey(id: string): string {
  return id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="pt-20">
      {/* Page hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-60" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,245,255,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
              <span className="w-6 h-px bg-cyan-400" />
              {t('servicesPage.eyebrow')}
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              {t('servicesPage.title')}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('servicesPage.subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-12 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Car;
            const isEven = index % 2 === 0;
            const key = idToKey(service.id);
            const title = t('servicesData.' + key + '.title');
            const description = t('servicesData.' + key + '.description');
            const features = t('servicesData.' + key + '.features', { returnObjects: true }) as string[];
            const shortLabel = t('servicesData.' + key + '.shortLabel');
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={'grid lg:grid-cols-2 gap-12 items-center' + (!isEven ? ' lg:flex-row-reverse' : '')}
              >
                <div className={'relative group rounded-2xl overflow-hidden aspect-video' + (!isEven ? ' lg:order-2' : '')}>
                  <RevealImage
                    src={SERVICE_IMAGES[service.id] ?? (service as any).image ?? ''}
                    alt={title}
                    direction={isEven ? 'left' : 'right'}
                    delay={0.1}
                    containerClassName="w-full h-full group-hover:[&_img]:scale-105"
                    className="transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-cyan-400/20 text-cyan-400 backdrop-blur-sm border border-cyan-400/30">
                      {(service as any).popular ? t('common.mostPopular') : shortLabel}
                    </span>
                  </div>
                </div>

                <div className={!isEven ? 'lg:order-1' : ''}>
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-4xl font-black text-white mb-3" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                    {title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{description}</p>

                  <ul className="space-y-2.5 mb-8">
                    {features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-400/15 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-sm text-slate-300">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-xs text-slate-500">{t('servicesPage.startingFrom')}</span>
                      <div className="text-2xl font-black text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                        {formatPrice(service.startingPrice)}
                      </div>
                    </div>
                    <Link to="/contact">
                      <Button variant="primary" size="md" className="group">
                        {t('servicesPage.bookService')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a18]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow={t('servicesPage.cta.eyebrow')}
            title={t('servicesPage.cta.title')}
            subtitle={t('servicesPage.cta.subtitle')}
          />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/contact"><Button size="lg" variant="primary">{t('servicesPage.cta.book')}</Button></Link>
            <Link to="/pricing"><Button size="lg" variant="secondary">{t('servicesPage.cta.pricing')}</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
`;
writeFileSync('src/pages/Services/Services.tsx', services);
console.log('✓ Services.tsx');

// ─── Gallery ─────────────────────────────────────────────────────────────────
const gallery = `import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SectionHeader } from '@/components/shared/SectionHeader';

const GalleryGrid = lazy(() => import('@/widgets/GalleryGrid/GalleryGrid'));
const BeforeAfterSlider = lazy(() => import('@/widgets/BeforeAfter/BeforeAfterSlider'));

type PairData = {
  id: number;
  beforeSrc: string;
  afterSrc: string;
  flipBefore?: boolean;
  flipAfter?: boolean;
  beforePosition: string;
  afterPosition: string;
};

const BEFORE_AFTER_PAIRS_DATA: PairData[] = [
  {
    id: 1,
    beforeSrc: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=900&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=900&q=80',
    flipAfter: true,
    beforePosition: '50% 60%',
    afterPosition: '50% 60%',
  },
  {
    id: 2,
    beforeSrc: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=900&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=80',
    flipBefore: true,
    beforePosition: '50% 55%',
    afterPosition: '50% 55%',
  },
  {
    id: 3,
    beforeSrc: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=900&q=80',
    beforePosition: '50% 50%',
    afterPosition: '50% 50%',
  },
  {
    id: 4,
    beforeSrc: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=900&q=80',
    flipBefore: true,
    beforePosition: '50% 60%',
    afterPosition: '50% 60%',
  },
];

type PairI18n = { beforeLabel: string; afterLabel: string; vehicle: string };

export default function Gallery() {
  const { t } = useTranslation();
  const pairsI18n = t('galleryPage.beforeAfter.pairs', { returnObjects: true }) as PairI18n[];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-50" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(191,0,255,0.08) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
              <span className="w-6 h-px bg-cyan-400" />
              {t('galleryPage.eyebrow')}
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              {t('galleryPage.title')}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('galleryPage.subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-[#0d0d1a] animate-pulse" />
              ))}
            </div>
          }>
            <GalleryGrid />
          </Suspense>
        </div>
      </section>

      {/* Before / After section */}
      <section className="py-24 bg-[#0a0a18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('galleryPage.beforeAfter.eyebrow')}
            title={t('galleryPage.beforeAfter.title')}
            subtitle={t('galleryPage.beforeAfter.subtitle')}
            className="mb-12"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Suspense fallback={null}>
              {BEFORE_AFTER_PAIRS_DATA.map((pair, idx) => {
                const i18n = pairsI18n[idx] ?? { beforeLabel: '', afterLabel: '', vehicle: '' };
                return (
                  <div key={pair.id}>
                    <BeforeAfterSlider
                      beforeSrc={pair.beforeSrc}
                      afterSrc={pair.afterSrc}
                      beforeLabel={i18n.beforeLabel}
                      afterLabel={i18n.afterLabel}
                      flipBefore={pair.flipBefore}
                      flipAfter={pair.flipAfter}
                      beforePosition={pair.beforePosition}
                      afterPosition={pair.afterPosition}
                    />
                    <p className="text-center text-sm text-slate-400 mt-3">{i18n.vehicle}</p>
                  </div>
                );
              })}
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
`;
writeFileSync('src/pages/Gallery/Gallery.tsx', gallery);
console.log('✓ Gallery.tsx');

// ─── Pricing ─────────────────────────────────────────────────────────────────
const pricing = `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import PricingTable from '@/widgets/PricingTable/PricingTable';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

const ADDON_PRICES = [299, 599, 399, 249, 149, 350, 199, 299] as const;

type FaqItem = { q: string; a: string };

export default function Pricing() {
  const { t } = useTranslation();
  const faqs = t('pricingPage.faq.items', { returnObjects: true }) as FaqItem[];
  const addonLabels = t('pricingPage.addons.items', { returnObjects: true }) as string[];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-50" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,107,0,0.08) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
              <span className="w-6 h-px bg-cyan-400" />
              {t('pricingPage.eyebrow')}
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              {t('pricingPage.title')}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('pricingPage.subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-16 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTable />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_CONFIG}
            className="text-center text-sm text-slate-500 mt-8"
          >
            {t('pricingPage.footnote')}
            <Link to="/contact" className="text-cyan-400 hover:underline ml-1">{t('pricingPage.customQuote')}</Link>
          </motion.p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-[#0a0a18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('pricingPage.addons.eyebrow')}
            title={t('pricingPage.addons.title')}
            subtitle={t('pricingPage.addons.subtitle')}
            className="mb-12"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {addonLabels.map((label, i) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="p-4 rounded-xl bg-[#0d0d1a] border border-white/5 hover:border-cyan-400/20 transition-colors duration-300 flex items-center justify-between"
              >
                <span className="text-sm text-slate-300">{label}</span>
                <span className="text-sm font-bold text-white">{'+$' + ADDON_PRICES[i]}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#080810]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('pricingPage.faq.eyebrow')}
            title={t('pricingPage.faq.title')}
            subtitle={t('pricingPage.faq.subtitle')}
            className="mb-12"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="space-y-4"
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                variants={staggerItem}
                className="p-6 rounded-xl bg-[#0d0d1a] border border-white/5 hover:border-cyan-400/20 transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            className="mt-10 text-center"
          >
            <p className="text-slate-400 mb-4">{t('pricingPage.faq.stillHave')}</p>
            <Link to="/contact">
              <Button variant="primary" size="lg" className="group">
                {t('pricingPage.faq.askUs')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
`;
writeFileSync('src/pages/Pricing/Pricing.tsx', pricing);
console.log('✓ Pricing.tsx');

// ─── About ───────────────────────────────────────────────────────────────────
const about = `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Zap, Heart, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { RevealImage } from '@/components/animations/RevealImage';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { STATS, TEAM_MEMBERS } from '@/helpers/constants';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

const VALUES_ICONS = [Award, Zap, Heart, Users] as const;
type ValueItem = { title: string; desc: string };

export default function About() {
  const { t } = useTranslation();
  const values = t('aboutPage.values', { returnObjects: true }) as ValueItem[];
  const certs = t('aboutPage.certs', { returnObjects: true }) as string[];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-60" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0,245,255,0.1) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
              <span className="w-6 h-px bg-cyan-400" />
              {t('aboutPage.eyebrow')}
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              {t('aboutPage.title')}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('aboutPage.subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <RevealImage
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                alt="Workshop"
                direction="left"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 neon-border rounded-xl p-4 glass">
                <p className="text-sm text-slate-300 italic">
                  "{t('aboutPage.quote')}"
                </p>
                <p className="text-cyan-400 text-xs font-semibold mt-2">{t('aboutPage.quoteAuthor')}</p>
              </div>
            </div>

            <div>
              <ScrollReveal>
                <h2 className="text-4xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  {t('aboutPage.storyTitle')}
                </h2>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>{t('aboutPage.storyP1')}</p>
                  <p>{t('aboutPage.storyP2')}</p>
                  <p>{t('aboutPage.storyP3')}</p>
                  <p>{t('aboutPage.storyP4')}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#0a0a18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {STATS.map((stat) => (
              <motion.div key={stat.key} variants={staggerItem} className="text-center">
                <div className="text-5xl font-black text-white neon-text mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-400">{t('stats.' + stat.key)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={t('aboutPage.valuesEyebrow')} title={t('aboutPage.valuesTitle')} className="mb-12" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map(({ title, desc }, idx) => {
              const Icon = VALUES_ICONS[idx];
              return (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  className="p-6 rounded-2xl bg-[#0d0d1a] border border-white/5 hover:border-cyan-400/20 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-[#0a0a18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={t('aboutPage.founderEyebrow')} title={t('aboutPage.founderTitle')} className="mb-12" />
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
              <div className="relative w-56 h-56 shrink-0 rounded-2xl overflow-hidden group">
                <RevealImage
                  src={TEAM_MEMBERS[0].image}
                  alt={TEAM_MEMBERS[0].name}
                  direction="scale"
                  containerClassName="w-full h-full"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 border-2 border-cyan-400/0 group-hover:border-cyan-400/40 rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  {TEAM_MEMBERS[0].name}
                </h3>
                <p className="text-cyan-400 font-semibold mb-4">{t('aboutPage.teamRole')}</p>
                <p className="text-slate-400 leading-relaxed mb-6">{t('aboutPage.teamBio')}</p>
                <div className="flex flex-wrap gap-2">
                  {certs.map((cert) => (
                    <span key={cert} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-cyan-400/30 text-cyan-400 bg-cyan-400/5">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Workshop images */}
      <section className="py-24 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={t('aboutPage.studioEyebrow')} title={t('aboutPage.studioTitle')} className="mb-12" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
              'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80',
              'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
              'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&q=80',
              'https://images.unsplash.com/photo-1605559424843-9073c6223f25?w=600&q=80',
              'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&q=80',
            ].map((src, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-square">
                <RevealImage
                  src={src}
                  alt={'Workshop ' + (i + 1)}
                  direction="scale"
                  delay={i * 0.1}
                  containerClassName="w-full h-full"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a18] text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            {t('aboutPage.ctaTitle')}
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">{t('aboutPage.ctaSubtitle')}</p>
          <Link to="/contact">
            <Button size="lg" variant="primary" className="group">
              {t('aboutPage.ctaCta')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
`;
writeFileSync('src/pages/About/About.tsx', about);
console.log('✓ About.tsx');

// ─── Contact ─────────────────────────────────────────────────────────────────
const contact = `import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import ContactForm from '@/widgets/ContactForm/ContactForm';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

export default function Contact() {
  const { t } = useTranslation();

  const contactInfoItems = [
    { icon: MapPin, label: t('contactPage.contactInfo.location'), value: t('contactPage.contactInfo.locationValue'), href: 'https://maps.google.com' },
    { icon: Phone, label: t('contactPage.contactInfo.phone'), value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: Mail, label: t('contactPage.contactInfo.email'), value: 'hello@martinwrap.studio', href: 'mailto:hello@martinwrap.studio' },
    { icon: Clock, label: t('contactPage.contactInfo.hours'), value: t('contactPage.contactInfo.hoursValue') },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-50" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(0,245,255,0.1) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
              <span className="w-6 h-px bg-cyan-400" />
              {t('contactPage.eyebrow')}
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              {t('contactPage.title')}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('contactPage.subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                className="space-y-6"
              >
                <motion.div variants={staggerItem}>
                  <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                    {t('contactPage.infoTitle')}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t('contactPage.infoSubtitle')}
                  </p>
                </motion.div>

                {contactInfoItems.map(({ icon: Icon, label, value, href }) => (
                  <motion.div key={label} variants={staggerItem} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                      {href ? (
                        <a href={href} className="text-sm text-slate-300 hover:text-cyan-400 transition-colors whitespace-pre-line">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-300 whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Social */}
                <motion.div variants={staggerItem}>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{t('contactPage.followUs')}</div>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, href: '#', label: 'Instagram' },
                      { icon: Facebook, href: '#', label: 'Facebook' },
                    ].map(({ icon: SIcon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-200"
                      >
                        <SIcon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 border border-white/5"
            >
              <h2 className="text-xl font-bold text-white mb-6">{t('contactPage.formTitle')}</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <section className="py-4 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            className="rounded-2xl overflow-hidden border border-white/5 h-80"
          >
            <iframe
              title="Martin Wrap Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799160891!2d-74.25986548248684!3d40.697670063539654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1703000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      <div className="h-16 bg-[#080810]" />
    </div>
  );
}
`;
writeFileSync('src/pages/Contact/Contact.tsx', contact);
console.log('✓ Contact.tsx');

// ─── ContactForm ─────────────────────────────────────────────────────────────
const contactForm = `import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  vehicle?: string;
  message: string;
}

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const serviceOptions = t('form.serviceOptions', { returnObjects: true }) as string[];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log('Form submitted:', data);
    setSubmitStatus('success');
    reset();
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const fieldClass = (hasError: boolean) =>
    clsx(
      'w-full px-4 py-3 rounded-xl bg-[#0d0d1a] border text-white text-sm placeholder:text-slate-500',
      'focus:outline-none focus:ring-2 transition-all duration-200',
      hasError
        ? 'border-red-500/50 focus:ring-red-500/30'
        : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
    );

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-400/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{t('form.successTitle')}</h3>
        <p className="text-slate-400">{t('form.successBody')}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {t('form.error')}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.name')} *</label>
          <input
            {...register('name', { required: t('form.nameRequired'), minLength: { value: 2, message: t('form.nameMin') } })}
            placeholder={t('form.namePlaceholder')}
            className={fieldClass(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.email')} *</label>
          <input
            type="email"
            {...register('email', {
              required: t('form.emailRequired'),
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('form.emailInvalid') },
            })}
            placeholder={t('form.emailPlaceholder')}
            className={fieldClass(!!errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.phone')}</label>
          <input
            type="tel"
            {...register('phone')}
            placeholder={t('form.phonePlaceholder')}
            className={fieldClass(false)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.service')} *</label>
          <select
            {...register('service', { required: t('form.serviceRequired') })}
            className={clsx(fieldClass(!!errors.service), 'appearance-none cursor-pointer')}
            defaultValue=""
          >
            <option value="" disabled>{t('form.serviceSelect')}</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-[#0d0d1a]">{s}</option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-red-400">{errors.service.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.vehicle')}</label>
        <input
          {...register('vehicle')}
          placeholder={t('form.vehiclePlaceholder')}
          className={fieldClass(false)}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.message')} *</label>
        <textarea
          {...register('message', { required: t('form.messageRequired'), minLength: { value: 10, message: t('form.messageMin') } })}
          placeholder={t('form.messagePlaceholder')}
          rows={5}
          className={clsx(fieldClass(!!errors.message), 'resize-none')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <Button type="submit" size="lg" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            {t('form.sending')}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t('form.send')}
          </>
        )}
      </Button>
    </form>
  );
}
`;
writeFileSync('src/widgets/ContactForm/ContactForm.tsx', contactForm);
console.log('✓ ContactForm.tsx');

// ─── App ─────────────────────────────────────────────────────────────────────
const app = `import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/shared/LoadingScreen';

const Home = lazy(() => import('@/pages/Home/Home'));
const Services = lazy(() => import('@/pages/Services/Services'));
const Gallery = lazy(() => import('@/pages/Gallery/Gallery'));
const Pricing = lazy(() => import('@/pages/Pricing/Pricing'));
const About = lazy(() => import('@/pages/About/About'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));

function PageLoader() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="spinner" />
        <p className="text-sm text-slate-500">{t('common.loading')}</p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-white mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
        404
      </h1>
      <p className="text-slate-400 mb-8">{t('notFound.message')}</p>
      <a href="/" className="px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors">
        {t('notFound.back')}
      </a>
    </div>
  );
}

export default function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={appLoading} />
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </>
  );
}
`;
writeFileSync('src/App.tsx', app);
console.log('✓ App.tsx');

console.log('\n✅ All page files written successfully!');
