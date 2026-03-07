import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { NAV_LINKS } from '@/helpers/constants';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-accent)' }}
    >
      {/* Ambient glow — only visible in dark mode */}
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
              Martin Wrap Studio — premium automotive wrapping. We transform vehicles with precision, passion, and uncompromising quality.
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
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 hover:text-cyan-500"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
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
              Services
            </h3>
            <ul className="space-y-2">
              {['Full Car Wraps', 'Color Change', 'Partial Wraps', 'Commercial Branding', 'Paint Protection Film'].map((s) => (
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
              Contact
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

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-base)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            &copy; {year} Martin Wrap Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200 hover:text-cyan-500"
                style={{ color: 'var(--text-muted)' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
