import { NextResponse } from 'next/server';

type VerifyRequest = {
  token: string;
};

export async function POST(request: Request) {
  try {
    const body: VerifyRequest = await request.json();
    const token = body?.token;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Missing token' }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET;
    if (!secret) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA not configured' }, { status: 500 });
    }

    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const json = await res.json();
    // reCAPTCHA v3 returns a score (0.0 - 1.0). Choose threshold (e.g., 0.5)
    const score = typeof json.score === 'number' ? json.score : null;
    const success = Boolean(json.success);

    const threshold = Number(process.env.RECAPTCHA_THRESHOLD ?? 0.5);
    if (!success) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA verification failed' }, { status: 403 });
    }

    if (score !== null && score < threshold) {
      return NextResponse.json({ success: false, message: 'Low reCAPTCHA score' }, { status: 403 });
    }

    return NextResponse.json({ success: true, score });
  } catch (err) {
    return NextResponse.json({ success: false, message: (err as Error).message }, { status: 500 });
  }
}
