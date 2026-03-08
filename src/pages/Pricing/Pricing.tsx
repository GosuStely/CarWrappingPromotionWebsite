import { Link } from 'react-router-dom';
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
