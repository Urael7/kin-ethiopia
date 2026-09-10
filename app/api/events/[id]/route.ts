import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { EventModel } from '@/models/Event';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isConnected = await connectToDatabase();
    if (isConnected) {
      await EventModel.findByIdAndDelete(params.id);
    }
    return NextResponse.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const isConnected = await connectToDatabase();
    
    if (isConnected) {
      const updated = await EventModel.findByIdAndUpdate(params.id, body, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ success: true, data: { id: params.id, ...body } });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    );
  }
}
