import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/client';

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    const supabase = createAdminClient();

    // Build 14-day window
    const days = 14;
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (days - 1));

    // Query activities in the window. If table doesn't exist, return generated zeros.
    const { data, error } = await supabase
      .from('activities')
      .select('created_at')
      .gte('created_at', start.toISOString())
      .lte('created_at', end.toISOString())
      .order('created_at', { ascending: true })
      .limit(1000);

    if (error) {
      console.error('Timeseries query error', error);
      // fallback: return zeros for the window
      const zeroSeries = Array.from({ length: days }).map((_, i) => {
        const dt = new Date(start);
        dt.setDate(start.getDate() + i);
        return { date: isoDate(dt), value: 0 };
      });
      return NextResponse.json({ series: zeroSeries });
    }

    // Aggregate counts per day
    const counts: Record<string, number> = {};
    if (Array.isArray(data)) {
      for (const row of data) {
        const dt = new Date(row.created_at);
        const key = isoDate(dt);
        counts[key] = (counts[key] || 0) + 1;
      }
    }

    const series = Array.from({ length: days }).map((_, i) => {
      const dt = new Date(start);
      dt.setDate(start.getDate() + i);
      const key = isoDate(dt);
      return { date: key, value: counts[key] || 0 };
    });

    return NextResponse.json({ series });
  } catch (err) {
    console.error('Timeseries.route error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
