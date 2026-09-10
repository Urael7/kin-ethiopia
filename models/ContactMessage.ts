import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
  phone: { type: String, required: true, trim: true, maxlength: 40 },
  subject: { type: String, required: true, trim: true, maxlength: 160 },
  message: { type: String, required: true, trim: true, maxlength: 4000 },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
});

export const ContactMessageModel: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
