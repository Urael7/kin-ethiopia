import { MetadataRoute } from 'next';
import { getEvents, getBlogPosts, getAnnouncements } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kinethiopia.org';

  const [events, posts, announcements] = await Promise.all([
    getEvents(),
    getBlogPosts(),
    getAnnouncements(),
  ]);

  const staticPages = ['', '/about', '/events', '/blog', '/announcements', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const eventPages = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const announcementPages = announcements.map((ann) => ({
    url: `${baseUrl}/announcements/${ann.slug}`,
    lastModified: new Date(ann.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...eventPages, ...blogPages, ...announcementPages];
}
