import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string;
  publishedAt: Date;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: String,
    publishedAt: { type: Date, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AnnouncementModel: Model<IAnnouncement> =
  mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
