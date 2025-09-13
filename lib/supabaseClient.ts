import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Do NOT create the client at module load time — that causes build-time errors when
// environment variables are not present during prerendering. Create lazily instead.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getSupabaseClient(): SupabaseClient | null {
  // Store on global to avoid recreating during HMR / multiple imports
  const g = globalThis as any;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!g.__supabase_client) {
    g.__supabase_client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return g.__supabase_client as SupabaseClient;
}

function ensureClientOrThrow() {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error(
      'Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.'
    );
  }
  return client;
}

export async function saveFreeTrialSubmission(payload: Record<string, any>) {
  const client = getSupabaseClient();
  if (!client) {
    // When running in an environment without Supabase configured (e.g. local build),
    // surface a helpful error rather than crashing with a low-level message.
    throw new Error(
      'Cannot save submission: Supabase is not configured. For local dev create a .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  const { data, error } = await client.from('free_trial_submissions').insert([payload]);
  if (error) throw error;
  return data;
}

export async function listFreeTrialSubmissions() {
  const client = ensureClientOrThrow();
  const { data, error } = await client.from('free_trial_submissions').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}


