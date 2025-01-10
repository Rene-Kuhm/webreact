import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Debug: Log all environment variables
console.log('All env vars:', {
  ...import.meta.env
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log the specific values we're using
console.log('Supabase Config:', {
  supabaseUrl,
  supabaseAnonKey,
  urlType: typeof supabaseUrl,
  keyType: typeof supabaseAnonKey,
  isDefined: {
    url: typeof import.meta.env.VITE_SUPABASE_URL !== 'undefined',
    key: typeof import.meta.env.VITE_SUPABASE_ANON_KEY !== 'undefined'
  }
});

if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL:', {
    env: import.meta.env,
    mode: import.meta.env.MODE
  });
  throw new Error('VITE_SUPABASE_URL is not defined in environment variables');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is not defined in environment variables');
}

const supabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

export { supabaseClient as supabase };
