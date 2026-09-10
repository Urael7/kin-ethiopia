'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockEvents } from '@/lib/db/seed-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export default function EventsPage() {
  const { t, language } = useLanguage();
  const upcomingEvents = mockEvents.filter((e) => e.status === 'upcoming');
  const pastEvents = mockEvents.filter((e) => e.status === 'past');

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-14 text-center sm:text-left">
          <SectionHeader
            geez="፩"
            tag={language === 'am' ? 'ትይንቶች እና ዝግጅቶች' : 'Gatherings & Spectacles'}
            title={language === 'am' ? 'የሚመጡ የባህል ሁነቶች' : 'Upcoming Cultural Experiences'}
            subtitle={
              language === 'am'
                ? 'በሕያው ሰርከስ ቲያትር፣ በቡና ሥርዓት እና በሙዚቃ ትይንቶቻችን ውስጥ ይሳተፉ።'
                : 'Immerse yourself in live acrobatic theatre, acoustic sanctuary sessions, and national cultural tours.'
            }
          />
        </div>

        {/* Upcoming Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-kin-coffee-card rounded-3xl overflow-hidden border-2 border-stone-300/90 dark:border-kin-coffee-border shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Event Image Showcase Container */}
                <div>
                  <div className="relative aspect-[16/10] bg-kin-coffee overflow-hidden">
                    <Image
                      src={event.imageUrl || '/images/hero/kin-ethiopia-golden-banner.jpg'}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-kin-green/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                        {event.category}
                      </span>
                    </div>
                    {event.amharicTitle && (
                      <div className="absolute bottom-3 right-4 z-10">
                        <span className="font-geez text-xs text-kin-gold font-bold bg-kin-coffee/85 backdrop-blur-sm px-3 py-1 rounded-full border border-kin-gold/30">
                          {event.amharicTitle}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-700 dark:text-stone-300 mb-3 font-semibold">
                      <span className="flex items-center gap-1.5 font-extrabold text-kin-green dark:text-kin-gold">
                        <Calendar className="w-3.5 h-3.5 text-kin-gold" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1 font-bold">
                        <Clock className="w-3.5 h-3.5 text-stone-500" />
                        {event.time}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-extrabold text-stone-950 dark:text-white group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors mb-3 leading-snug">
                      <Link href={`/events/${event.slug}`}>
                        {language === 'am' && event.amharicTitle ? event.amharicTitle : event.title}
                      </Link>
                    </h3>

                    <p className="text-stone-900 dark:text-stone-300 text-sm font-medium line-clamp-3 leading-relaxed mb-4 font-sans">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-stone-800 dark:text-stone-300 font-bold mb-2">
                      <MapPin className="w-4 h-4 text-kin-gold shrink-0" />
                      <span className="truncate">{event.venue}, {event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 sm:px-7 py-4 bg-stone-100/90 dark:bg-kin-coffee-elevated border-t border-stone-300 dark:border-kin-coffee-border flex items-center justify-between gap-2">
                  <span className="text-xs text-stone-800 dark:text-stone-300 font-bold flex items-center gap-1 truncate">
                    <UserCheck className="w-3.5 h-3.5 text-kin-green dark:text-kin-gold shrink-0" />
                    <span className="truncate">
                      {event.performers && event.performers.length > 0 ? event.performers[0] : 'Kin Ensemble'}
                    </span>
                  </span>
                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-kin-green dark:text-kin-gold hover:underline shrink-0 transition-colors"
                  >
                    {language === 'am' ? 'ዝርዝር' : 'Details'} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white dark:bg-kin-coffee-card rounded-3xl border border-stone-300 dark:border-kin-coffee-border p-8">
              <Sparkles className="w-8 h-8 text-kin-gold mx-auto mb-3" />
              <p className="text-stone-900 dark:text-stone-100 font-serif text-lg font-bold">No upcoming events scheduled right now.</p>
            </div>
          )}
        </div>

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div className="pt-16 border-t border-stone-300 dark:border-kin-coffee-border">
            <div className="mb-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-kin-gold block mb-1">
                {language === 'am' ? 'የቀደሙ ሁነቶች መዝገብ' : 'Historical Archive'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white">
                {language === 'am' ? 'ያለፉ ሁነቶች እና ዝግጅቶች' : 'Past Gatherings & Tour Archive'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pastEvents.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-kin-coffee-card rounded-2xl p-6 border-2 border-stone-300 dark:border-kin-coffee-border shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="relative aspect-[16/9] bg-kin-coffee rounded-xl overflow-hidden mb-4">
                    <Image
                      src={item.imageUrl || '/images/hero/kin-grand-stage-ensemble.jpg'}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <span className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-900/80 text-stone-200 backdrop-blur-sm">
                      {language === 'am' ? 'ተጠናቋል' : 'Concluded'}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-extrabold text-stone-950 dark:text-white group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors">
                    {language === 'am' && item.amharicTitle ? item.amharicTitle : item.title}
                  </h4>
                  <p className="text-xs font-bold text-stone-700 dark:text-stone-300 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-kin-gold" />
                    {item.venue}, {item.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}