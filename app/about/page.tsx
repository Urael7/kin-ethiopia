'use client';

import React from 'react';
import { mockTeamMembers } from '@/lib/db/seed-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TeamDirectory } from '@/components/team/TeamDirectory';
import { TiletDivider } from '@/components/ui/CulturalMotifs';
import { useLanguage } from '@/components/providers/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Story Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest font-extrabold text-kin-gold block mb-2">
            {t('about.journeyTag')}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 dark:text-white leading-tight">
            {t('about.mainHeading')}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-stone-900 dark:text-stone-200 font-medium leading-relaxed font-sans">
            {t('about.storyBody')}
          </p>
        </div>

        <TiletDivider className="my-12" />

        {/* Mission / Vision / Philosophy Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-2xl bg-white dark:bg-kin-coffee-card border-2 border-stone-300 dark:border-kin-coffee-border shadow-md">
            <span className="font-geez text-kin-gold font-black text-xl">፩</span>
            <h3 className="font-serif text-2xl font-bold text-stone-950 dark:text-white mt-3 mb-2">
              {t('about.mission.title')}
            </h3>
            <p className="text-sm sm:text-base text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
              {t('about.mission.desc')}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-kin-coffee-card border-2 border-stone-300 dark:border-kin-coffee-border shadow-md">
            <span className="font-geez text-kin-gold font-black text-xl">፪</span>
            <h3 className="font-serif text-2xl font-bold text-stone-950 dark:text-white mt-3 mb-2">
              {t('about.vision.title')}
            </h3>
            <p className="text-sm sm:text-base text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
              {t('about.vision.desc')}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-kin-coffee-card border-2 border-stone-300 dark:border-kin-coffee-border shadow-md">
            <span className="font-geez text-kin-gold font-black text-xl">፫</span>
            <h3 className="font-serif text-2xl font-bold text-stone-950 dark:text-white mt-3 mb-2">
              {t('about.philosophy.title')}
            </h3>
            <p className="text-sm sm:text-base text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
              {t('about.philosophy.desc')}
            </p>
          </div>
        </div>

        {/* Team Directory Section */}
        <div className="mt-20">
          <SectionHeader
            geez="፬"
            tag={t('about.ensemble.tag')}
            title={t('about.ensemble.title')}
            subtitle={t('about.ensemble.subtitle')}
          />
          <TeamDirectory members={mockTeamMembers} />
        </div>

      </div>
    </div>
  );
}