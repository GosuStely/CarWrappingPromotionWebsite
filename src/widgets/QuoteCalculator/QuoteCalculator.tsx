import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';
import { QUOTE_PRICE_MATRIX } from '@/helpers/constants';

const VEHICLE_SIZES = [
  { id: 'hatchback', label: 'Hatchback', sub: 'Polo, Clio, Golf' },
  { id: 'sedan',     label: 'Sedan / Coupe', sub: 'BMW 3, Audi A4' },
  { id: 'suv',       label: 'SUV / Crossover', sub: 'X5, Q7, Urus' },
  { id: 'truck',     label: 'Truck / Van', sub: 'Sprinter, Transit' },
  { id: 'exotic',    label: 'Exotic / Supercar', sub: 'Ferrari, McLaren' },
] as const;

const SERVICE_TYPES = [
  { id: 'full-wrap',    label: 'Full Car Wrap' },
  { id: 'color-change', label: 'Color Change' },
  { id: 'partial',      label: 'Partial Wrap' },
  { id: 'commercial',   label: 'Commercial' },
  { id: 'ppf',          label: 'PPF' },
] as const;

type VehicleId = typeof VEHICLE_SIZES[number]['id'];
type ServiceId = typeof SERVICE_TYPES[number]['id'];

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

export default function QuoteCalculator() {
  const [vehicle, setVehicle] = useState<VehicleId | null>(null);
  const [service, setService] = useState<ServiceId | null>(null);

  const range = vehicle && service ? QUOTE_PRICE_MATRIX[service]?.[vehicle] : null;

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d0d1a] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-cyan-400/10 flex items-center justify-center">
          <Calculator className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base">Instant Price Estimator</h3>
          <p className="text-xs text-slate-500">Get a ballpark figure in seconds</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Step 1 – Vehicle */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400 mb-3">
            1 · Vehicle Size
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {VEHICLE_SIZES.map((v) => (
              <button
                key={v.id}
                onClick={() => setVehicle(v.id)}
                className={clsx(
                  'p-3 rounded-xl border text-left transition-all duration-200',
                  vehicle === v.id
                    ? 'border-cyan-400 bg-cyan-400/10 text-white'
                    : 'border-white/8 bg-white/3 text-slate-400 hover:border-white/20 hover:text-slate-300'
                )}
              >
                <div className="text-sm font-semibold leading-tight">{v.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{v.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 – Service */}
        <div>
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-400 mb-3">
            2 · Service Type
          </p>
          <div className="flex flex-wrap gap-2">
            {SERVICE_TYPES.map((s) => (
              <button
                key={s.id}
                onClick={() => setService(s.id)}
                className={clsx(
                  'px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200',
                  service === s.id
                    ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                    : 'border-white/8 text-slate-400 hover:border-white/20 hover:text-slate-300'
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {range ? (
            <motion.div
              key={`${vehicle}-${service}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <p className="text-xs text-slate-400 mb-1">Estimated range</p>
                <p className="text-3xl font-black text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  {fmt(range[0])} – {fmt(range[1])}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Final price depends on vehicle condition, finish choice & custom options.
                </p>
              </div>
              <Link to="/contact" className="shrink-0">
                <Button variant="primary" size="md" className="group w-full sm:w-auto">
                  Get Exact Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-white/5 bg-white/2 p-5 text-center text-sm text-slate-500"
            >
              Select a vehicle size and service type to see your estimate.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
