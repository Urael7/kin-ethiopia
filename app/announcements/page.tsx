'use client';

import React from 'react';
import { mockAnnouncements } from '@/lib/db/seed-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Sparkles, Calendar } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export default function AnnouncementsPage() {
  const { language } = useLanguage();

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          geez="፩"
          tag={language === 'am' ? 'ማስታወቂያዎችና ጥሪዎች' : 'Notices & Bulletins'}
          title={language === 'am' ? 'የማህበረሰብ ማስታወቂያዎችና ጥሪዎች' : 'Community Notices & Open Calls'}
          subtitle={
            language === 'am'
              ? 'ስለ አርቲስት መልመጃዎች፣ ትምህርቶችና የባህል ድጋፎች መረጃዎችን ያግኙ።'
              : 'Stay informed about fellow auditions, international training fellowships, and community masterclasses.'
          }
        />

        <div className="space-y-6 mt-8">
          {mockAnnouncements.map((item) => (
            <div
              key={item.id}
              className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-kin-coffee-card border-2 transition-all duration-300 hover:shadow-lg ${
                item.featured
                  ? 'border-kin-gold shadow-md ring-2 ring-kin-gold/40'
                  : 'border-stone-300 dark:border-kin-coffee-border'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-kin-coffee dark:bg-kin-coffee-elevated text-kin-gold text-[11px] font-extrabold uppercase tracking-wider border border-kin-gold/30">
                    {language === 'am' && item.amharicCategory ? item.amharicCategory : item.category}
                  </span>
                  {item.featured && (
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-kin-gold bg-kin-gold/15 px-3 py-1 rounded-full border border-kin-gold/40">
                      <Sparkles className="w-3.5 h-3.5" />
                      {language === 'am' ? 'ዋና ጥሪ' : 'Featured Call'}
                    </span>
                  )}
                </div>
                <span className="text-xs text-stone-700 dark:text-stone-300 font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-kin-gold" />
                  {item.date}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white mb-3">
                {language === 'am' && item.amharicTitle ? item.amharicTitle : item.title}
              </h2>

              <p className="text-sm sm:text-base text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
                {language === 'am' && item.amharicFullContent ? item.amharicFullContent : item.fullContent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}