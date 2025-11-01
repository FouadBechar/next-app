import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/client';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    const supabase = createAdminClient();

    // If a userId is provided, return user-specific stats; otherwise, return global summary
    if (userId) {
      // count login rows for user in `user_logins` if table exists
      try {
        const { count, error } = await supabase
          .from('user_logins')
          .select('id', { count: 'exact', head: false })
          .eq('user_id', userId as string);

        if (error) {
          console.error('Stats user_logins error', error);
        }

        const loginCount = typeof count === 'number' ? count : 0;

        return NextResponse.json({ loginCount });
      } catch (err) {
        console.error('Stats route user error', err);
        return NextResponse.json({ loginCount: 0 });
      }
    }

    // Global fallback stats (lightweight)
    try {
      const { data: recent, error } = await supabase
        .from('activities')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) console.error('Global stats activities error', error);

      return NextResponse.json({ active: Array.isArray(recent) ? recent.length : 0 });
    } catch (err) {
      console.error('Stats route global error', err);
      return NextResponse.json({ active: 0 });
    }
  } catch (err) {
    console.error('Stats.route error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
