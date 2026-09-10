'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, MapPin } from 'lucide-react';
import type { GalleryItem } from '@/types';
import { useLanguage } from '@/components/providers/LanguageContext';

interface GalleryGridProps {
  items: GalleryItem[];
  showFilter?: boolean;
  limit?: number;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  showFilter = true,
  limit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const { language } = useLanguage();

  const CATEGORIES = [
    { key: 'All', label: language === 'am' ? 'ሁሉም' : 'All Works' },
    { key: 'Circus', label: language === 'am' ? 'ሰርከስ' : 'Circus' },
    { key: 'Music', label: language === 'am' ? 'ሙዚቃ' : 'Music' },
    { key: 'Culture', label: language === 'am' ? 'ባህል' : 'Culture' },
    { key: 'Community', label: language === 'am' ? 'ማኅበረሰብ' : 'Community' },
    { key: 'Events', label: language === 'am' ? 'ሁነቶች' : 'Events' },
  ];

  const filteredItems = items.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div>
      {/* Category Filter Tabs */}
      {showFilter && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
                selectedCategory === cat.key
                  ? 'bg-kin-green dark:bg-kin-gold text-white dark:text-kin-coffee shadow-md scale-105'
                  : 'bg-white dark:bg-kin-coffee-card text-stone-900 dark:text-stone-200 hover:bg-stone-200/80 dark:hover:bg-kin-coffee-elevated border-2 border-stone-300 dark:border-kin-coffee-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid Layout */}
      {displayItems.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-kin-coffee-card rounded-3xl border-2 border-stone-300 dark:border-kin-coffee-border">
          <p className="text-stone-900 dark:text-stone-300 font-bold">
            {language === 'am' ? 'በዚህ ምድብ ምንም ምስል አልተገኘም።' : 'No images found for this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={() => setActiveItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveItem(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View image: ${item.caption || item.alt}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-kin-coffee border-2 border-stone-300/80 dark:border-kin-coffee-border shadow-md hover:shadow-2xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-kin-gold"
            >
              <Image
                src={item.imageUrl}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-kin-coffee/95 via-kin-coffee/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-kin-gold bg-kin-coffee/85 px-2.5 py-0.5 rounded border border-kin-gold/30">
                    {language === 'am' && item.amharicCategory ? item.amharicCategory : item.category}
                  </span>
                  <ZoomIn className="w-4 h-4 text-white opacity-90" />
                </div>
                <p className="text-white font-serif text-base font-bold line-clamp-1">
                  {language === 'am' && item.amharicCaption ? item.amharicCaption : item.caption || item.alt}
                </p>
                {item.location && (
                  <p className="text-xs text-stone-300 font-bold flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-kin-gold" />
                    {language === 'am' && item.amharicLocation ? item.amharicLocation : item.location}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-kin-coffee/90 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-kin-coffee rounded-3xl overflow-hidden border-2 border-kin-gold/40 shadow-2xl"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors focus:outline-none focus:ring-2 focus:ring-kin-gold"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-kin-coffee text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-kin-gold/30">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-kin-gold uppercase tracking-wider">
                      {language === 'am' && activeItem.amharicCategory ? activeItem.amharicCategory : activeItem.category}
                    </span>
                    {activeItem.location && (
                      <span className="text-xs text-stone-300 font-bold">
                        • {language === 'am' && activeItem.amharicLocation ? activeItem.amharicLocation : activeItem.location}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {language === 'am' && activeItem.amharicCaption ? activeItem.amharicCaption : activeItem.caption || activeItem.alt}
                  </h3>
                </div>
                {activeItem.uploadedAt && (
                  <span className="text-xs text-stone-300 font-mono font-bold">
                    {activeItem.uploadedAt}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
