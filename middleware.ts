import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { MIN_VERSIONS } from '@/lib/generated-browsers';

// Conservative built-in fallback versions (used if generated data lacks a key).
const FALLBACK_MIN_VERSIONS: Record<string, number> = {
  chrome: 80,
  edge: 80,
  firefox: 78,
  safari: 13,
  ios_saf: 13,
}

const SKIP_PATHS = ['/unsupported'];

function isBot(ua: string) {
  if (!ua) return false;
  const u = ua.toLowerCase();
  return /bot|crawl|spider|crawler|preview|headless|google|bing|facebookexternalhit|twitterbot/i.test(u);
}

function detectBrowser(ua: string) {
  if (!ua) return { name: 'unknown', version: 0 };
  const u = ua;

  // Edge (Chromium) — 'Edg/'
  let m = u.match(/Edg\/(\d+)/i);
  if (m) return { name: 'edge', version: parseInt(m[1], 10) };

  // Chrome / Chromium / CriOS
  m = u.match(/Chrome\/(\d+)/i) || u.match(/CriOS\/(\d+)/i);
  if (m && !/OPR\//i.test(u) && !/Edg\//i.test(u)) return { name: 'chrome', version: parseInt(m[1], 10) };

  // Firefox
  m = u.match(/Firefox\/(\d+)/i);
  if (m) return { name: 'firefox', version: parseInt(m[1], 10) };

  // Safari (not Chrome) — Version/X Safari/Y
  if (/Safari\//i.test(u) && !/Chrome\//i.test(u) && !/CriOS\//i.test(u)) {
    m = u.match(/Version\/(\d+)/i);
    if (m) return { name: 'safari', version: parseInt(m[1], 10) };
    // fallback: some iOS UAs contain OS version like 'OS 13_3' — treat as ios_saf
    m = u.match(/OS (\d+)_/i);
    if (m) return { name: 'ios_saf', version: parseInt(m[1], 10) };
  }

  // Trident / MSIE — legacy IE
  if (/Trident\//i.test(u) || /MSIE\s(\d+)/i.test(u)) return { name: 'ie', version: 11 };

  // Opera Mini or older mobile browsers — treat as old
  if (/Opera Mini|Opera Mobi|OPR\//i.test(u)) return { name: 'old', version: 0 };

  return { name: 'unknown', version: 0 };
}

export async function middleware(request: NextRequest) {
  // First perform session update/auth redirects (this may return a redirect response)
  const sessRes = await updateSession(request);

  // If updateSession returned a redirect (or non-next response), forward it immediately
  try {
    const status = sessRes.status;
    if (status >= 300 && status < 400) return sessRes;
  } catch (e) {
    // ignore and continue
  }

  // Now run conservative UA checks and redirect unsupported browsers to /unsupported
  try {
    const pathname = request.nextUrl.pathname;

    // skip the informational page itself and any configured skip paths
    if (SKIP_PATHS.includes(pathname)) return sessRes;

    // The matcher config already limits which paths run middleware, but skip common
    // static and api prefixes defensively.
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static')) {
      return sessRes;
    }

    const ua = request.headers.get('user-agent') || '';
    if (isBot(ua)) return sessRes;

    const info = detectBrowser(ua);
    // If unknown, do not block — fail-open for unknown agents. Only redirect
    // when we can confidently identify an old browser below our thresholds.
    if (info.name === 'unknown' || info.name === 'ie') {
      if (info.name === 'ie') {
        return NextResponse.redirect(new URL('/unsupported', request.url));
      }
      return sessRes;
    }
    // Prefer the generated MIN_VERSIONS, fall back to conservative defaults when missing.
    const genMin = (MIN_VERSIONS as Record<string, number>)[info.name];
    const fallbackMin = FALLBACK_MIN_VERSIONS[info.name as keyof typeof FALLBACK_MIN_VERSIONS];
    const min = typeof genMin === 'number' ? genMin : fallbackMin;
    if (typeof min === 'number' && info.version < min) {
      return NextResponse.redirect(new URL('/unsupported', request.url));
    }
  } catch (err) {
    // Fail open on any error — do not block requests because middleware failed
    return sessRes;
  }

  return sessRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/auth/:path*',
    '/dashboard/:path*',
  ],
};