import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name').max(120),
  email: z.string().trim().email('Enter a valid email address').max(200),
  phone: z
    .string()
    .trim()
    .min(8, 'Enter a phone number we can reach')
    .max(40)
    .regex(/^[0-9+\s()-]+$/, 'Use numbers and ordinary phone symbols only'),
  subject: z.string().trim().min(4, 'Add a short subject').max(160),
  message: z.string().trim().min(15, 'Tell us a little more (at least 15 characters)').max(4000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
