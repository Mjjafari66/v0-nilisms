import { createClient } from '@supabase/supabase-js';

// Reads values from environment variables. Set these in your deployment (Vercel/GitHub Actions).
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Fail fast in development if not configured
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('Supabase environment variables are not set: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');

export async function saveFreeTrialSubmission(payload: Record<string, any>) {
  const { data, error } = await supabase.from('free_trial_submissions').insert([payload]);
  if (error) throw error;
  return data;
}

export async function listFreeTrialSubmissions() {
  const { data, error } = await supabase.from('free_trial_submissions').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}


