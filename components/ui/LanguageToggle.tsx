'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const isAmharic = language === 'am';

  return (
    <button
      onClick={toggleLanguage}
      className="relative inline-flex items-center w-[72px] h-[34px] rounded-full bg-stone-200 dark:bg-kin-coffee-card border-2 border-stone-300 dark:border-kin-coffee-border p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-kin-gold shadow-inner select-none cursor-pointer"
      aria-label="Toggle Language English or Amharic"
      title={isAmharic ? 'Switch to English' : 'Switch to Amharic'}
    >
      {/* Background Labels */}
      <span className="w-full flex justify-between items-center px-1.5 text-[11px] font-black tracking-tighter text-stone-700 dark:text-stone-300">
        <span className={!isAmharic ? 'opacity-0' : 'opacity-80'}>EN</span>
        <span className={isAmharic ? 'opacity-0' : 'opacity-80'}>AM</span>
      </span>

      {/* Sliding Knob */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        animate={{ x: isAmharic ? 36 : 0 }}
        className="absolute top-[3px] left-[3px] w-[24px] h-[24px] rounded-full bg-kin-green dark:bg-kin-gold text-white dark:text-kin-coffee flex items-center justify-center text-[10px] font-black shadow-md border border-white/20"
      >
        {isAmharic ? 'AM' : 'EN'}
      </motion.span>
    </button>
  );
};
