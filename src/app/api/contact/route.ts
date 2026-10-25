import { NextRequest, NextResponse } from 'next/server';
import { contactMessageSchema } from '@/lib/validation';
import { submitContactMessage } from '@/lib/db/repository';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const message = await submitContactMessage(parsed.data);

    return NextResponse.json(
      {
        success: true,
        messageId: message.id,
        message: 'Inquiry received. A representative will respond within 48 business hours.',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error processing contact message.' },
      { status: 500 }
    );
  }
}
