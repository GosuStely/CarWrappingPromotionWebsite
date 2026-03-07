import { useBeforeAfter } from '@/hooks/useBeforeAfter';
import { motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  /** Original / unwrapped photo of the car */
  beforeSrc: string;
  /** Same car (or same model, same angle) with wrap applied */
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Mirror the before image horizontally so it faces the same direction as afterSrc */
  flipBefore?: boolean;
  /** Mirror the after image horizontally */
  flipAfter?: boolean;
  /** CSS object-position for the before image (e.g. "center", "60% 50%") */
  beforePosition?: string;
  /** CSS object-position for the after image */
  afterPosition?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After Wrap',
  flipBefore = false,
  flipAfter = false,
  beforePosition = 'center',
  afterPosition = 'center',
}: BeforeAfterSliderProps) {
  const { sliderPos, containerRef, onMouseDown, onTouchMove } = useBeforeAfter();

  return (
    <div
      ref={containerRef}
      className="relative select-none rounded-2xl overflow-hidden cursor-ew-resize aspect-video w-full"
      onMouseDown={onMouseDown}
      onTouchMove={(e) => onTouchMove(e.nativeEvent)}
    >
      {/* ── AFTER: wrapped car (full frame, always underneath) ─────── */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: afterPosition,
          transform: flipAfter ? 'scaleX(-1)' : undefined,
        }}
        draggable={false}
      />

      {/* ── BEFORE: original car, clipped to sliderPos% ────────────── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            minWidth: `${(100 / Math.max(sliderPos, 0.01)) * 100}%`,
            objectPosition: beforePosition,
            transform: flipBefore ? 'scaleX(-1)' : undefined,
          }}
          draggable={false}
        />
      </div>

      {/* ── DIVIDER LINE ─────────────────────────────────────────────── */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle knob */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronsLeftRight className="w-5 h-5 text-black" strokeWidth={2.5} />
        </motion.div>

        {/* Accent lines top/bottom */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-cyan-400 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gradient-to-t from-cyan-400 to-transparent" />
      </div>

      {/* ── LABELS ───────────────────────────────────────────────────── */}
      <span className="absolute top-4 left-4 text-[11px] font-bold px-2.5 py-1.5 rounded-full bg-black/70 text-white backdrop-blur-sm tracking-wide uppercase">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1.5 rounded-full bg-cyan-400 text-black backdrop-blur-sm tracking-wide uppercase">
        {afterLabel}
      </span>
    </div>
  );
}
