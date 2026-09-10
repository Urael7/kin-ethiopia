import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  date: Date;
  time: string;
  location: string;
  venue: string;
  category: string;
  performers: string[];
  status: 'upcoming' | 'past';
  ticketUrl?: string;
  amharicTitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    venue: { type: String, required: true },
    category: { type: String, required: true },
    performers: { type: [String], default: [] },
    status: { type: String, enum: ['upcoming', 'past'], required: true },
    ticketUrl: String,
    amharicTitle: String,
  },
  { timestamps: true }
);

export const EventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
