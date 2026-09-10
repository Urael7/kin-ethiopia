import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IGalleryImage extends Document {
  imageUrl: string;
  alt: string;
  caption: string;
  category: string;
  event?: string;
  location?: string;
  uploadedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  imageUrl: { type: String, required: true },
  alt: { type: String, required: true },
  caption: { type: String, required: true },
  category: { type: String, required: true },
  event: String,
  location: String,
  uploadedAt: { type: Date, default: Date.now },
});

export const GalleryImageModel: Model<IGalleryImage> =
  mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
