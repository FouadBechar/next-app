import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/client';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    const supabase = createAdminClient();

    let query = supabase.from('activities').select('id,title,description,created_at').order('created_at', { ascending: false }).limit(50);
    if (userId) query = query.eq('user_id', userId as string) as any;

    const { data, error } = await query;
    if (error) {
      console.error('Activities query error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const payload = (data || []).map((a: any) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      timestamp: a.created_at,
    }));

    return NextResponse.json({ activities: payload });
  } catch (err) {
    console.error('Activities.route error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
