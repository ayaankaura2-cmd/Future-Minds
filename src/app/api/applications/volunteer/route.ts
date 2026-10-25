import { NextRequest, NextResponse } from 'next/server';
import { volunteerApplicationSchema } from '@/lib/validation';
import { submitVolunteerApplication } from '@/lib/db/repository';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = volunteerApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const application = await submitVolunteerApplication(parsed.data);

    return NextResponse.json(
      {
        success: true,
        referenceNumber: application.referenceNumber,
        message: 'Volunteer application received and under screening review.',
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
