'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

import { useLanguage } from '@/components/providers/LanguageContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, links }) => {
  const { language } = useLanguage();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden bg-kin-coffee/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-kin-parchment dark:bg-kin-coffee shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
                <Logo inverted />
              </div>

              <nav className="mt-8 flex flex-col space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="text-lg font-serif tracking-wide text-stone-800 dark:text-stone-100 hover:text-kin-green transition-colors py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-4">
              <div className="text-xs text-stone-500 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-kin-gold" />
                  <span>{language === 'am' ? 'አዲስ አበባ፣ ኢትዮጵያ' : 'Addis Ababa, Ethiopia'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-kin-gold" />
                  <span>contact@kinethiopia.org</span>
                </div>
              </div>

              <Link
                href="/contact"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-kin-green text-white text-xs font-semibold tracking-wider uppercase shadow-md"
              >
                {language === 'am' ? 'ተሳተፉ ወይም ይደግፉ' : 'Join or Support'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};