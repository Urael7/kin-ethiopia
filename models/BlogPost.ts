import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  featured: boolean;
  readingTime: string;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      role: { type: String, required: true },
    },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, required: true },
    featured: { type: Boolean, default: false },
    readingTime: String,
  },
  { timestamps: true }
);

export const BlogPostModel: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
