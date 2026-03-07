import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  vehicle?: string;
  message: string;
}

const SERVICE_OPTIONS = [
  'Full Car Wrap',
  'Color Change Wrap',
  'Partial Wrap',
  'Commercial Branding',
  'Paint Protection Film (PPF)',
  'Other / Not Sure',
];

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200)); // Simulate API call
    console.log('Form submitted:', data);
    setSubmitStatus('success');
    reset();
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const fieldClass = (hasError: boolean) =>
    clsx(
      'w-full px-4 py-3 rounded-xl bg-[#0d0d1a] border text-white text-sm placeholder:text-slate-500',
      'focus:outline-none focus:ring-2 transition-all duration-200',
      hasError
        ? 'border-red-500/50 focus:ring-red-500/30'
        : 'border-white/10 focus:border-cyan-400/50 focus:ring-cyan-400/20'
    );

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-400/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-slate-400">We'll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name *</label>
          <input
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
            placeholder="John Smith"
            className={fieldClass(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address *</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
            })}
            placeholder="john@example.com"
            className={fieldClass(!!errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Phone (optional)</label>
          <input
            type="tel"
            {...register('phone')}
            placeholder="+1 (555) 000-0000"
            className={fieldClass(false)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Service Interested In *</label>
          <select
            {...register('service', { required: 'Please select a service' })}
            className={clsx(fieldClass(!!errors.service), 'appearance-none cursor-pointer')}
            defaultValue=""
          >
            <option value="" disabled>Select a service...</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-[#0d0d1a]">{s}</option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-red-400">{errors.service.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Vehicle (optional)</label>
        <input
          {...register('vehicle')}
          placeholder="e.g. 2022 BMW M3, Tesla Model S"
          className={fieldClass(false)}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Message *</label>
        <textarea
          {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Min 10 characters' } })}
          placeholder="Tell us about your project, preferred colors, timeline, or any questions..."
          rows={5}
          className={clsx(fieldClass(!!errors.message), 'resize-none')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
