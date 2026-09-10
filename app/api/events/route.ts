import { NextResponse } from 'next/server';
import { getEvents } from '@/lib/content';
import { connectToDatabase } from '@/lib/db/mongodb';
import { EventModel } from '@/models/Event';
import { mockEvents } from '@/lib/db/seed-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ success: true, data: mockEvents }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      amharicTitle,
      description,
      imageUrl,
      date,
      time,
      location,
      venue,
      category,
      performers,
      status,
      ticketUrl,
    } = body;

    if (!title || !description || !date || !time || !location || !venue || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required event fields' },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();

    const isConnected = await connectToDatabase();

    const newEvent = {
      id: 'e_' + Date.now(),
      title,
      amharicTitle: amharicTitle || '',
      slug,
      description,
      imageUrl: imageUrl || '/images/events/echoes.svg',
      date: new Date(date).toISOString(),
      time,
      location,
      venue,
      category,
      performers: Array.isArray(performers) ? performers : typeof performers === 'string' ? performers.split(',').map((p) => p.trim()) : [],
      status: status || 'upcoming',
      ticketUrl: ticketUrl || '',
    };

    if (isConnected) {
      const dbEvent = await EventModel.create({
        ...newEvent,
        date: new Date(date),
      });
      return NextResponse.json({ success: true, data: { ...newEvent, id: String(dbEvent._id) } }, { status: 201 });
    }

    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
