'use client';

import React from 'react';
import { motion } from 'framer-motion';

const GEEZ_MOTIFS = [
  { num: '፩', top: '12%', left: '4%', delay: 0, duration: 8, rotate: 6 },
  { num: '፪', top: '28%', right: '5%', delay: 1, duration: 9, rotate: -8 },
  { num: '፫', top: '45%', left: '3%', delay: 2, duration: 10, rotate: 5 },
  { num: '፬', top: '62%', right: '4%', delay: 0.5, duration: 8.5, rotate: -6 },
  { num: '፭', top: '78%', left: '5%', delay: 1.5, duration: 9.5, rotate: 7 },
  { num: '፮', top: '92%', right: '6%', delay: 2.5, duration: 11, rotate: -5 },
];

export const GeezThemeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {GEEZ_MOTIFS.map((item, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          animate={{
            y: [0, -14, 0],
            rotate: [item.rotate, -item.rotate, item.rotate],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
          className="font-geez text-6xl sm:text-7xl lg:text-8xl font-black text-kin-gold/20 dark:text-kin-gold/15"
        >
          {item.num}
        </motion.div>
      ))}
    </div>
  );
};
