MOSES BENZ AUTO CARE — FINAL IMAGE / APPOINTMENT / WORKING-HOURS FIX

1. CAR IMAGES
   - Cars no longer use /cars/img1.jpg, /cars/img2.jpg, etc.
   - All 59 catalogue records point to their real descriptive filenames in /cars.
   - The public inventory, vehicle detail pages and admin inventory no longer generate numbered car image paths.

2. BLOG IMAGES
   - Blog images use the exact image_url saved with each post.
   - There is no /images/blog/img1.jpg fallback or automatic img-number conversion.

3. WORKSHOP IMAGES
   - Numbered image naming remains ONLY for the workshop gallery.
   - Workshop slots can use img1, img2, img3, etc. with jpg/jpeg/png/webp extensions.

4. APPOINTMENTS
   - The public appointment form now saves to Supabase before opening WhatsApp.
   - If the save fails, WhatsApp is NOT opened and the customer sees the error.
   - Admin Appointments refreshes when the tab is opened and periodically while it is visible.
   - The supplied SQL adds a dedicated create_appointment RPC and keeps the admin appointment listing RPC authoritative.

5. WORKING HOURS
   - Admin Portal > Site Settings now has Monday-Sunday controls with Open/Closed and opening/closing times.
   - Saved working hours are stored in site_settings. The public footer and appointment page read those saved values.
   - Default schedule: Mon-Fri 08:00-19:00, Sat 08:00-15:00, Sun Closed.

IMPORTANT SUPABASE STEP
Run:
  supabase-appointments-working-hours-fix.sql
in Supabase SQL Editor once against the existing Moses Benz project.

This migration is required for the new appointment RPC and working-hours field/update function. The frontend is deliberately prevented from pretending an appointment was saved when Supabase rejects it.
