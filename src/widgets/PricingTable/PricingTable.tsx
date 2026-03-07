import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { clsx } from 'clsx';
import { PRICING_TIERS } from '@/helpers/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';
import { formatPrice } from '@/helpers/format';
import type { PricingTier } from '@/types/pricing';

function PricingCard({ tier }: { tier: PricingTier }) {
  const isNeon = tier.color === 'neon';
  const isGold = tier.color === 'gold';

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
            Most Popular
          </Badge>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={clsx(
            'text-2xl font-black mb-1',
            isNeon ? 'text-cyan-400' : isGold ? 'text-amber-400' : 'text-white'
          )}
          style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
        >
          {tier.name}
        </h3>
        <p className="text-sm text-slate-400">{tier.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {tier.priceNote && <div className="text-xs text-slate-500 mb-1">{tier.priceNote}</div>}
        <div className="flex items-baseline gap-1">
          <span
            className={clsx(
              'text-5xl font-black',
              isNeon ? 'text-white' : isGold ? 'text-white' : 'text-white'
            )}
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            {formatPrice(tier.price)}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feat) => (
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
            <span className={clsx('text-sm', feat.included ? 'text-slate-300' : 'text-slate-600')}>
              {feat.label}
            </span>
          </li>
        ))}
      </ul>

      <Link to="/contact">
        <Button
          variant={isNeon ? 'primary' : isGold ? 'gold' : 'secondary'}
          size="lg"
          className="w-full"
        >
          {tier.cta}
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
