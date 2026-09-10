'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockBlogPosts } from '@/lib/db/seed-data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [featuredPost, ...regularPosts] = mockBlogPosts;

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          geez="፩"
          tag={language === 'am' ? 'የባህል መጽሔት' : 'Cultural Journalism'}
          title={language === 'am' ? 'የኪን ታሪኮችና ጽሑፎች' : 'The Kin Chronicles'}
          subtitle={
            language === 'am'
              ? 'ስለ ኢትዮጵያ ባህላዊ ጥበባት፣ ከበሮ ምትና ሰርከስ የተጻፉ ጥበባዊ ጽሑፎች።'
              : 'Essays, performance memoirs, and scholarly reflections on Ethiopian performance arts.'
          }
        />

        {/* Featured Editorial Banner */}
        {featuredPost && (
          <div className="mb-16 bg-white dark:bg-kin-coffee-card rounded-3xl overflow-hidden border-2 border-stone-300 dark:border-kin-coffee-border shadow-md hover:shadow-xl transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-kin-gold/20 text-kin-gold font-extrabold text-xs uppercase tracking-wider">
                      {language === 'am' ? 'ዋና ታሪክ' : 'Featured Story'}
                    </span>
                    <span className="text-xs text-stone-700 dark:text-stone-300 font-bold">
                      {language === 'am' && featuredPost.amharicReadingTime ? featuredPost.amharicReadingTime : featuredPost.readingTime}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-950 dark:text-white group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors mb-4">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {language === 'am' && featuredPost.amharicTitle ? featuredPost.amharicTitle : featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-stone-900 dark:text-stone-200 text-sm sm:text-base font-medium leading-relaxed mb-6 font-sans">
                    {language === 'am' && featuredPost.amharicExcerpt ? featuredPost.amharicExcerpt : featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-stone-200 dark:border-kin-coffee-border">
                  <div className="flex items-center gap-2 text-xs text-stone-800 dark:text-stone-300 font-bold">
                    <User className="w-4 h-4 text-kin-gold" />
                    <span>{language === 'am' && featuredPost.author.amharicName ? featuredPost.author.amharicName : featuredPost.author.name}</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-kin-green dark:text-kin-gold hover:underline transition-colors"
                  >
                    {language === 'am' ? 'ሙሉውን ያንብቡ' : 'Read Journal Entry'} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-kin-coffee relative min-h-[280px] overflow-hidden">
                <Image
                  src={featuredPost.featuredImage || '/images/hero/kin-ethiopia-golden-banner.jpg'}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kin-coffee/80 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-kin-coffee-card rounded-2xl overflow-hidden border-2 border-stone-300 dark:border-kin-coffee-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] bg-kin-coffee overflow-hidden">
                  <Image
                    src={post.featuredImage || '/images/culture/kin-vocalists-performance.jpg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-kin-green/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                      {language === 'am' && post.amharicCategory ? post.amharicCategory : post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-stone-700 dark:text-stone-300 font-bold mb-3">
                    <span className="flex items-center gap-1 font-extrabold text-kin-green dark:text-kin-gold">
                      <Calendar className="w-3.5 h-3.5 text-kin-gold" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      {language === 'am' && post.amharicReadingTime ? post.amharicReadingTime : post.readingTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-extrabold text-stone-950 dark:text-white group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {language === 'am' && post.amharicTitle ? post.amharicTitle : post.title}
                    </Link>
                  </h3>
                  <p className="text-stone-900 dark:text-stone-300 text-xs font-medium leading-relaxed line-clamp-3 mb-4 font-sans">
                    {language === 'am' && post.amharicExcerpt ? post.amharicExcerpt : post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-stone-100/90 dark:bg-kin-coffee-elevated border-t border-stone-200 dark:border-kin-coffee-border flex items-center justify-between text-xs text-stone-800 dark:text-stone-300">
                <span className="font-bold flex items-center gap-1.5 truncate">
                  <User className="w-3.5 h-3.5 text-kin-green dark:text-kin-gold" />
                  {language === 'am' && post.author.amharicName ? post.author.amharicName : post.author.name}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-extrabold uppercase tracking-wider text-kin-green dark:text-kin-gold hover:underline shrink-0 flex items-center gap-1"
                >
                  {language === 'am' ? 'ያንብቡ' : 'Read'} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}