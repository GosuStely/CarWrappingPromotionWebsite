import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const serviceOptions = t('form.serviceOptions', { returnObjects: true }) as string[];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
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
        <h3 className="text-2xl font-bold text-white mb-2">{t('form.successTitle')}</h3>
        <p className="text-slate-400">{t('form.successBody')}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {t('form.error')}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.name')} *</label>
          <input
            {...register('name', { required: t('form.nameRequired'), minLength: { value: 2, message: t('form.nameMin') } })}
            placeholder={t('form.namePlaceholder')}
            className={fieldClass(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.email')} *</label>
          <input
            type="email"
            {...register('email', {
              required: t('form.emailRequired'),
              pattern: { value: /^[^s@]+@[^s@]+.[^s@]+$/, message: t('form.emailInvalid') },
            })}
            placeholder={t('form.emailPlaceholder')}
            className={fieldClass(!!errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.phone')}</label>
          <input
            type="tel"
            {...register('phone')}
            placeholder={t('form.phonePlaceholder')}
            className={fieldClass(false)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.service')} *</label>
          <select
            {...register('service', { required: t('form.serviceRequired') })}
            className={clsx(fieldClass(!!errors.service), 'appearance-none cursor-pointer')}
            defaultValue=""
          >
            <option value="" disabled>{t('form.serviceSelect')}</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s} className="bg-[#0d0d1a]">{s}</option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-red-400">{errors.service.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.vehicle')}</label>
        <input
          {...register('vehicle')}
          placeholder={t('form.vehiclePlaceholder')}
          className={fieldClass(false)}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('form.message')} *</label>
        <textarea
          {...register('message', { required: t('form.messageRequired'), minLength: { value: 10, message: t('form.messageMin') } })}
          placeholder={t('form.messagePlaceholder')}
          rows={5}
          className={clsx(fieldClass(!!errors.message), 'resize-none')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <Button type="submit" size="lg" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            {t('form.sending')}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t('form.send')}
          </>
        )}
      </Button>
    </form>
  );
}
