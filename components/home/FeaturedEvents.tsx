'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { EventItem } from '@/types';
import { useLanguage } from '@/components/providers/LanguageContext';

interface FeaturedEventsProps {
  events: EventItem[];
}

export const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ events }) => {
  const displayEvents = events.slice(0, 3);
  const { t, language } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-b from-kin-parchment-light via-kin-parchment to-kin-parchment-light dark:from-kin-coffee-card dark:via-kin-coffee dark:to-kin-coffee-card transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeader
            geez="፬"
            tag={language === 'am' ? 'ሕያው ትይንቶች' : 'Living Performances'}
            title={language === 'am' ? 'ሁነቶቻችን እና ስብሰባዎቻችን' : 'Our Experiences & Gatherings'}
            subtitle={
              language === 'am'
                ? 'በትይንቶቻችን፣ በቡና ሥርዓት ስብሰባዎቻችን እና በማህበረሰብ መልመጃዎቻችን ላይ ተሳተፉ።'
                : 'Step into our performances, sanctuary coffee gatherings, and open community rehearsals.'
            }
          />
          <div className="mt-2 md:mt-0">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-kin-coffee dark:bg-kin-gold hover:bg-kin-coffee-subtle dark:hover:bg-kin-gold-dark text-kin-gold dark:text-kin-coffee text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
            >
              {t('hero.cta.events')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {displayEvents.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-kin-coffee-card rounded-3xl border border-stone-300 dark:border-kin-coffee-border">
            <p className="text-stone-700 dark:text-stone-300 font-sans font-medium">
              {language === 'am' ? 'በአሁኑ ጊዜ የታቀዱ ሁነቶች የሉም።' : 'No upcoming events scheduled right now — check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white dark:bg-kin-coffee-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-stone-200 dark:border-kin-coffee-border transition-all flex flex-col group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] bg-kin-coffee overflow-hidden">
                  <Image
                    src={event.imageUrl || '/images/hero/kin-ethiopia-golden-banner.jpg'}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-kin-green/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                      {language === 'am' && event.amharicCategory ? event.amharicCategory : event.category}
                    </span>
                  </div>
                  {event.amharicTitle && language !== 'am' && (
                    <div className="absolute bottom-3 right-4 z-10">
                      <span className="font-geez text-xs text-kin-gold font-bold bg-kin-coffee/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-kin-gold/30">
                        {event.amharicTitle}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-semibold text-stone-700 dark:text-stone-300 mb-3">
                      <span className="flex items-center gap-1.5 font-extrabold text-kin-green dark:text-kin-gold">
                        <Calendar className="w-3.5 h-3.5 text-kin-gold" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-stone-800 dark:text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        {language === 'am' && event.amharicLocation ? event.amharicLocation : event.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-stone-950 dark:text-white group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors mb-2">
                      <Link href={`/events/${event.slug}`}>
                        {language === 'am' && event.amharicTitle ? event.amharicTitle : event.title}
                      </Link>
                    </h3>

                    <p className="text-stone-900 dark:text-stone-300 text-sm font-medium line-clamp-3 leading-relaxed mb-6 font-sans">
                      {language === 'am' && event.amharicDescription ? event.amharicDescription : event.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200 dark:border-kin-coffee-border flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-400 truncate max-w-[65%]">
                      {language === 'am' && event.amharicPerformers && event.amharicPerformers.length > 0
                        ? event.amharicPerformers[0]
                        : event.performers && event.performers.length > 0
                        ? event.performers[0]
                        : language === 'am'
                        ? 'የኪን ቡድን'
                        : 'Kin Ensemble'}
                    </span>
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-kin-green dark:text-kin-gold hover:underline uppercase tracking-wider transition-colors shrink-0"
                    >
                      {language === 'am' ? 'ዝርዝር' : 'Details'} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Smooth Section Bottom Gradient Transition */}
      <div className="h-16 w-full bg-gradient-to-b from-transparent to-kin-parchment dark:to-kin-coffee-dark pointer-events-none mt-16" />
    </section>
  );
};
