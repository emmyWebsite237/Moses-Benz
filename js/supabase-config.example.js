/*
  Optional production backend configuration.
  Copy this file to js/supabase-config.js and fill in your Supabase project values.
  NEVER put a Supabase service_role key or any admin secret in browser JavaScript.
  The public anon key is safe to expose only when your database has correct RLS policies.
*/
window.MBAC_SUPABASE = {
  url: 'https://YOUR-PROJECT.supabase.co',
  anonKey: 'YOUR_PUBLIC_ANON_KEY'
};
