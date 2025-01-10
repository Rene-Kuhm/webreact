import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {
  profile?: {
    username?: string | null;
    full_name?: string | null;
    avatar_url?: string | null;
    website?: string | null;
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
  phone: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
