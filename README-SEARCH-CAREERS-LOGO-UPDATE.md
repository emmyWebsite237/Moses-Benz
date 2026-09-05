# Update — Logo, Site Search, Searchable Service Select, Careers Page

## Logo
- Replaced the generated inline logo mark with an `<img>` pointing at `images/logo.png`, across every page's header and footer (15 files).
- A neutral placeholder `images/logo.png` is included so the site doesn't show a broken image icon.
- **To use your real logo:** just replace `images/logo.png` with your own file, keeping the exact same filename. No code or HTML changes needed — it updates everywhere automatically. A roughly square image with a transparent background works best (it's displayed in a small ~34px badge in the header and footer).

## Site-wide search
- A search button (magnifying glass icon) now appears in the header on every customer-facing page, next to "Book a Service".
- Clicking it (or pressing `/` anywhere outside a text field) opens a search overlay that searches **both** the services list and the cars-for-sale inventory at once, live as you type.
- Selecting a service jumps straight to that service's detail page; selecting a car jumps to its listing on the Inventory page (scrolled to and outlined).
- Implemented in `js/search.js`, loaded automatically on every page — no per-page setup needed.

## Searchable "Service" field (appointments)
- The ~90-option Service dropdown on the Book a Service page is now a type-to-search field: start typing and matching services filter live, or just pick from the full list.
- If someone types something that isn't in the preset list, their typed text is still accepted and submitted — they're never blocked from booking just because their exact wording isn't a preset option.
- Implemented in `js/searchable-select.js` as a general-purpose enhancement (add `data-combobox="1"` to any future `<select>` that grows a long list of options, and it gets the same treatment automatically for anything over 8 options).

## Careers page
- New `careers.html` (`/careers`) — a job application form for people who want to work at the workshop: name, phone/WhatsApp, optional email, role interested in, an experience-level select (already experienced vs. new but willing to learn), and a short message.
- Submitting opens WhatsApp with the applicant's details pre-filled (and emails a copy too, if `js/form-config.js` has a workshop email configured) — same pattern as the other forms on the site.
- Added a "We're Hiring" section to the homepage linking to it, and a "Careers" link in the main nav and footer on every page.
- This page does not (yet) have an admin-side view for reviewing applications — submissions arrive by WhatsApp/email only, the same way appointment requests and inventory enquiries already do outside of Supabase.

## Housekeeping
- Removed a redundant third "Workshop Menu" block on the Services page — it repeated the same categories already covered by the top highlight cards and the full searchable catalogue directly below it.
- Standardized the footer's "Explore" link list across all pages (some pages were missing links — e.g. "Approvals & Certificates" — that others had).
