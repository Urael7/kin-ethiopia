'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { MobileNav } from './MobileNav';
import { useTheme } from '@/components/providers/ThemeContext';
import { useLanguage } from '@/components/providers/LanguageContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

export const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const NAV_LINKS = [
    { name: t('nav.home'), href: '/', slotWidth: 'w-[80px]' },
    { name: t('nav.about'), href: '/about', slotWidth: 'w-[95px]' },
    { name: t('nav.disciplines'), href: '/#disciplines', slotWidth: 'w-[105px]' },
    { name: t('nav.events'), href: '/events', slotWidth: 'w-[85px]' },
    { name: t('nav.blog'), href: '/blog', slotWidth: 'w-[75px]' },
    { name: t('nav.announcements'), href: '/announcements', slotWidth: 'w-[140px]' },
    { name: t('nav.contact'), href: '/contact', slotWidth: 'w-[85px]' },
  ];

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: '-100%', opacity: 0 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-kin-parchment/95 dark:bg-kin-coffee-dark/95 backdrop-blur-md border-b border-stone-300/80 dark:border-kin-coffee-border shadow-sm transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LEFT: Locked width logo container */}
          <div className="w-48 lg:w-56 shrink-0 flex items-center justify-start">
            <Logo />
          </div>

          {/* CENTER: Fixed desktop navigation flex container */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className={`${link.slotWidth} flex items-center justify-center shrink-0`}>
                  <Link
                    href={link.href}
                    className={`text-[15px] tracking-wide transition-colors relative py-1 font-bold text-center w-full truncate ${
                      isActive
                        ? 'text-kin-green dark:text-kin-gold font-extrabold'
                        : 'text-stone-900 dark:text-stone-100 hover:text-kin-green dark:hover:text-kin-gold'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-kin-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* RIGHT: Toggles positioned flush right without Get Involved button */}
          <div className="w-auto lg:w-48 shrink-0 flex items-center justify-end gap-3 sm:gap-4">
            {/* Language ON/OFF Toggle Switch */}
            <LanguageToggle />

            {/* Dark Mode Toggle Icon */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-kin-coffee-elevated border-2 border-stone-300 dark:border-kin-coffee-border text-stone-900 dark:text-kin-gold transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm shrink-0"
              title={theme === 'light' ? t('ui.themeToggle.light') : t('ui.themeToggle.dark')}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-stone-900" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-kin-gold" />
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-900 dark:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-kin-coffee-elevated focus:outline-none focus:ring-2 focus:ring-kin-gold"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Animated Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
};