import { writeFileSync } from 'fs';

const navbar = `import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Zap, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '@/helpers/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
] as const;

const NAV_KEYS = ['home', 'services', 'gallery', 'pricing', 'about', 'contact'] as const;

function LanguageSwitcher({ isDark }: { isDark: boolean }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('mws-language', code);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200',
          isDark ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        )}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span>{current.code.toUpperCase()}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-36 rounded-xl border shadow-xl overflow-hidden z-50"
            style={{ backgroundColor: 'var(--navbar-bg)', borderColor: 'var(--navbar-border)', backdropFilter: 'blur(20px)' }}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={clsx(
                  'w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150',
                  lang.code === i18n.language
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('mws-language', code);
  };

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300',
          scrolled ? 'backdrop-blur-xl shadow-sm' : 'border-transparent'
        )}
        style={{
          backgroundColor: scrolled ? 'var(--navbar-bg)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--navbar-border)' : 'transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,200,220,0.55)] transition-shadow duration-300">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-md group-hover:blur-lg transition-all duration-300" />
              </div>
              <span
                className={clsx('text-xl font-black tracking-wider leading-none transition-colors duration-200', isDark ? 'text-white' : 'text-slate-900')}
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                MARTIN <span className="text-cyan-500">WRAP</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'text-sm font-medium tracking-wide transition-colors duration-200 relative group',
                    location.pathname === link.path ? 'text-cyan-500' : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {t(\`nav.\${NAV_KEYS[i]}\`)}
                  <span className={clsx('absolute -bottom-1 left-0 h-px bg-cyan-500 transition-all duration-300', location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full')} />
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher isDark={isDark} />
              <Link to="/contact" className="px-5 py-2 rounded-full text-sm font-semibold bg-cyan-500 text-white hover:bg-cyan-400 hover:text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,210,230,0.45)]">
                {t('nav.bookNow')}
              </Link>
            </div>

            <div className="flex lg:hidden items-center gap-1">
              <LanguageSwitcher isDark={isDark} />
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={clsx('p-2 rounded-xl transition-colors duration-200', isDark ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden border-b shadow-xl"
            style={{ backgroundColor: 'var(--navbar-bg)', borderColor: 'var(--navbar-border)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200',
                    location.pathname === link.path ? 'text-cyan-500 bg-cyan-500/10' : isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  {t(\`nav.\${NAV_KEYS[i]}\`)}
                </Link>
              ))}
              <Link to="/contact" className="mt-3 px-4 py-3 rounded-xl text-sm font-semibold bg-cyan-500 text-white text-center hover:bg-cyan-400 hover:text-black transition-colors">
                {t('nav.bookNow')}
              </Link>
              <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={clsx(
                      'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-colors duration-200',
                      lang.code === i18n.language
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-400/30'
                        : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5 border border-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`;

writeFileSync('src/components/layout/Navbar.tsx', navbar, 'utf8');
console.log('✓ Navbar.tsx');

// ── Footer.tsx ───────────────────────────────────────────────────────────────
const footer = `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS } from '@/helpers/constants';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

const NAV_KEYS = ['home', 'services', 'gallery', 'pricing', 'about', 'contact'] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  const serviceLinks = t('footer.serviceLinks', { returnObjects: true }) as string[];

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-accent)' }}
    >
      <div className="dark:block hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <motion.div variants={staggerItem} className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span
                className="text-xl font-black tracking-wider leading-none"
                style={{ color: 'var(--text-primary)', fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                MARTIN <span className="text-cyan-500">WRAP</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook,  href: '#', label: 'Facebook' },
                { icon: Youtube,   href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 hover:text-cyan-500 hover:border-cyan-500/40 hover:bg-cyan-500/10"
                  style={{ borderColor: 'var(--border-base)', color: 'var(--text-muted)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={staggerItem}>
            <h3
              className="font-semibold tracking-wide mb-4 text-sm uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 hover:text-cyan-500"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {t(\`nav.\${NAV_KEYS[i]}\`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={staggerItem}>
            <h3
              className="font-semibold tracking-wide mb-4 text-sm uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('footer.services')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm transition-colors duration-200 hover:text-cyan-500"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h3
              className="font-semibold tracking-wide mb-4 text-sm uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  123 Auto Boulevard, Motor City, MC 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="text-sm transition-colors duration-200 hover:text-cyan-500"
                  style={{ color: 'var(--text-muted)' }}
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                <a
                  href="mailto:hello@martinwrap.studio"
                  className="text-sm transition-colors duration-200 hover:text-cyan-500"
                  style={{ color: 'var(--text-muted)' }}
                >
                  hello@martinwrap.studio
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-base)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('footer.copyright', { year })}
          </p>
          <div className="flex gap-6">
            {([
              { key: 'footer.privacy' },
              { key: 'footer.terms' },
              { key: 'footer.sitemap' },
            ] as const).map(({ key }) => (
              <a
                key={key}
                href="#"
                className="text-xs transition-colors duration-200 hover:text-cyan-500"
                style={{ color: 'var(--text-muted)' }}
              >
                {t(key)}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
`;

