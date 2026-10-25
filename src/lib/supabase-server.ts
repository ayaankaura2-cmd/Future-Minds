import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Server-side client strictly uses the private service role key for admin-level operations.
// Never expose this key on the client!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !serviceRoleKey) return false;
  if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) return false;
  if (supabaseUrl.includes('your-project') || supabaseUrl.includes('placeholder')) return false;
  if (serviceRoleKey.includes('your-service-role') || serviceRoleKey.includes('placeholder')) return false;
  return true;
};

export const getSupabaseServerClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
