# Moses Benz redesign update

## Public changes
- Services page/catalogue removed from public navigation.
- Blog replaces Services.
- Reviews are shown on the homepage as an automatic horizontal carousel.
- Careers removed from navigation.
- Home appears on inner pages.
- Vehicle purchase uses direct WhatsApp contact.
- Appointment form collects full name, email, WhatsApp, model, year, location and symptoms, then opens WhatsApp.
- Inventory is grouped by class with Other Brands as a separate group.

## Supabase
Run `supabase-blog-and-inventory-update.sql` once. It adds the blog table, inventory brand field, and explicit browser grants needed by the public forms.

The blog admin currently uses the shared public REST layer. Do not expose a service-role key in the browser.
