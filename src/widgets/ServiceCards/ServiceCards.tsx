import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Palette, Layers, Truck, Shield, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '@/helpers/constants';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';
import { formatPrice } from '@/helpers/format';
import type { Service } from '@/types/service';

const iconMap: Record<string, React.ElementType> = {
  car: Car, palette: Palette, layers: Layers, truck: Truck, shield: Shield,
};

function idToKey(id: string) {
  return id.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] ?? Car;
  const { t } = useTranslation();
  const tKey = idToKey(service.id);
  const features = t(`servicesData.${tKey}.features`, { returnObjects: true }) as string[];

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'relative group rounded-2xl p-6 border transition-all duration-300 cursor-pointer',
        'bg-[#0d0d1a] border-white/5',
        'hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,245,255,0.08)]'
      )}
    >
      {service.popular && (
        <div className="absolute -top-3 left-6">
          <Badge variant="popular">{t('serviceCards.mostPopular')}</Badge>
        </div>
      )}

      <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-5 group-hover:bg-cyan-400/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-cyan-400" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{t(`servicesData.${tKey}.title`)}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{t(`servicesData.${tKey}.description`)}</p>

      <ul className="space-y-1.5 mb-6">
        {(Array.isArray(features) ? features : service.features).slice(0, 3).map((feat, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
            {feat}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500">{t('serviceCards.startingFrom')}</span>
          <div className="text-lg font-black text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            {formatPrice(service.startingPrice)}
          </div>
        </div>
        <Link
          to="/services"
          className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:gap-2.5 transition-all duration-200"
        >
          {t('serviceCards.learnMore')} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function ServiceCards() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#080810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t('serviceCards.eyebrow')}
          title={t('serviceCards.title')}
          subtitle={t('serviceCards.subtitle')}
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
