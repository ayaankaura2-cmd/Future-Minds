import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const inAdminArea = path === '/admin' || path.startsWith('/admin/');
    const allowedRoles: string[] = inAdminArea ? ['admin'] : ['admin', 'instructor'];

    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const role = user?.app_metadata?.role as string | undefined;

    if (!user || !role || !allowedRoles.includes(role)) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/login';
        loginUrl.search = '';
        loginUrl.searchParams.set('next', path);
        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*', '/instructor/:path*'],
};