writeFileSync('src/components/layout/Footer.tsx', footer, 'utf8');
console.log('✓ Footer.tsx');

// ── StickyBooking.tsx ─────────────────────────────────────────────────────────
const stickyBooking = `import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function StickyBooking() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            to="/contact"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-black font-semibold text-sm shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:bg-cyan-300 hover:shadow-[0_0_40px_rgba(0,245,255,0.7)] transition-all duration-200 group"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {t('common.bookAWrap')}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;

writeFileSync('src/components/shared/StickyBooking.tsx', stickyBooking, 'utf8');
console.log('✓ StickyBooking.tsx');

// ── Hero.tsx ──────────────────────────────────────────────────────────────────
const hero = `import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { STATS } from '@/helpers/constants';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const { t } = useTranslation();

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = t('hero.words', { returnObjects: true }) as string[];
  const currentWord = words[0];

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 animated-gradient-bg" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0">
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
                <div className="text-sm text-slate-400">{t(\`stats.\${stat.key}\`)}</div>
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
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
`;

writeFileSync('src/widgets/Hero/Hero.tsx', hero, 'utf8');
console.log('✓ Hero.tsx');

// ── ServiceCards.tsx ──────────────────────────────────────────────────────────
const serviceCards = `import { Link } from 'react-router-dom';
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
  const features = t(\`servicesData.\${tKey}.features\`, { returnObjects: true }) as string[];

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

      <h3 className="text-xl font-bold text-white mb-2">{t(\`servicesData.\${tKey}.title\`)}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{t(\`servicesData.\${tKey}.description\`)}</p>

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
`;

writeFileSync('src/widgets/ServiceCards/ServiceCards.tsx', serviceCards, 'utf8');
console.log('✓ ServiceCards.tsx');

// ── Testimonials.tsx ──────────────────────────────────────────────────────────
const testimonials = `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TESTIMONIALS } from '@/helpers/constants';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={\`w-4 h-4 \${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}\`} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const prev = () => setCurrent((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-[#0a0a18] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={t('testimonials.eyebrow')}
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
          className="mb-16"
        />

        <div className="relative max-w-4xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-8 sm:p-12 border border-white/5 relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-cyan-400/10" />
              <StarRating rating={TESTIMONIALS[current].rating} />
              <blockquote className="text-lg sm:text-xl text-white leading-relaxed mt-4 mb-6">
                "{TESTIMONIALS[current].text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {TESTIMONIALS[current].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{TESTIMONIALS[current].name}</div>
                  <div className="text-sm text-slate-400">{TESTIMONIALS[current].role}</div>
                  {TESTIMONIALS[current].vehicleType && (
                    <div className="text-xs text-cyan-400 mt-0.5">{TESTIMONIALS[current].vehicleType}</div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={\`h-1.5 rounded-full transition-all duration-300 \${i === current ? 'w-8 bg-cyan-400' : 'w-1.5 bg-white/20'}\`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {TESTIMONIALS.slice(0, 3).map((t_) => (
            <motion.div
              key={t_.id}
              variants={staggerItem}
              className="p-5 rounded-xl bg-[#0d0d1a] border border-white/5 hover:border-cyan-400/20 transition-colors duration-300"
            >
              <StarRating rating={t_.rating} />
              <p className="text-sm text-slate-400 mt-3 mb-4 line-clamp-3">"{t_.text}"</p>
              <div className="text-sm font-semibold text-white">{t_.name}</div>
              <div className="text-xs text-slate-500">{t_.vehicleType}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
`;

writeFileSync('src/widgets/Testimonials/Testimonials.tsx', testimonials, 'utf8');
console.log('✓ Testimonials.tsx');

// ── GalleryGrid.tsx ───────────────────────────────────────────────────────────
const galleryGrid = `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { GALLERY_ITEMS } from '@/helpers/constants';
import { Modal } from '@/components/ui/Modal';
import { RevealImage } from '@/components/animations/RevealImage';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';
import type { GalleryCategory, GalleryItem } from '@/types/gallery';

const CATEGORY_KEYS: { labelKey: string; value: GalleryCategory }[] = [
  { labelKey: 'galleryPage.categories.all', value: 'all' },
  { labelKey: 'galleryPage.categories.fullWrap', value: 'full-wrap' },
  { labelKey: 'galleryPage.categories.colorChange', value: 'color-change' },
  { labelKey: 'galleryPage.categories.ppf', value: 'ppf' },
  { labelKey: 'galleryPage.categories.commercial', value: 'commercial' },
  { labelKey: 'galleryPage.categories.partial', value: 'partial' },
];

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <motion.div
      variants={staggerItem}
      layout
      className="relative group rounded-xl overflow-hidden cursor-pointer bg-[#0d0d1a] aspect-[4/3]"
      onClick={onClick}
    >
      <RevealImage
        src={item.imageUrl}
        alt={item.title}
        direction="scale"
        containerClassName="w-full h-full"
        className="transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-sm">{item.title}</h3>
        <p className="text-cyan-400 text-xs mt-0.5">{item.vehicle}</p>
      </div>
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
        <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
      </div>
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-full bg-black/50 text-slate-300 backdrop-blur-sm border border-white/10">
          {item.category.replace('-', ' ')}
        </span>
      </div>
    </motion.div>
  );
}

export default function GalleryGrid({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const { t } = useTranslation();

  const filtered = (
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory)
  ).slice(0, limit);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORY_KEYS.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === cat.value
                ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,245,255,0.4)]'
                : 'border border-white/10 text-slate-400 hover:text-white hover:border-white/30'
            )}
          >
            {t(cat.labelKey)}
          </button>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={() => setSelected(item)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="relative">
            <img
              src={selected.imageUrl}
              alt={selected.title}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="p-6 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-1">{selected.title}</h3>
              <p className="text-cyan-400 text-sm">{selected.vehicle}</p>
              {selected.color && (
                <p className="text-slate-400 text-sm mt-1">{t('galleryPage.color')}: {selected.color}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {selected.tags?.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
`;

writeFileSync('src/widgets/GalleryGrid/GalleryGrid.tsx', galleryGrid, 'utf8');
console.log('✓ GalleryGrid.tsx');

// ── PricingTable.tsx ──────────────────────────────────────────────────────────
const pricingTable = `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';
import { PRICING_TIERS } from '@/helpers/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';
import { formatPrice } from '@/helpers/format';
import type { PricingTier } from '@/types/pricing';

function PricingCard({ tier }: { tier: PricingTier }) {
  const isNeon = tier.color === 'neon';
  const isGold = tier.color === 'gold';
  const { t } = useTranslation();

  const tierFeatureLabels = t(\`pricingData.tiers.\${tier.id}.features\`, { returnObjects: true }) as string[];
  const features = tier.features.map((feat, i) => ({
    ...feat,
    label: Array.isArray(tierFeatureLabels) ? (tierFeatureLabels[i] ?? feat.label) : feat.label,
  }));

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'relative rounded-2xl p-8 border flex flex-col transition-all duration-300',
        isNeon
          ? 'bg-gradient-to-b from-cyan-400/10 to-transparent border-cyan-400/40 shadow-[0_0_60px_rgba(0,245,255,0.1)]'
          : isGold
          ? 'bg-gradient-to-b from-amber-400/10 to-transparent border-amber-400/40'
          : 'bg-[#0d0d1a] border-white/5 hover:border-white/10'
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="popular" className="shadow-[0_0_20px_rgba(0,245,255,0.5)]">
            {t('pricingData.mostPopular')}
          </Badge>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={clsx('text-2xl font-black mb-1', isNeon ? 'text-cyan-400' : isGold ? 'text-amber-400' : 'text-white')}
          style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
        >
          {t(\`pricingData.tiers.\${tier.id}.name\`)}
        </h3>
        <p className="text-sm text-slate-400">{t(\`pricingData.tiers.\${tier.id}.tagline\`)}</p>
      </div>

      <div className="mb-6">
        <div className="text-xs text-slate-500 mb-1">{t('pricingData.priceNote')}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            {formatPrice(tier.price)}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feat) => (
          <li key={feat.label} className="flex items-center gap-3">
            {feat.included ? (
              <div className={clsx('w-5 h-5 rounded-full flex items-center justify-center shrink-0', isNeon ? 'bg-cyan-400/20' : isGold ? 'bg-amber-400/20' : 'bg-green-400/20')}>
                <Check className={clsx('w-3 h-3', isNeon ? 'text-cyan-400' : isGold ? 'text-amber-400' : 'text-green-400')} />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <X className="w-3 h-3 text-slate-600" />
              </div>
            )}
            <span className={clsx('text-sm', feat.included ? 'text-slate-300' : 'text-slate-600')}>{feat.label}</span>
          </li>
        ))}
      </ul>

      <Link to="/contact">
        <Button variant={isNeon ? 'primary' : isGold ? 'gold' : 'secondary'} size="lg" className="w-full">
          {t(\`pricingData.tiers.\${tier.id}.cta\`)}
        </Button>
      </Link>
    </motion.div>
  );
}

export default function PricingTable() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
    >
      {PRICING_TIERS.map((tier) => (
        <PricingCard key={tier.id} tier={tier} />
      ))}
    </motion.div>
  );
}
`;

writeFileSync('src/widgets/PricingTable/PricingTable.tsx', pricingTable, 'utf8');
console.log('✓ PricingTable.tsx');

console.log('\n✅ All widget/layout files written successfully!');
