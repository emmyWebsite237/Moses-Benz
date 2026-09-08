# Secure Admin Setup

The browser project contains no admin password, password hash, hard-coded admin email, or service-role key.

1. Create the administrator in Supabase Authentication → Users.
2. Copy the user's UUID.
3. Run `supabase-admin-auth-migration.sql`.
4. Insert the UUID and chosen username into `public.admin_users`.
5. Keep the password only in Supabase Auth.
6. Keep the service-role/secret key out of all browser files.

Important: a static HTML browser cannot safely turn an arbitrary username into a Supabase Auth email/password login without exposing the email or using a server-side resolver. The production username/password flow should therefore use a Vercel server-side endpoint or Supabase Edge Function. The browser should receive only the public Supabase URL/key and authenticated session.
