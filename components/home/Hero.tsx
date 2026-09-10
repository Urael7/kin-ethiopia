'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { JebenaIcon } from '@/components/ui/CulturalMotifs';
import { useLanguage } from '@/components/providers/LanguageContext';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-24 pb-20 bg-gradient-to-b from-kin-parchment via-kin-parchment-dark/30 to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark transition-colors duration-500">
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 bg-woven-pattern opacity-40 dark:opacity-20 pointer-events-none" />

      {/* Slow Floating Cultural Micro-Motifs */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-8 lg:left-24 text-kin-gold/40 select-none pointer-events-none"
      >
        <span className="font-geez text-6xl lg:text-7xl font-bold">፩</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-28 right-8 lg:right-28 text-kin-green/30 dark:text-kin-gold/20 select-none pointer-events-none"
      >
        <span className="font-geez text-7xl lg:text-8xl font-bold">፪</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-12 text-kin-gold/30 hidden md:block pointer-events-none"
      >
        <JebenaIcon className="w-12 h-12" />
      </motion.div>

      {/* Central Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-kin-gold/10 border border-kin-green/30 dark:border-kin-gold/30 text-stone-900 dark:text-kin-gold text-xs sm:text-sm font-extrabold tracking-widest uppercase mb-8 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-kin-gold" />
          <span>{t('hero.tag')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-stone-950 dark:text-white leading-[1.08] tracking-tight"
        >
          {t('hero.title')}{' '}
          <span className="block italic text-kin-crimson dark:text-kin-gold font-normal">
            {t('hero.subtitle_highlight')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-900 dark:text-stone-200 font-semibold leading-relaxed font-sans"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-kin-green hover:bg-kin-green-dark dark:bg-kin-gold dark:hover:bg-kin-gold-dark dark:text-kin-coffee text-white font-extrabold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            {t('hero.cta.events')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-stone-100 dark:bg-kin-coffee-card dark:hover:bg-kin-coffee-elevated text-stone-950 dark:text-stone-100 border-2 border-stone-300 dark:border-kin-coffee-border font-extrabold text-sm tracking-wider uppercase transition-all shadow-sm"
          >
            {t('hero.cta.story')}
          </Link>
        </motion.div>

        {/* Dynamic Visual Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-16 relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-kin-coffee-border bg-kin-coffee aspect-[16/9] max-w-4xl flex items-center justify-center group"
        >
          <Image
            src="/images/hero/kin-grand-stage-ensemble.jpg"
            alt="Kin Ethiopia Stage Ensemble Performance"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kin-coffee via-kin-coffee/20 to-transparent z-10" />
          <div className="absolute bottom-6 left-6 right-6 z-20 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-bold text-kin-gold tracking-widest block mb-1">
                {language === 'am' ? 'የኪን ኢትዮጵያ ዋና መድረክ እንስምብል' : 'Kin Ethiopia Main Stage Ensemble'}
              </span>
              <p className="text-white font-serif text-lg sm:text-xl font-bold">
                {language === 'am' ? 'የባህል ቅርስ እና አክሮባቲክስ ትይንት' : 'Cultural Heritage & Acrobatics Showcase'}
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-kin-coffee/80 backdrop-blur-md text-kin-gold text-xs font-semibold border border-kin-gold/40 shrink-0">
              {language === 'am' ? 'አዲስ አበባ ብሔራዊ መድረክ' : 'Addis Ababa National Stage'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smooth Section Gradient Fade Transition */}
      <div className="h-16 w-full bg-gradient-to-b from-transparent to-kin-parchment-dark/40 dark:to-kin-coffee-dark pointer-events-none mt-12" />
    </section>
  );
};