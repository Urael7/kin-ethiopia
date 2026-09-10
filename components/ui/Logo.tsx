'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'mark';
  inverted?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'full', inverted = false, className, size = 'md' }: LogoProps) {
  // Use consistent rich emerald green across both header and footer logos
  const kinGreen = '#008751';
  const subtextColor = inverted ? '#D4B56E' : '#8A8176';

  const logoDimension = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';

  return (
    <Link href="/" className={cn('group inline-flex items-center gap-3', className)} aria-label="KIN ETHIOPIA home">
      {/* Official KIN ETHIOPIA Company Logo Image */}
      <div className={cn('relative shrink-0 rounded-full overflow-hidden border border-kin-gold/40 shadow-sm transition-transform duration-300 group-hover:scale-105 bg-white p-0.5', logoDimension)}>
        <Image
          src="/images/branding/kin-logo.jpg"
          alt="KIN ETHIOPIA Official Logo"
          width={56}
          height={56}
          className="w-full h-full object-cover rounded-full"
          priority
        />
      </div>

      {variant === 'full' && (
        <span className="flex flex-col leading-none">
          <span className="flex items-baseline gap-2">
            <span
              className="font-serif text-[1.7rem] font-extrabold tracking-tight transition-colors"
              style={{ color: kinGreen }}
            >
              KIN
            </span>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-kin-gold">
              Ethiopia
            </span>
          </span>
          <span className="mt-1 font-geez text-[0.72rem] font-semibold" style={{ color: subtextColor }}>
            ኪን-ኢትዮጵያ
          </span>
        </span>
      )}
    </Link>
  );
}
