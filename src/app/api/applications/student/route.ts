import { NextRequest, NextResponse } from 'next/server';
import { studentApplicationSchema } from '@/lib/validation';
import { submitStudentApplication } from '@/lib/db/repository';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = studentApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const application = await submitStudentApplication(parsed.data);

    return NextResponse.json(
      {
        success: true,
        referenceNumber: application.referenceNumber,
        message: 'Student application received and pending guardian email verification.',
        data: application,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error processing application.' },
      { status: 500 }
    );
  }
}
