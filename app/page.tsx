'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { IntroSection } from '@/components/home/IntroSection';
import { Disciplines } from '@/components/home/Disciplines';
import { CultureInMotion } from '@/components/home/CultureInMotion';
import { FeaturedEvents } from '@/components/home/FeaturedEvents';
import { GallerySection } from '@/components/home/GallerySection';
import { TiletDivider } from '@/components/ui/CulturalMotifs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { mockEvents, mockGallery, mockBlogPosts } from '@/lib/db/seed-data';
import { useLanguage } from '@/components/providers/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();
  const featuredPosts = mockBlogPosts.slice(0, 3);

  return (
    <div className="overflow-hidden bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark transition-colors duration-500">
      {/* 1. Hero Section */}
      <Hero />

      <TiletDivider />

      {/* 2. Intro Section */}
      <IntroSection />

      {/* 3. Cultural Disciplines */}
      <Disciplines />

      {/* 4. Culture In Motion Kinetic Flow */}
      <CultureInMotion />

      {/* 5. Featured Experiences & Events */}
      <FeaturedEvents events={mockEvents} />

      {/* 6. Photo Gallery */}
      <GallerySection items={mockGallery} />

      {/* 7. Featured Stories & Articles (Journal & Insights) */}
      <section className="py-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 relative transition-colors duration-500 border-t border-stone-300 dark:border-kin-coffee-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionHeader
              geez="፮"
              tag={language === 'am' ? 'የባህል መጽሔት' : 'Journal & Insights'}
              title={language === 'am' ? 'የኪን ታሪኮችና ጽሑፎች' : 'Featured Stories from the Field'}
              subtitle={
                language === 'am'
                  ? 'ከዳይሬክተሮቻችን፣ ከኮሪዮግራፈሮችና ከሙዚቀኞቻችን የተጻፉ ጥበባዊ አመለካከቶች።'
                  : 'Read reflections from our directors, choreographers, and master instrumentalists.'
              }
            />
            <div className="mt-2 md:mt-0">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-kin-coffee-card text-stone-900 dark:text-kin-gold text-xs font-extrabold uppercase tracking-wider transition-all border-2 border-stone-300 dark:border-kin-coffee-border shadow-md hover:shadow-lg active:scale-95 shrink-0"
              >
                {language === 'am' ? 'ሁሉንም ጽሑፎች ይመልከቱ' : 'View All Articles'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-kin-coffee-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-stone-300 dark:border-kin-coffee-border transition-all flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-[16/10] bg-kin-coffee overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-kin-gold text-kin-coffee text-xs font-extrabold uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-bold text-stone-700 dark:text-stone-300 mb-3">
                      <span className="flex items-center gap-1 font-extrabold text-kin-green dark:text-kin-gold">
                        <Calendar className="w-3.5 h-3.5 text-kin-gold" />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1 font-bold">
                        <Clock className="w-3.5 h-3.5 text-stone-500" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-extrabold text-stone-950 dark:text-white group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors mb-3 leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {language === 'am' && post.amharicTitle ? post.amharicTitle : post.title}
                      </Link>
                    </h3>

                    <p className="text-stone-900 dark:text-stone-300 text-sm font-medium line-clamp-3 leading-relaxed mb-6 font-sans">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200 dark:border-kin-coffee-border flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-300 flex items-center gap-1.5 truncate">
                      <User className="w-3.5 h-3.5 text-kin-green dark:text-kin-gold" />
                      {post.author.name}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-kin-green dark:text-kin-gold hover:underline uppercase tracking-wider"
                    >
                      {language === 'am' ? 'ያንብቡ' : 'Read Story'} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner (Fully Theme-Consistent in Light & Dark Mode) */}
      <section className="py-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-white relative overflow-hidden transition-colors duration-500 border-t border-stone-300 dark:border-kin-coffee-border">
        <div className="absolute inset-0 bg-woven-pattern opacity-15 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="font-geez text-4xl text-kin-gold font-bold block mb-4">ኪን</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-950 dark:text-white tracking-tight mb-6">
            {language === 'am' ? 'የኢትዮጵያ ባህል ህዳሴ አካል ይሁኑ' : 'Be Part of Ethiopia’s Cultural Renaissance'}
          </h2>
          <p className="max-w-2xl mx-auto text-stone-900 dark:text-stone-200 text-base sm:text-lg mb-10 leading-relaxed font-sans font-medium">
            {language === 'am'
              ? 'ከእኛ ጋር በመተባበር ዝግጅቶችን ለማዘጋጀት ወይም የባህል ሁነቶቻችንን ለመካፈል ያግኙን።'
              : 'Whether booking an international engagement, supporting young performers, or attending our next sanctuary gathering in Addis Ababa.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-kin-green hover:bg-kin-green-dark dark:bg-kin-gold dark:hover:bg-kin-gold-dark text-white dark:text-kin-coffee font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95"
            >
              {language === 'am' ? 'አብረውን ይስሩ' : 'Collaborate With Kin'}
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-kin-coffee-card hover:bg-stone-100 text-stone-950 dark:text-white font-extrabold text-xs uppercase tracking-wider border-2 border-stone-300 dark:border-kin-coffee-border transition-all active:scale-95 shadow-sm"
            >
              {language === 'am' ? 'ሁነቶችን ይመልከቱ' : 'View Upcoming Events'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}