'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useLanguage } from '@/components/providers/LanguageContext';

export const CultureInMotion: React.FC = () => {
  const { language } = useLanguage();

  const FLOW_NODES = [
    {
      step: '01',
      title: language === 'am' ? 'ባህላዊ ድምፅ' : 'Acoustic Sound',
      detail: language === 'am' ? 'የከበሮና የክራር ምቶች ዜማን ያነቃሉ' : 'Kebero & Krar scales awaken rhythm',
      amharic: 'ምት',
    },
    {
      step: '02',
      title: language === 'am' ? 'የአካል ትዝታ' : 'Body Memory',
      detail: language === 'am' ? 'የእስክስታ እንቅስቃሴ ታሪክን ይገልጻል' : 'Eskista shoulder isolations express history',
      amharic: 'ውዝዋዜ',
    },
    {
      step: '03',
      title: language === 'am' ? 'የአየር በረራ' : 'Aerial Flight',
      detail: language === 'am' ? 'የሰርከስ በረራዎች የአካል ወሰንን ያልፋሉ' : 'Circus suspensions defy physical limitation',
      amharic: 'በረራ',
    },
    {
      step: '04',
      title: language === 'am' ? 'የማኅበረሰብ ሥርዓት' : 'Community Ritual',
      detail: language === 'am' ? 'የቡና ሥርዓት አንድነትን ያጠናክራል' : 'Buna gatherings unify the collective',
      amharic: 'አንድነት',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          geez="፫"
          tag={language === 'am' ? 'የእንቅስቃሴ ፍልስፍና' : 'Kinetic Philosophy'}
          title={language === 'am' ? 'ባህል በእንቅስቃሴ፡ ሕያው ዑደት' : 'Culture in Motion: The Living Circuit'}
          subtitle={
            language === 'am'
              ? 'ቅርሳችን የቆመ ሙዚየም አይደለም፤ በኪን ኢትዮጵያ ባህላዊ ትይንት በድምፅ፣ በውዝዋዜና በሥርዓት ይፈሳል።'
              : 'Heritage is not a static museum piece. At Kin Ethiopia, performance flows continuously through sound, posture, flight, and ritual.'
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 relative">
          {FLOW_NODES.map((node, i) => (
            <motion.div
              key={node.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.03 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative p-6 rounded-2xl bg-white dark:bg-kin-coffee-card border-2 border-stone-300 dark:border-kin-coffee-border hover:border-kin-gold shadow-md hover:shadow-2xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-kin-green dark:text-kin-gold font-extrabold">{node.step}</span>
                <span className="font-geez text-sm text-kin-gold font-bold">{node.amharic}</span>
              </div>
              <h3 className="font-serif text-xl font-extrabold text-stone-950 dark:text-white mb-2 group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors">{node.title}</h3>
              <p className="text-xs text-stone-900 dark:text-stone-300 leading-relaxed font-sans font-medium">{node.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};