import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Don't mutate the incoming request cookies (read-only in Edge). Instead,
          // set cookies on the response object which will be returned to the client.
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Do not assign to request.nextUrl.pathname — that was a bug.
  const isNewPasswordPage = request.nextUrl.pathname === '/auth/new-password';

  if (
    user &&
    request.nextUrl.pathname.startsWith('/auth') &&
    !isNewPasswordPage
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // protected routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return supabaseResponse;
}
