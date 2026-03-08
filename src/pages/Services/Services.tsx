import { Link } from 'react-router-dom';
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
import TrustBar from '@/components/shared/TrustBar';

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

      <TrustBar />

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
