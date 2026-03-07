import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import ContactForm from '@/widgets/ContactForm/ContactForm';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Studio Location',
    value: '123 Auto Boulevard, Motor City, MC 90210',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@martinwrap.studio',
    href: 'mailto:hello@martinwrap.studio',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat 8am – 6pm\nSunday: Closed',
  },
];

export default function Contact() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-50" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(0,245,255,0.1) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
              <span className="w-6 h-px bg-cyan-400" />
              Get In Touch
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              LET'S <span className="gradient-text">TALK</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Book a consultation, get a quote, or just say hello. We respond to all inquiries within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                className="space-y-6"
              >
                <motion.div variants={staggerItem}>
                  <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                    Contact Information
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Drop by the studio, give us a call, or send a message. We'd love to hear about your project.
                  </p>
                </motion.div>

                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <motion.div key={label} variants={staggerItem} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                      {href ? (
                        <a href={href} className="text-sm text-slate-300 hover:text-cyan-400 transition-colors whitespace-pre-line">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-300 whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Social */}
                <motion.div variants={staggerItem}>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Follow Us</div>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, href: '#', label: 'Instagram' },
                      { icon: Facebook, href: '#', label: 'Facebook' },
                    ].map(({ icon: SIcon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-200"
                      >
                        <SIcon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 border border-white/5"
            >
              <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps embed */}
      <section className="py-4 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            className="rounded-2xl overflow-hidden border border-white/5 h-80"
          >
            <iframe
              title="Martin Wrap Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799160891!2d-74.25986548248684!3d40.697670063539654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1703000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-16 bg-[#080810]" />
    </div>
  );
}
