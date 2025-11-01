import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/client';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'missing userId' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('full_name,username,avatar_url')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Profile query error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data || null });
  } catch (err) {
    console.error('Profile.route error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
