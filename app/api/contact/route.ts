import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/contact';
import { connectToDatabase } from '@/lib/db/mongodb';
import { ContactMessageModel } from '@/models/ContactMessage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Persist to MongoDB if connection is configured
    const db = await connectToDatabase();
    if (db) {
      await ContactMessageModel.create({
        ...validatedData,
        status: 'unread',
        createdAt: new Date(),
      });
    } else {
      console.log('Contact form submitted in offline/mock mode:', validatedData);
    }

    return NextResponse.json(
      { success: true, message: 'Message received. We will respond shortly.' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, message: 'Server could not process message.' },
      { status: 500 }
    );
  }
}