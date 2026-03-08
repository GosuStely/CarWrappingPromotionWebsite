import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SectionHeader } from '@/components/shared/SectionHeader';

const GalleryGrid = lazy(() => import('@/widgets/GalleryGrid/GalleryGrid'));
const BeforeAfterSlider = lazy(() => import('@/widgets/BeforeAfter/BeforeAfterSlider'));

type PairData = {
  id: number;
  beforeSrc: string;
  afterSrc: string;
  flipBefore?: boolean;
  flipAfter?: boolean;
  beforePosition: string;
  afterPosition: string;
};

const BEFORE_AFTER_PAIRS_DATA: PairData[] = [
  {
    id: 1,
    beforeSrc: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=900&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=900&q=80',
    flipAfter: true,
    beforePosition: '50% 60%',
    afterPosition: '50% 60%',
  },
  {
    id: 2,
    beforeSrc: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=900&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=900&q=80',
    flipBefore: true,
    beforePosition: '50% 55%',
    afterPosition: '50% 55%',
  },
  {
    id: 3,
    beforeSrc: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=900&q=80',
    beforePosition: '50% 50%',
    afterPosition: '50% 50%',
  },
  {
    id: 4,
    beforeSrc: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=900&q=80',
    flipBefore: true,
    beforePosition: '50% 60%',
    afterPosition: '50% 60%',
  },
];

type PairI18n = { beforeLabel: string; afterLabel: string; vehicle: string };

export default function Gallery() {
  const { t } = useTranslation();
  const pairsI18n = t('galleryPage.beforeAfter.pairs', { returnObjects: true }) as PairI18n[];

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
              {t('galleryPage.eyebrow')}
              <span className="w-6 h-px bg-cyan-400" />
            </span>
            <h1 className="text-6xl sm:text-7xl font-black text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              {t('galleryPage.title')}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {t('galleryPage.subtitle')}
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
            eyebrow={t('galleryPage.beforeAfter.eyebrow')}
            title={t('galleryPage.beforeAfter.title')}
            subtitle={t('galleryPage.beforeAfter.subtitle')}
            className="mb-12"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Suspense fallback={null}>
              {BEFORE_AFTER_PAIRS_DATA.map((pair, idx) => {
                const i18n = pairsI18n[idx] ?? { beforeLabel: '', afterLabel: '', vehicle: '' };
                return (
                  <div key={pair.id}>
                    <BeforeAfterSlider
                      beforeSrc={pair.beforeSrc}
                      afterSrc={pair.afterSrc}
                      beforeLabel={i18n.beforeLabel}
                      afterLabel={i18n.afterLabel}
                      flipBefore={pair.flipBefore}
                      flipAfter={pair.flipAfter}
                      beforePosition={pair.beforePosition}
                      afterPosition={pair.afterPosition}
                    />
                    <p className="text-center text-sm text-slate-400 mt-3">{i18n.vehicle}</p>
                  </div>
                );
              })}
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
