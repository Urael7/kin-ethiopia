'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockBlogPosts } from '@/lib/db/seed-data';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { language } = useLanguage();
  const post = mockBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-500">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-kin-green dark:text-kin-gold mb-8 hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {language === 'am' ? 'ወደ መጽሔት ተመለስ' : 'Return to Chronicles'}
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs text-stone-700 dark:text-stone-300 font-bold mb-4">
            <span className="px-3 py-1 rounded-full bg-kin-gold/20 text-kin-gold font-extrabold uppercase">
              {language === 'am' && post.amharicCategory ? post.amharicCategory : post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              {language === 'am' && post.amharicReadingTime ? post.amharicReadingTime : post.readingTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-950 dark:text-white leading-tight mb-4">
            {language === 'am' && post.amharicTitle ? post.amharicTitle : post.title}
          </h1>

          <div className="flex items-center gap-3 pt-4 border-t border-stone-300 dark:border-kin-coffee-border">
            <div className="w-10 h-10 rounded-full bg-kin-green/20 text-kin-green dark:text-kin-gold flex items-center justify-center font-extrabold text-sm">
              {post.author.name[0]}
            </div>
            <div>
              <p className="text-xs font-extrabold text-stone-950 dark:text-white">
                {language === 'am' && post.author.amharicName ? post.author.amharicName : post.author.name}
              </p>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 font-bold">
                {language === 'am' && post.author.amharicRole ? post.author.amharicRole : post.author.role}
              </p>
            </div>
          </div>
        </div>

        {/* Content Typography */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-stone-900 dark:text-stone-200 leading-relaxed space-y-6 pt-6 border-t border-stone-300 dark:border-kin-coffee-border font-sans font-medium">
          {(language === 'am' && post.amharicContent ? post.amharicContent : post.content)
            .split('\n\n')
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        {/* Post Tags & Share */}
        <div className="mt-12 pt-6 border-t border-stone-300 dark:border-kin-coffee-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-stone-200 dark:bg-kin-coffee-elevated text-stone-900 dark:text-stone-200 font-bold border border-stone-300 dark:border-kin-coffee-border"
              >
                #{tag}
              </span>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-stone-950 dark:text-kin-gold hover:text-kin-green">
            <Share2 className="w-4 h-4" /> {language === 'am' ? 'ጽሑፉን አጋራ' : 'Share Entry'}
          </button>
        </div>
      </article>
    </div>
  );
}