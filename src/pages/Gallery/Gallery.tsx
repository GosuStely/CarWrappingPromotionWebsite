import { Suspense, lazy } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SectionHeader } from '@/components/shared/SectionHeader';

const GalleryGrid = lazy(() => import('@/widgets/GalleryGrid/GalleryGrid'));
const BeforeAfterSlider = lazy(() => import('@/widgets/BeforeAfter/BeforeAfterSlider'));

/**
 * Two real photos per pair: the same car (or same exact model/angle),
 * one in factory paint and one with a wrap applied.
 * Replace beforeSrc / afterSrc with your own client photos for production.
 */
const BEFORE_AFTER_PAIRS = [
  {
    id: 1,
    // Porsche 911 — 3/4 front-right view, factory silver
    beforeSrc: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=900&q=80',
    // Porsche 911 — 3/4 front-right view, matte black wrap (mirrored to match)
    afterSrc: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=900&q=80',
    vehicle: 'Porsche 911 — Factory Silver → Matte Black Wrap',
    beforeLabel: 'Factory Silver',
    afterLabel: 'Matte Black Wrap',
    flipAfter: true,          // mirror so both face right
    beforePosition: '50% 60%',
    afterPosition: '50% 60%',
  },
  {
    id: 2,
    // Ferrari — side/3-quarter right view, factory red
    beforeSrc: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=900&q=80',
    // Ferrari — side/3-quarter right view, vivid blue wrap
    afterSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=80',
    vehicle: 'Ferrari — Factory Red → Chrome Blue Wrap',
    beforeLabel: 'Factory Red',
    afterLabel: 'Chrome Blue Wrap',
    flipBefore: true,         // mirror before so both face the same direction
    beforePosition: '50% 55%',
    afterPosition: '50% 55%',
  },
  {
    id: 3,
    // BMW M — front 3/4 right, factory white
    beforeSrc: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80',
    // BMW M — front 3/4 right, satin dark wrap
    afterSrc: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=900&q=80',
    vehicle: 'BMW M — Factory White → Satin Dark Wrap',
    beforeLabel: 'Factory White',
    afterLabel: 'Satin Dark Wrap',
    beforePosition: '50% 50%',
    afterPosition: '50% 50%',
  },
  {
    id: 4,
    // Lamborghini — low front-right angle, factory yellow
    beforeSrc: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
    // Lamborghini — low front-right angle, color-shift wrap
    afterSrc: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=900&q=80',
    vehicle: 'Lamborghini — Factory Yellow → Color Shift Wrap',
    beforeLabel: 'Factory Yellow',
    afterLabel: 'Color Shift Wrap',
    flipBefore: true,         // mirror before to face right like after
    beforePosition: '50% 60%',
    afterPosition: '50% 60%',
  },
];

export default function Gallery() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-50" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(191,0,255,0.08) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
              <span className="w-6 h-px bg-cyan-400" />
              Portfolio
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              OUR <span className="gradient-text">GALLERY</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Browse our portfolio of completed wraps — from subtle color changes to jaw-dropping custom designs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-[#0d0d1a] animate-pulse" />
              ))}
            </div>
          }>
            <GalleryGrid />
          </Suspense>
        </div>
      </section>

      {/* Before / After section */}
      <section className="py-24 bg-[#0a0a18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Transformations"
            title="Before & After"
            subtitle="Two photos — the same car, before and after the wrap. Drag the handle to reveal."
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Suspense fallback={null}>
              {BEFORE_AFTER_PAIRS.map((pair) => (
                <div key={pair.id}>
                  <BeforeAfterSlider
                    beforeSrc={pair.beforeSrc}
                    afterSrc={pair.afterSrc}
                    beforeLabel={pair.beforeLabel}
                    afterLabel={pair.afterLabel}
                    flipBefore={pair.flipBefore}
                    flipAfter={pair.flipAfter}
                    beforePosition={pair.beforePosition}
                    afterPosition={pair.afterPosition}
                  />
                  <p className="text-center text-sm text-slate-400 mt-3">{pair.vehicle}</p>
                </div>
              ))}
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
