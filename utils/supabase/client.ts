import { createBrowserClient } from '@supabase/ssr';
import { createClient as createNewClient } from '@supabase/supabase-js';

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export const createAdminClient = () =>
  createNewClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SRK!
  );
