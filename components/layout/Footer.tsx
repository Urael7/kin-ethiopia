'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Users, Video, Send } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { TiletDivider } from '@/components/ui/CulturalMotifs';
import { useLanguage } from '@/components/providers/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-kin-coffee dark:bg-kin-coffee-dark text-kin-parchment relative overflow-hidden pt-20 pb-12 border-t border-kin-gold/20 transition-colors duration-300">
      {/* Background subtle woven watermark */}
      <div className="absolute inset-0 bg-woven-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo in footer now matches header color tone perfectly */}
            <Logo inverted />
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              {language === 'am'
                ? 'በኢትዮጵያ ድምፅ፣ የአክሮባቲክስ ሰርከስ እና የማህበረሰብ ሥርዓት ጥንታዊ መንፈስ የተተከለ። ታሪካዊ ቅርሳችንን ወደ ዓለም አቀፍ ደረጃ በማሸጋገር ላይ ይገኛል።'
                : 'Rooted in the ancient soul of Ethiopian sound, acrobatic circus, and community ritual. Translating timeless heritage into forward-leaning global expressions.'}
            </p>
            <div className="pt-2">
              <span className="font-geez text-xs text-kin-gold tracking-widest block">
                ኪነ-ጥበብ ለሕይወትና ለማኅበረሰብ
              </span>
              <span className="text-[11px] text-stone-400">
                {language === 'am'
                  ? 'ጥበብ ለሕይወት፣ ለሰው ልጅና ለማኅበረሰብ እድገት።'
                  : 'Arts for life, humanity, and communal continuity.'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-kin-gold tracking-wider uppercase mb-4">
              {t('footer.explore')}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link href="/about" className="hover:text-kin-gold transition-colors">{t('footer.philosophy')}</Link></li>
              <li><Link href="/events" className="hover:text-kin-gold transition-colors">{t('footer.experiences')}</Link></li>
              <li><Link href="/blog" className="hover:text-kin-gold transition-colors">{t('footer.journal')}</Link></li>
              <li><Link href="/announcements" className="hover:text-kin-gold transition-colors">{t('footer.auditions')}</Link></li>
              <li><Link href="/contact" className="hover:text-kin-gold transition-colors">{t('footer.partner')}</Link></li>
            </ul>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="font-serif text-base font-semibold text-kin-gold tracking-wider uppercase mb-4">
              {t('footer.connect')}
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-kin-coffee-subtle border border-kin-gold/30 flex items-center justify-center text-stone-300 hover:text-kin-coffee hover:bg-kin-gold hover:border-kin-gold transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Camera className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-kin-coffee-subtle border border-kin-gold/30 flex items-center justify-center text-stone-300 hover:text-kin-coffee hover:bg-kin-gold hover:border-kin-gold transition-all duration-300 shadow-sm"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-kin-coffee-subtle border border-kin-gold/30 flex items-center justify-center text-stone-300 hover:text-kin-coffee hover:bg-kin-gold hover:border-kin-gold transition-all duration-300 shadow-sm"
                aria-label="YouTube"
              >
                <Video className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-kin-coffee-subtle border border-kin-gold/30 flex items-center justify-center text-stone-300 hover:text-kin-coffee hover:bg-kin-gold hover:border-kin-gold transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* QR Code / Support Section */}
          <div className="flex flex-col items-start lg:items-end">
            <h4 className="font-serif text-base font-semibold text-kin-gold tracking-wider uppercase mb-4">
              {t('footer.verify')}
            </h4>
            <div className="p-3 bg-white rounded-xl shadow-lg border border-kin-gold/30">
              <svg className="w-24 h-24 text-kin-coffee" viewBox="0 0 100 100" fill="currentColor">
                <rect width="100" height="100" fill="#FAF8F5" />
                <path d="M10 10 H40 V40 H10 Z M18 18 V32 H32 V18 Z" fill="#1B1412" />
                <path d="M60 10 H90 V40 H60 Z M68 18 V32 H82 V18 Z" fill="#1B1412" />
                <path d="M10 60 H40 V90 H10 Z M18 68 V82 H32 V68 Z" fill="#1B1412" />
                <rect x="50" y="50" width="10" height="10" fill="#1B1412" />
                <rect x="70" y="60" width="10" height="20" fill="#1B1412" />
                <rect x="80" y="80" width="10" height="10" fill="#1B1412" />
                <circle cx="25" cy="25" r="4" fill="#D4A343" />
              </svg>
            </div>
            <span className="text-[11px] text-stone-400 mt-2 text-center">
              {language === 'am' ? 'የማህበረሰብ ፖርታል ለማየት ስካን ያድርጉ' : 'Scan for Community Portal'}
            </span>
          </div>

        </div>

        <TiletDivider />

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-kin-gold transition-colors">{language === 'am' ? 'የግላዊነት ፖሊሲ' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-kin-gold transition-colors">{language === 'am' ? 'የመዝገብ አጠቃቀም' : 'Archival Usage'}</a>
            <a href="#" className="hover:text-kin-gold transition-colors">{language === 'am' ? 'የፕሬስ ጥያቄዎች' : 'Press Inquiries'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};