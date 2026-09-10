export type CulturalDiscipline =
  | 'Circus'
  | 'Music'
  | 'Dance'
  | 'Traditional Arts'
  | 'Cultural Events'
  | 'Community';

export type GalleryCategory = 'Events' | 'Music' | 'Circus' | 'Culture' | 'Community';

export type AnnouncementCategory = 'Auditions' | 'Notices' | 'Workshops' | 'Press' | 'Opportunities';

export type EventStatus = 'upcoming' | 'past';

export interface TeamMember {
  id: string;
  name: string;
  amharicName?: string;
  slug: string;
  role: string;
  amharicRole?: string;
  discipline: CulturalDiscipline;
  amharicDiscipline?: string;
  bio: string;
  amharicBio?: string;
  photoUrl: string;
  skills: string[];
  amharicSkills?: string[];
  socialLinks?: {
    instagram?: string;
    telegram?: string;
    linkedin?: string;
  };
  featured: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  amharicTitle?: string;
  date: string;
  time: string;
  location: string;
  amharicLocation?: string;
  venue: string;
  amharicVenue?: string;
  category: CulturalDiscipline;
  amharicCategory?: string;
  description: string;
  amharicDescription?: string;
  imageUrl: string;
  performers: string[];
  amharicPerformers?: string[];
  status: EventStatus;
  ticketUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  amharicTitle?: string;
  excerpt: string;
  amharicExcerpt?: string;
  content: string;
  amharicContent?: string;
  featuredImage: string;
  author: {
    name: string;
    amharicName?: string;
    role: string;
    amharicRole?: string;
  };
  category: string;
  amharicCategory?: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  amharicReadingTime?: string;
  featured?: boolean;
}

export interface Announcement {
  id: string;
  slug: string;
  title: string;
  amharicTitle?: string;
  date: string;
  category: AnnouncementCategory;
  amharicCategory?: string;
  summary: string;
  amharicSummary?: string;
  fullContent: string;
  amharicFullContent?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  caption: string;
  amharicCaption?: string;
  category: GalleryCategory;
  amharicCategory?: string;
  location: string;
  amharicLocation?: string;
  uploadedAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}
