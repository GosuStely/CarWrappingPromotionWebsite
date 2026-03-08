import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, FileText, CalendarDays, Wrench, Sparkles, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

const STEPS = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Free Consultation',
    desc: 'Tell us about your vehicle and vision. We advise on the best wrap type, finish, and color for your goals.',
  },
  {
    icon: FileText,
    number: '02',
    title: 'Custom Quote',
    desc: 'Receive a detailed, no-obligation quote within 24 hours — itemised by materials, labour and timeline.',
  },
  {
    icon: CalendarDays,
    number: '03',
    title: 'Schedule Drop-off',
    desc: "Book your slot online or by phone. We'll confirm availability and arrange a convenient drop-off time.",
  },
  {
    icon: Wrench,
    number: '04',
    title: 'Expert Installation',
    desc: 'Our certified installers prep and wrap your vehicle in a climate-controlled studio. Zero shortcuts.',
  },
  {
    icon: Sparkles,
    number: '05',
    title: 'Delivery & Reveal',
    desc: 'After a full quality inspection, your vehicle is ready. Most wraps are completed within 2–4 days.',
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#080810] relative overflow-hidden">
      {/* Subtle radial accent */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
            <span className="w-6 h-px bg-cyan-400" />
            How It Works
            <span className="w-6 h-px bg-cyan-400" />
          </span>
          <h2
            className="text-5xl sm:text-6xl font-black text-white"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            From Vision to Road
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Five simple steps stand between you and a head-turning vehicle transformation.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="relative"
        >
          {/* Connector line – desktop */}
          <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={staggerItem}
                  className="flex flex-col items-center lg:items-center text-left lg:text-center group"
                >
                  {/* Icon circle */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-2xl bg-[#0d0d1a] border border-white/8 flex items-center justify-center group-hover:border-cyan-400/40 group-hover:bg-cyan-400/5 transition-all duration-300">
                      <Icon className="w-7 h-7 text-cyan-400" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-400 text-black text-[10px] font-black flex items-center justify-center">
                      {step.number.replace('0', '')}
                    </span>
                  </div>

                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <ScrollReveal delay={0.2} className="text-center mt-14">
          <Link to="/contact">
            <Button variant="primary" size="lg" className="group">
              Start with a Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
