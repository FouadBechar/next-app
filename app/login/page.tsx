import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // Use absolute paths to avoid relative-path surprises
      redirect('/dashboard');
    } else {
      redirect('/auth/login');
    }
  } catch (err) {
    // If anything goes wrong, default to the public login page
    redirect('/auth/login');
  }

  return null;
}
