import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseServerClient } from '@/lib/supabase-server';

const STATUSES = ['pending', 'under_review', 'placed', 'waitlist', 'archived'];

async function isAdmin(): Promise<boolean> {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll() { },
            },
        }
    );
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user?.app_metadata?.role === 'admin';
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }
    const db = getSupabaseServerClient();
    if (!db) {
        return NextResponse.json({ error: 'Database is not configured' }, { status: 500 });
    }
    const { data, error } = await db
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ registrations: data });
}

export async function PATCH(req: NextRequest) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }
    const body = await req.json().catch(() => null);
    const id = body?.id;
    const status = body?.status;
    if (typeof id !== 'string' || typeof status !== 'string' || !STATUSES.includes(status)) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const notes = typeof body?.admin_notes === 'string' ? body.admin_notes.slice(0, 2000) : null;

    const db = getSupabaseServerClient();
    if (!db) {
        return NextResponse.json({ error: 'Database is not configured' }, { status: 500 });
    }
    const { data, error } = await db
        .from('registrations')
        .update({ status, admin_notes: notes, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*')
        .single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ registration: data });
}