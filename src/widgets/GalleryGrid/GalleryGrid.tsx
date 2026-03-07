import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { clsx } from 'clsx';
import { GALLERY_ITEMS } from '@/helpers/constants';
import { Modal } from '@/components/ui/Modal';
import { RevealImage } from '@/components/animations/RevealImage';
import { staggerContainer, staggerItem, VIEWPORT_CONFIG } from '@/helpers/animations';
import type { GalleryCategory, GalleryItem } from '@/types/gallery';

const CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Wrap', value: 'full-wrap' },
  { label: 'Color Change', value: 'color-change' },
  { label: 'PPF', value: 'ppf' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Partial', value: 'partial' },
];

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <motion.div
      variants={staggerItem}
      layout
      className="relative group rounded-xl overflow-hidden cursor-pointer bg-[#0d0d1a] aspect-[4/3]"
      onClick={onClick}
    >
      <RevealImage
        src={item.imageUrl}
        alt={item.title}
        direction="scale"
        containerClassName="w-full h-full"
        className="transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-sm">{item.title}</h3>
        <p className="text-cyan-400 text-xs mt-0.5">{item.vehicle}</p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
        <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-full bg-black/50 text-slate-300 backdrop-blur-sm border border-white/10">
          {item.category.replace('-', ' ')}
        </span>
      </div>
    </motion.div>
  );
}

export default function GalleryGrid({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered = (
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory)
  ).slice(0, limit);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === cat.value
                ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,245,255,0.4)]'
                : 'border border-white/10 text-slate-400 hover:text-white hover:border-white/30'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={() => setSelected(item)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal viewer */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="relative">
            <img
              src={selected.imageUrl}
              alt={selected.title}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="p-6 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-1">{selected.title}</h3>
              <p className="text-cyan-400 text-sm">{selected.vehicle}</p>
              {selected.color && <p className="text-slate-400 text-sm mt-1">Color: {selected.color}</p>}
              <div className="flex flex-wrap gap-2 mt-3">
                {selected.tags?.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
