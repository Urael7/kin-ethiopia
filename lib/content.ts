import { connectToDatabase } from '@/lib/db/mongodb';
import {
  mockAnnouncements,
  mockBlogPosts,
  mockEvents,
  mockGallery,
  mockTeamMembers,
} from '@/lib/db/seed-data';
import { AnnouncementModel } from '@/models/Announcement';
import { BlogPostModel } from '@/models/BlogPost';
import { EventModel } from '@/models/Event';
import { GalleryImageModel } from '@/models/GalleryImage';
import { TeamMemberModel } from '@/models/TeamMember';
import type { Announcement, BlogPost, EventItem, GalleryItem, TeamMember } from '@/types';

async function canUseMongo() {
  try {
    return Boolean(await connectToDatabase());
  } catch {
    return false;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (await canUseMongo()) {
    const docs = await TeamMemberModel.find().sort({ featured: -1, name: 1 }).lean();
    if (docs.length) {
      return docs.map((doc) => ({
        id: String(doc._id),
        slug: doc.slug,
        name: doc.name,
        amharicName: doc.amharicName,
        role: doc.role,
        discipline: doc.discipline as TeamMember['discipline'],
        bio: doc.bio,
        photoUrl: doc.photoUrl,
        skills: doc.skills ?? [],
        socialLinks: doc.socialLinks,
        featured: doc.featured,
      }));
    }
  }
  return mockTeamMembers;
}

export async function getEvents(): Promise<EventItem[]> {
  if (await canUseMongo()) {
    const docs = await EventModel.find().sort({ date: 1 }).lean();
    if (docs.length) {
      return docs.map((doc) => ({
        id: String(doc._id),
        slug: doc.slug,
        title: doc.title,
        amharicTitle: doc.amharicTitle,
        date: new Date(doc.date).toISOString(),
        time: doc.time,
        location: doc.location,
        venue: doc.venue,
        category: doc.category as EventItem['category'],
        description: doc.description,
        imageUrl: doc.imageUrl,
        performers: doc.performers ?? [],
        status: doc.status,
        ticketUrl: doc.ticketUrl,
      }));
    }
  }
  return mockEvents;
}

export async function getEventBySlug(slug: string) {
  const events = await getEvents();
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (await canUseMongo()) {
    const docs = await BlogPostModel.find().sort({ publishedAt: -1 }).lean();
    if (docs.length) {
      return docs.map((doc) => ({
        id: String(doc._id),
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt,
        content: doc.content,
        featuredImage: doc.featuredImage,
        author: doc.author,
        category: doc.category,
        tags: doc.tags ?? [],
        publishedAt: new Date(doc.publishedAt).toISOString().slice(0, 10),
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString().slice(0, 10) : undefined,
        readingTime: doc.readingTime || '5 min read',
        featured: doc.featured,
      }));
    }
  }
  return mockBlogPosts;
}

export async function getPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  if (await canUseMongo()) {
    const docs = await AnnouncementModel.find().sort({ publishedAt: -1 }).lean();
    if (docs.length) {
      return docs.map((doc) => ({
        id: String(doc._id),
        slug: doc.slug,
        title: doc.title,
        date: new Date(doc.publishedAt).toISOString().slice(0, 10),
        category: doc.category as Announcement['category'],
        summary: doc.excerpt,
        fullContent: doc.content,
        imageUrl: doc.imageUrl,
        featured: doc.featured,
      }));
    }
  }
  return mockAnnouncements;
}

export async function getAnnouncementBySlug(slug: string) {
  const items = await getAnnouncements();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (await canUseMongo()) {
    const docs = await GalleryImageModel.find().sort({ uploadedAt: -1 }).lean();
    if (docs.length) {
      return docs.map((doc) => ({
        id: String(doc._id),
        imageUrl: doc.imageUrl,
        alt: doc.alt,
        caption: doc.caption,
        category: doc.category as GalleryItem['category'],
        location: doc.location ?? '',
        uploadedAt: new Date(doc.uploadedAt).toISOString().slice(0, 10),
      }));
    }
  }
  return mockGallery;
}
