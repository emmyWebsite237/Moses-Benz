# Moses Benz Auto Care — Landing Page

A single-page template for a Mercedes-Benz repair, servicing and sales
business. Plain HTML/CSS/JS — no build step, no framework. Open
`index.html` in a browser or drop the folder on any static host
(Netlify, Vercel, GitHub Pages, S3, etc.).

## Pages

- `index.html` — homepage (hero, services, a live 3-car inventory
  teaser, diagnostics, process, reviews, contact/map)
- `inventory.html` — full list of cars for sale, with Available/Sold
  filter tabs, reading live from the shared data store
- `admin.html` — password-gated panel to add cars, mark them
  sold/available, delete them, and export/import the data (see
  "How the admin panel works" below) — **not linked from the main
  nav**, only from a small "Admin" link in the footer

## Files

- `styles.css` — all styling, including the design tokens at the top
- `script.js` — header scroll state, mobile menu, marquee loop, scroll
  reveal animations, and a placeholder booking-form handler (used on
  `index.html` and `inventory.html`)
- `js/store.js` — the shared data layer for cars for sale (seed data,
  localStorage persistence, add/update/delete/mark-sold, NGN/km
  formatting, export/import). `index.html`, `inventory.html` and
  `admin.html` all read from this one file, so there's only one
  place car data actually lives in code.
- `js/home-inventory.js` — renders the 3-car teaser on the homepage
- `js/inventory.js` — renders the full grid + filters on `inventory.html`
- `js/admin.js` — the admin panel's login gate and CRUD logic

## How the admin panel works (read this — it's important)

This is a static site with **no backend or database**. `admin.html`
lets you add/edit/delete cars, but those changes are saved to
**localStorage in your browser only** — they will not appear for
visitors using a different browser, device, or incognito window.

The workflow to actually publish changes:

1. Go to `admin.html`, sign in, and make your changes (add cars, mark
   things sold, delete old listings).
2. Click **Export data (.json)** to download the current list, or
   **Export as store.js seed** to download a ready-to-use replacement
   for `js/store.js`'s `CARS_SEED` array.
3. Replace the relevant file in your project with the exported one,
   and re-deploy the site. Now everyone sees the update.
4. **Import data (.json)** lets you load a previously exported
   `cars.json` back into the admin panel (handy for restoring a
   backup, or moving data between browsers while testing).
5. **Reset to defaults** wipes local changes and goes back to the
   five sample cars this template ships with.

If you outgrow this (multiple admins, instant updates without a
redeploy step), replace `js/store.js`'s functions with calls to a
real backend — every page that uses `MBStore.getCars()` etc. would
keep working the same way.

### Admin password

The password is set in `js/admin.js`:

```js
const ADMIN_PASSWORD = 'mosesbenz2026';
```

**This is not real security** — it's a plain-text string in a file
anyone can view via "View Page Source." It's meant to keep casual
visitors off the admin page, nothing more. If you ever put real
customer or business data behind this, replace it with actual
server-side authentication first.

## What's real vs. placeholder

The business identity is real, pulled from Moses Benz Auto Care's
public Google Maps listing:

- **Name**: Moses Benz Auto Care
- **Address**: 11 Lasu Rd, beside Federal Peace Estate, Idimu, Lagos 102213
- **Phone**: +234 906 152 6267
- **Hours**: Mon–Fri 8:00 AM–7:00 PM, Sat 8:00 AM–3:00 PM, closed Sunday
- **Map**: the footer and the "Find Us" section both link to and embed
  the real Google Maps location (via its Place ID,
  `ChIJ9wS7aQCROxARHinfFB1ds1w`)

Everything else — the tagline, the service descriptions, the
inventory cars, prices, VINs, review quotes, and stats (bays open,
turnaround time, technician count) — is placeholder content written
to show off the layout. **Double-check the real hours/phone/address
against the current Google listing before publishing**, since
business listings change, and replace the placeholder content with
the shop's actual services, cars for sale, and customer reviews.

## Currency & units

Prices are in Nigerian Naira (formatted with `Intl.NumberFormat`,
e.g. ₦45,000,000) and mileage is in kilometres — both set in
`js/store.js` and used consistently across the homepage teaser, the
inventory page, and the admin panel. Change the `formatNGN` /
`formatKm` functions there if you need a different currency or unit.

## Mobile

The header collapses into a hamburger menu, the inventory grid drops
from 3 → 2 → 1 columns, the admin car rows restack into a compact
card layout, and the hero's diagnostic callouts hide on small screens
to keep things clean. Test locally with your browser's device
toolbar before publishing.

## Images

Most photography is stock (Unsplash) for the AMG hero shots and the
inventory listings, since those are placeholder cars, not real
stock. But four real photos of the actual shop are used and live in
`images/`:

- `images/workshop-yard.jpg` — the yard on Lasu Rd, several cars in for work
- `images/workshop-technicians.jpg` — technicians working a wheel/brake (used in the "Diagnostics" section)
- `images/street-cars.jpg` — cars parked out front
- `images/landmark-fuel-station.jpg` — the filling station landmark near the shop, used in "Find Us" for wayfinding

These appear in the **"No stock photos past this point"** gallery
section on the homepage (`#workshop`), in the Diagnostics section,
and in Find Us on both `index.html` and `inventory.html`. They're
saved locally in the project rather than hotlinked, so the site
doesn't depend on any third-party photo host staying online. If you
get higher-resolution versions later (the current ones are small,
~460×329px, sourced from a Google Maps listing), just replace the
files in `images/` with the same filenames and everything updates
automatically.

