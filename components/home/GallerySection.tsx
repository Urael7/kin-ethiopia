'use client';

import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import type { GalleryItem } from '@/types';
import { useLanguage } from '@/components/providers/LanguageContext';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          geez="፭"
          tag={language === 'am' ? 'ምስላዊ መዝገብ' : 'Visual Archive'}
          title={language === 'am' ? 'የመድረክና የዝግጅት ትይንቶች' : 'Moments from the Sanctuary & Stage'}
          subtitle={
            language === 'am'
              ? 'የሰርከስ አክሮባቲክስ፣ የከበሮ ምትና የቡና ስርዓት ትይንቶችን በፎቶ ይመልከቱ።'
              : 'Explore glimpses of acrobatic flight, kebero percussion circles, and buna gatherings across Ethiopia.'
          }
          centered
        />

        <div className="mt-12">
          <GalleryGrid items={items} showFilter={true} limit={8} />
        </div>
      </div>

      {/* Smooth Section Bottom Gradient Fade Transition */}
      <div className="h-16 w-full bg-gradient-to-b from-transparent to-kin-parchment-dark/40 dark:to-kin-coffee-dark pointer-events-none mt-16" />
    </section>
  );
};
