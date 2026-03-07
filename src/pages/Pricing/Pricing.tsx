import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import PricingTable from '@/widgets/PricingTable/PricingTable';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

const FAQS = [
  {
    q: 'How long does a full wrap take?',
    a: 'A full car wrap typically takes 3–5 business days depending on vehicle size and complexity. Commercial vehicle wraps may take longer.',
  },
  {
    q: 'How long will my wrap last?',
    a: 'With proper care, a quality vinyl wrap lasts 5–7 years. We use premium Avery Dennison and 3M materials with UV protection.',
  },
  {
    q: 'Can I wash my wrapped vehicle?',
    a: 'Yes! Hand washing is recommended. Avoid automatic car washes with brushes, high-pressure jets, and harsh chemicals for the first week.',
  },
  {
    q: 'Will the wrap damage my original paint?',
    a: 'No — wraps actually protect your original paint. When removed professionally, your OEM paint will be in the same condition as when applied.',
  },
  {
    q: 'Do you offer warranty on your wraps?',
    a: 'Yes. We offer a 3-year installation warranty on Pro packages and 5 years on Elite. Material warranties are covered by the manufacturer.',
  },
  {
    q: 'Can you match a custom color?',
    a: 'Absolutely. We have access to thousands of colors and can work with custom color mix orders through our premium material partners.',
  },
];

export default function Pricing() {
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
              Transparent Pricing
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              INVESTMENT IN <span className="gradient-text">EXCELLENCE</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Honest, transparent pricing with no hidden fees. Every package includes professional installation and our quality guarantee.
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
            * Prices are starting points and may vary by vehicle size, complexity, and materials.
            <Link to="/contact" className="text-cyan-400 hover:underline ml-1">Get a custom quote.</Link>
          </motion.p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-[#0a0a18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Optional Add-ons"
            title="Enhance Your Package"
            subtitle="Customize your wrap experience with premium add-on services."
            className="mb-12"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { label: 'Window Tinting', price: 299, unit: 'from' },
              { label: 'Ceramic Coating', price: 599, unit: 'from' },
              { label: 'Interior Trim Wrap', price: 399, unit: 'from' },
              { label: 'Chrome Delete', price: 249, unit: 'from' },
              { label: 'Headlight Tint', price: 149, unit: 'from' },
              { label: 'Roof Wrap', price: 350, unit: 'from' },
              { label: 'Mirror Caps', price: 199, unit: 'from' },
              { label: 'Custom Design', price: 299, unit: 'from' },
            ].map((addon) => (
              <motion.div
                key={addon.label}
                variants={staggerItem}
                className="p-4 rounded-xl bg-[#0d0d1a] border border-white/5 hover:border-cyan-400/20 transition-colors duration-300 flex items-center justify-between"
              >
                <span className="text-sm text-slate-300">{addon.label}</span>
                <span className="text-sm font-bold text-white">+${addon.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#080810]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
            subtitle="Everything you need to know before booking your wrap."
            className="mb-12"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="space-y-4"
          >
            {FAQS.map((faq) => (
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
            <p className="text-slate-400 mb-4">Still have questions?</p>
            <Link to="/contact">
              <Button variant="primary" size="lg" className="group">
                Ask Us Anything
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