## First things to customize

1. **Logo** — the mark is a plain inline SVG (a stylized dial, not
   the Mercedes-Benz tri-star) near the top of `index.html` — swap it
   for a real logo image if the shop has one.
2. **Images** — every photo is hot-linked from Unsplash
   (`images.unsplash.com`) so the page works immediately. None of
   them are actual photos of this workshop or its cars. For a real
   launch, replace them with real photos of the shop, the team, and
   cars actually in stock.
3. **Inventory cards** — under `#inventory`, each `.car-card` has a
   model name, price, spec line, and status ("Available"/"Sold").
   Duplicate a card block to add more cars, or wire it up to a real
   inventory feed.
4. **Prices, VINs, mileage, reviews, stats** — all placeholder.
   Replace before publishing.
5. **Colors & type** — open `styles.css` and edit the CSS variables at
   the top of the file under `:root`. Everything else on the page
   reads from those variables, so changing `--ignition` (the red
   accent) or the font stack there updates the whole site.
6. **Trademark disclaimer** — kept in the footer since this is an
   independent specialist, not an authorized Mercedes-Benz dealer.
   Keep some version of this if that's accurate; edit it if the
   business's actual relationship with Mercedes-Benz AG is different.

## Notes on the design

- The hero has small animated "diagnostic callout" labels over the
  car image (`.hero-callouts` in `index.html`, styled in
  `styles.css`) — meant to evoke a live inspection readout. They're
  hidden on small screens (`@media max-width: 860px`) to keep mobile
  clean.
- The red marquee band uses real Mercedes chassis codes (W206, W223,
  W463, etc.) as a factual, on-brand structural detail rather than
  decoration.
- The "Precision, Measured" section (`#diagnostics`) is the visual
  centerpiece — a wheel/brake-caliper photo with a small overlaid
  stat readout. Swap the numbers in `.readout-row` for real service
  data if you want it to reflect something specific per car.
- Booking form at the bottom of the footer is front-end only. See the
  `TODO` comment in `script.js` for where to wire it to a real
  backend or a service like Formspree/Netlify Forms.

## Browser support

Modern evergreen browsers. Uses `IntersectionObserver`,
`backdrop-filter`, and CSS custom properties — all safe for anything
released in the last several years. `prefers-reduced-motion` is
respected throughout.


## Updated navigation & pages

The site now uses a shared header/footer shell. Header and footer remain mounted while the content area loads route pages with a fade + upward slide transition. Pages include Services, Our Workshop, Inventory, Diagnostics, Process, Reviews, Contact and a dedicated wide Book an Appointment page. The mobile navigation has an explicit X close button and also closes with Escape or after selecting a page.

## Appointment requests

Appointment requests are intentionally front-end only in this static build. Submitting the appointment form opens WhatsApp to **+234 906 152 6267** with the entered vehicle, service, date, time and symptom details. Replace this with your preferred backend/CRM later if you want requests stored centrally.

## Admin/authentication

The admin gate now stores only a short-lived session flag in `sessionStorage` and compares a SHA-256 password hash in the browser. This is stronger than exposing the password directly, but it is still **not production authentication** because the JavaScript is public. For real customer/business data, use server-side authentication (for example Supabase Auth) and database authorization/RLS.

## Deployment

This remains a no-build static site. Upload the complete folder to any static host (Vercel, Netlify, GitHub Pages, S3, etc.) and keep the relative file paths intact. The site should be served over HTTPS. If deploying on Vercel, import the repository, leave the framework as the static/no-build option, and use the project root as the output directory.


## Latest appointment/admin update

- The public appointment page now works as a **queue-first booking flow**: customers see upcoming open windows and select one before submitting their vehicle/service details.
- Admin can add/remove appointment **services**, add/remove **diagnostic options**, create/remove **queue slots**, and move appointment requests through `requested → confirmed → in_progress → done → cancelled`.
- Marking an appointment **Done** exposes a `Request review` action that opens WhatsApp to the customer's number with a unique internal review-page link.
- `review.html` collects a 1–5 rating and written feedback.
- WhatsApp DM links now use **08106958638** (international form: `2348106958638`).
- The mobile menu uses the same hamburger/X control; the X is visible while the menu is open and closes the panel.
- `Our Workshop` is forced onto one line on desktop navigation.
- The Diagnostics hero image is offset downward so the fixed header does not crowd the top of the image.

## Production data / security

The site includes `supabase-schema.sql`, `js/supabase-config.example.js`, `js/supabase-config.js`, and `js/backend.js` as the path toward a real shared backend. The public appointment/review code can POST to Supabase when public project values are configured. The local queue remains a fallback for immediate static-site use.

**Do not store a plaintext admin password, service-role key, or other secret in browser JavaScript.** Hashing/encoding/obfuscating a password in JS does not make it secret because visitors can inspect the code and attempt offline guesses. I therefore removed the plaintext fallback and kept only the existing SHA-256 local demo gate. For a production admin, use Supabase Auth + RLS/server-side authorization. The supplied SQL intentionally does not grant unrestricted public update/delete access to appointments.

An AI warning/comment cannot technically prevent anyone—including an AI—from inspecting or decoding JavaScript, so no fake anti-decoding mechanism was added.
