import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyBooking from '@/components/shared/StickyBooking';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex flex-col bg-[#080810]"
      style={{ color: 'var(--text-primary)' }}
    >
      <Navbar />
      {/*
        No AnimatePresence here — mode="wait" caused the page content to be
        invisible during the exit animation (React Router had already switched
        the route, so the exiting element rendered the NEW page while fading out,
        then the new element also faded in, creating a double-flash).
        Simple key-based fade-in is reliable and instant.
      */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
      <StickyBooking />
    </div>
  );
}
