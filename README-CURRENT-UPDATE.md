# Moses Benz Auto Care — shared-data / UX update

This build moves the live workshop catalogue toward a single shared Supabase source of truth.

## Main changes
- Customer Login, Sign Up and Logout UI removed.
- Process remains a homepage section; the standalone Process page/navigation was removed.
- Hidden admin route: `/mbac-control-7x4k9` with portal at `/mbac-control-7x4k9/portal`.
- Admin login now uses username + Supabase Auth password.
- No client-side password hash or fake credential is used.
- No two-session/session-block feature remains.
- Admin page content is hidden until authentication succeeds, preventing a public-content flash.
- Inventory is Supabase-backed and uses a responsive tile/grid layout.
- Inventory has search, clickable vehicle cards, vehicle detail modal and purchase enquiry modal.
- Services are Supabase-backed and searchable.
- Before/Process/After stays one repair gallery; Process images are not a separate page.
- Before & After, reviews and credentials are loaded publicly from Supabase.
- Reviews are pending by default and must be approved in Admin before appearing publicly.
- Appointments are stored centrally, emailed through FormSubmit, and can be scheduled/adjusted from Admin.
- Done/Cancelled appointments can be deleted.
- Admin can change the Supabase Auth password.
- Cloudinary remains the remote media store; the website requests optimized JPG delivery for Cloudinary image URLs.
- Mobile navigation is forced to a solid black drawer.

## Supabase setup
Run `supabase-schema.sql`, then optionally `supabase-inventory-seed.sql`.
Configure `js/supabase-config.js` with the Supabase project URL, public publishable/anon key, desired admin username, and the Supabase Auth email used by the admin account.

## Security
The previous build accidentally contained a service-role JWT in the browser configuration. This build removes it. Rotate/revoke that old service-role key in Supabase before deployment.
