# Moses Benz Auto Care — final Supabase/admin setup

1. In Supabase, run `supabase-schema.sql`.
2. Then run `supabase-inventory-seed.sql` if you want the supplied reference inventory loaded. Delete/modify any vehicle you do not actually have.
3. In Supabase Authentication, create the one workshop administrator account using the email you put in `adminEmail`.
4. Set the admin account's password in Supabase. The browser never contains the real password.
5. Copy the Supabase project URL and the **publishable/anon key** into `js/supabase-config.js`.
6. Set `adminUsername` to the username you want to type on the hidden admin login screen. It maps internally to `adminEmail` for Supabase Auth.
7. The public customer Login/Signup flow is removed. Customers submit service, appointment and purchase forms directly.
8. Admin route: `/mbac-control-7x4k9` and portal: `/mbac-control-7x4k9/portal`.
9. The portal uses Supabase as the shared source of truth. Inventory, services, appointments, reviews, repair stories and credentials are no longer intended to be browser-local data.
10. For Cloudinary, keep using an unsigned upload preset and paste the returned HTTPS URLs into the admin forms.

## Important security note
The previous archive contained a service-role Supabase JWT inside `js/supabase-config.js`. This update removes it. **Rotate/revoke that exposed service-role key in Supabase immediately** and create/use the public publishable/anon key in the site configuration.

The public anon key is not a password; RLS policies are what prevent unauthorized database operations. The service-role key must remain server-side and must never be shipped in HTML/JS.
