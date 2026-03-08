import { Link } from 'react-router-dom';
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
