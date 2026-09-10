'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TiletLine } from '@/components/ui/CulturalMotifs';
import { useLanguage } from '@/components/providers/LanguageContext';

export const IntroSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionHeader
              geez="፩"
              tag={language === 'am' ? 'ሕያው ቅርስ' : 'Living Heritage'}
              title={language === 'am' ? 'በትራዲሽን ተተክሎ። ወደ ፊት እየተራመደ።' : 'Rooted in Tradition. Moving Forward.'}
              subtitle={
                language === 'am'
                  ? 'የኢትዮጵያ ባህላዊ ትይንት ከማህበረሰብ ጋር የተያያዘ ነው። ጨለማ ውስጥ ተቀምጦ ሰውን መመልከት ሳይሆን የአዝማሪ ጥሪና መልስ፣ የከበሮ ምትና የቡና ወግ ድምቀት ነው።'
                  : 'Ethiopian performance is inherently communal. It is not an observer sitting in darkness watching an isolated actor; it is the call-and-response of the Azmari, the rising cadence of the Kebero, and the shared warmth of freshly brewed coffee.'
              }
            />

            <div className="space-y-4 text-stone-900 dark:text-stone-200 text-base sm:text-lg font-medium leading-relaxed font-sans">
              <p>
                {language === 'am'
                  ? 'በኪን ኢትዮጵያ ይህንን ክብር በመጠበቅ የአክሮባቲክስ እና የቲያትር ጥበብን ወደ አዲስ ደረጃ እናሸጋግራለን። ቡድናችን ከአዲስ አበባ፣ ጎንደር፣ ሀዋሳ እና ከተለያዩ ቦታዎች የተሰበሰቡ ሙዚቀኞችን፣ የሰርከስ አርቲስቶችንና ኮሪዮግራፈሮችን ያቀፈ ነው።'
                  : 'At Kin Ethiopia, we honor this ethos while pushing physical acrobatics and artistic staging into bold new horizons. Our ensemble brings together master musicians, circus artists, choreographers, and cultural researchers from across Addis Ababa, Gondar, Hawassa, and beyond.'}
              </p>
              <p>
                {language === 'am'
                  ? 'ባህልን በካቢኔ ውስጥ የሚቀመጥ የታሪክ ቅርስ አድርገን አናይም—ይልቁንም የሚተነፍስ፣ የሚዘል፣ የሚበርና ከማህበረሰቡ ጋር የሚኖር ሕያው ቋንቋ አድርገን እንወስደዋለን።'
                  : 'We do not view culture as a museum relic to be preserved behind glass—we view it as a living language that breathes, jumps, flies, and gathers around the flame of community.'}
              </p>
            </div>

            <TiletLine className="my-6" />

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-kin-green hover:bg-kin-green-dark dark:bg-kin-gold dark:text-kin-coffee text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                {t('about.ensemble.title')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about#philosophy"
                className="text-xs font-extrabold uppercase tracking-wider text-stone-900 dark:text-kin-gold hover:text-kin-green transition-colors"
              >
                {t('about.philosophy.title')} →
              </Link>
            </div>
          </motion.div>

          {/* Visual Content Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-kin-coffee border-2 border-kin-gold/40 shadow-2xl group">
              <Image
                src="/images/culture/kin-vocalists-performance.jpg"
                alt="Kin Ethiopia Traditional Vocalists and Performers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kin-coffee via-kin-coffee/20 to-transparent z-10" />

              <div className="absolute top-6 right-6 z-20 font-geez text-5xl text-kin-gold/60 font-bold select-none drop-shadow">
                ኪን
              </div>

              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="p-4 rounded-2xl bg-kin-coffee/90 backdrop-blur-md border border-kin-gold/30">
                  <span className="text-[10px] uppercase font-bold text-kin-gold tracking-widest block mb-1">
                    {language === 'am' ? 'እውነተኛ የባህል ትይንት' : 'Authentic Cultural Performance'}
                  </span>
                  <p className="text-white font-serif text-lg font-bold">
                    {language === 'am' ? 'ድምፃውያን እና የእንስምብል አርቲስቶች' : 'Vocalists & Ensemble Artists'}
                  </p>
                  <p className="text-xs text-stone-300 mt-1">
                    {language === 'am'
                      ? 'የአዝማሪ ግጥሞችንና ጥንታዊ የኢትዮጵያ የሙዚቃ መሣሪያዎችን ያቀናጀ ሕያው ትይንት።'
                      : 'Live performance blending Azmari poetry and classical Ethiopian instruments.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Smooth Section Gradient Fade Transition */}
      <div className="h-16 w-full bg-gradient-to-b from-transparent to-stone-200/50 dark:to-kin-coffee-card pointer-events-none mt-16" />
    </section>
  );
};
