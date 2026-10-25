import { NextRequest, NextResponse } from 'next/server';
import { registrationSchema } from '@/lib/validation';
import { isSupabaseConfigured, getSupabaseServerClient } from '@/lib/supabase-server';

function generateReferenceNumber(): string {
  const year = '26';
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `FM-REG-${year}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = registrationSchema.safeParse(body);

    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        if (issue.path[0]) {
          fieldErrors[String(issue.path[0])] = issue.message;
        }
      }
      return NextResponse.json(
        {
          success: false,
          configured: isSupabaseConfigured(),
          error: 'Validation failed. Please review the highlighted fields.',
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const validated = parseResult.data;
    const referenceNumber = generateReferenceNumber();

    // Check if Supabase backend credentials are configured
    if (!isSupabaseConfigured()) {
      // Per instructions: "If credentials are missing, build the integration structure and document setup; never fake a successful save."
      // We inform the caller that server validation succeeded, but persistence requires Supabase keys in .env.local
      return NextResponse.json(
        {
          success: false,
          configured: false,
          code: 'DATABASE_SETUP_REQUIRED',
          referenceNumber,
          message:
            'Registration form passed all server validations! However, live Supabase credentials (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not yet configured in .env.local. In accordance with data integrity principles, we do not fake database persistence.',
          receivedData: {
            guardianName: validated.guardianName,
            guardianEmail: validated.guardianEmail,
            studentFirstName: validated.studentFirstName,
            studentAge: validated.studentAge,
            learningLevel: validated.learningLevel,
          },
        },
        { status: 200 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          configured: true,
          error: 'Unable to initialize Supabase server client.',
        },
        { status: 500 }
      );
    }

    // Server-side insert using protected service-role client into public.registrations
    const { data, error } = await supabase
      .from('registrations')
      .insert({
        reference_number: referenceNumber,
        guardian_name: validated.guardianName,
        guardian_email: validated.guardianEmail,
        guardian_phone: validated.guardianPhone || null,
        preferred_contact_method: validated.preferredContactMethod,
        student_first_name: validated.studentFirstName,
        student_age: validated.studentAge,
        student_grade: validated.studentGrade || null,
        student_country: validated.studentCountry,
        time_zone: validated.timeZone || null,
        learning_level: validated.learningLevel,
        coding_experience: validated.codingExperience,
        learning_goals: validated.learningGoals || null,
        additional_notes: validated.additionalNotes || null,
        guardian_consent: validated.guardianConsent,
        contact_consent: validated.contactConsent,
        status: 'pending',
      })
      .select('id, reference_number, created_at')
      .single();

    if (error) {
      console.error('Supabase registration insert error:', error);
      return NextResponse.json(
        {
          success: false,
          configured: true,
          error: `Database error: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        configured: true,
        referenceNumber: data.reference_number || referenceNumber,
        registrationId: data.id,
        message: 'Registration received successfully and securely saved to the database.',
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: `Server error while processing registration: ${msg}`,
      },
      { status: 500 }
    );
  }
}
