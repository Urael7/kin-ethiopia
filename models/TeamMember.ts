import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  amharicName?: string;
  slug: string;
  role: string;
  discipline: string;
  bio: string;
  photoUrl: string;
  skills: string[];
  socialLinks?: {
    instagram?: string;
    telegram?: string;
    linkedin?: string;
  };
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    amharicName: String,
    slug: { type: String, required: true, unique: true, index: true },
    role: { type: String, required: true },
    discipline: { type: String, required: true },
    bio: { type: String, required: true },
    photoUrl: { type: String, required: true },
    skills: { type: [String], default: [] },
    socialLinks: {
      instagram: String,
      telegram: String,
      linkedin: String,
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TeamMemberModel: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
