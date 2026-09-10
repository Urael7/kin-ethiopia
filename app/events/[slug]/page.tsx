'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockEvents } from '@/lib/db/seed-data';
import { Calendar, MapPin, Clock, ArrowLeft, Ticket, UserCheck } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const { language } = useLanguage();
  const event = mockEvents.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-kin-green dark:text-kin-gold hover:underline mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{language === 'am' ? 'ወደ ሁሉም ሁነቶች ተመለስ' : 'Back to All Experiences'}</span>
        </Link>

        <div className="bg-white dark:bg-kin-coffee-card rounded-3xl overflow-hidden border-2 border-stone-300 dark:border-kin-coffee-border shadow-xl">
          
          {/* Main Hero Banner with Event Cover Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-kin-coffee overflow-hidden">
            <Image
              src={event.imageUrl || '/images/hero/kin-ethiopia-golden-banner.jpg'}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kin-coffee via-kin-coffee/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-kin-green text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                    {language === 'am' && event.amharicCategory ? event.amharicCategory : event.category}
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                  {language === 'am' && event.amharicTitle ? event.amharicTitle : event.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Details & Information Body */}
          <div className="p-6 sm:p-10 lg:p-12">
            
            {/* Metadata Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-stone-100 dark:bg-kin-coffee-elevated border border-stone-300 dark:border-kin-coffee-border mb-8 text-xs text-stone-800 dark:text-stone-200">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-kin-gold shrink-0" />
                <div>
                  <span className="block font-extrabold text-stone-950 dark:text-white">{language === 'am' ? 'ቀን' : 'Date'}</span>
                  <span>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-kin-gold shrink-0" />
                <div>
                  <span className="block font-extrabold text-stone-950 dark:text-white">{language === 'am' ? 'ሰዓት' : 'Time'}</span>
                  <span>{event.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-kin-gold shrink-0" />
                <div>
                  <span className="block font-extrabold text-stone-950 dark:text-white">{language === 'am' ? 'ቦታ' : 'Venue'}</span>
                  <span>
                    {language === 'am' && event.amharicVenue ? event.amharicVenue : event.venue},{' '}
                    {language === 'am' && event.amharicLocation ? event.amharicLocation : event.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-stone-900 dark:text-stone-200 text-base leading-relaxed font-sans mb-10">
              <h2 className="font-serif text-2xl font-bold text-stone-950 dark:text-white">
                {language === 'am' ? 'ስለ ዝግጅቱ' : 'About This Gathering'}
              </h2>
              <p className="whitespace-pre-line">
                {language === 'am' && event.amharicDescription ? event.amharicDescription : event.description}
              </p>
            </div>

            {/* Performers & Ticket Reservation CTA */}
            <div className="pt-8 border-t border-stone-300 dark:border-kin-coffee-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-extrabold text-stone-700 dark:text-stone-300 block mb-1 tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-kin-green dark:text-kin-gold" />{' '}
                  {language === 'am' ? 'ተሳታፊ አርቲስቶች' : 'Featured Performers'}
                </span>
                <span className="text-sm font-bold text-stone-950 dark:text-white">
                  {language === 'am' && event.amharicPerformers && event.amharicPerformers.length > 0
                    ? event.amharicPerformers.join(' • ')
                    : event.performers && event.performers.length > 0
                    ? event.performers.join(' • ')
                    : language === 'am'
                    ? 'የኪን ቡድን'
                    : 'Kin Performance Ensemble'}
                </span>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-kin-green dark:bg-kin-gold text-white dark:text-kin-coffee text-xs font-extrabold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all active:scale-95 shrink-0"
              >
                <Ticket className="w-4 h-4 text-white dark:text-kin-coffee" />{' '}
                {language === 'am' ? 'ቦታ ይያዙ / ይተበተቡ' : 'Reserve / Attend Experience'}
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}