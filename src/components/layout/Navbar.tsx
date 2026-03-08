import { useState, useEffect, useRef } from 'react';
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
                  {t(`nav.${NAV_KEYS[i]}`)}
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
                  {t(`nav.${NAV_KEYS[i]}`)}
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
