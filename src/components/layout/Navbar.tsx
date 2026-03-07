import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { NAV_LINKS } from '@/helpers/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl shadow-sm'
            : 'border-transparent'
        )}
        style={{
          backgroundColor: scrolled ? 'var(--navbar-bg)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--navbar-border)' : 'transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,200,220,0.55)] transition-shadow duration-300">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-md group-hover:blur-lg transition-all duration-300" />
              </div>
              <span
                className={clsx(
                  'text-xl font-black tracking-wider leading-none transition-colors duration-200',
                  isDark ? 'text-white' : 'text-slate-900'
                )}
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
              >
                MARTIN <span className="text-cyan-500">WRAP</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'text-sm font-medium tracking-wide transition-colors duration-200 relative group',
                    location.pathname === link.path
                      ? 'text-cyan-500'
                      : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {link.label}
                  <span
                    className={clsx(
                      'absolute -bottom-1 left-0 h-px bg-cyan-500 transition-all duration-300',
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* <ThemeToggle /> */}
              <Link
                to="/contact"
                className="px-5 py-2 rounded-full text-sm font-semibold bg-cyan-500 text-white hover:bg-cyan-400 hover:text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,210,230,0.45)]"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={clsx(
                  'p-2 rounded-xl transition-colors duration-200',
                  isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden border-b shadow-xl"
            style={{
              backgroundColor: 'var(--navbar-bg)',
              borderColor: 'var(--navbar-border)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200',
                    location.pathname === link.path
                      ? 'text-cyan-500 bg-cyan-500/10'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-3 px-4 py-3 rounded-xl text-sm font-semibold bg-cyan-500 text-white text-center hover:bg-cyan-400 hover:text-black transition-colors"
              >
                Book Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
