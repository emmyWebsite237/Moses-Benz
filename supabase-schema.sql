-- Moses Benz Auto Care — Supabase schema / migration for the static HTML build.
-- IMPORTANT: browser code must use ONLY the publishable/anon key.
-- Never paste a service_role/secret key into js/supabase-config.js.

create extension if not exists pgcrypto;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.inventory (
  id text primary key,
  name text not null,
  year integer,
  price_ngn numeric not null default 0,
  mileage_km integer not null default 0,
  spec_tag text not null default '',
  status text not null default 'available' check(status in ('available','sold')),
  image_url text not null default '',
  description text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  model text not null,
  year integer,
  service text not null,
  registration text,
  message text not null default '',
  status text not null default 'requested' check(status in ('requested','confirmed','in_progress','done','cancelled')),
  scheduled_date text,
  scheduled_time text,
  review_requested boolean not null default false,
  review_required boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id text primary key,
  appointment_id text references public.appointments(id) on delete set null,
  name text not null,
  model text,
  rating integer not null check(rating between 1 and 5),
  review text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.before_after (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  before_url text not null,
  after_url text not null,
  video_url text,
  gallery jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  year integer,
  image_url text not null,
  description text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.site_health (
  id integer primary key,
  checked_at timestamptz not null default now()
);
insert into public.site_health(id) values(1) on conflict(id) do nothing;

alter table public.services enable row level security;
alter table public.inventory enable row level security;
alter table public.appointments enable row level security;
alter table public.reviews enable row level security;
alter table public.before_after enable row level security;
alter table public.credentials enable row level security;
alter table public.site_health enable row level security;


-- Seed the complete workshop service catalogue. Safe to run repeatedly.
insert into public.services (name,active) values ('Oil & Filter Service',true),('Engine Oil & Fluid Check',true),('Benz Servicing',true),('Brake Inspection',true),('Brake Pad Replacement',true),('Brake Disc / Rotor Replacement',true),('Brake Fluid Flush',true),('ABS / ESP / SBC Repair',true),('Tyre Replacement',true),('Wheel Balancing',true),('Wheel Alignment',true),('Battery Testing & Replacement',true),('Alternator & Charging Repair',true),('Starter Motor Repair',true),('Battery Drain Diagnosis',true),('Engine Repair',true),('Engine Overhaul / Rebuild',true),('Timing Chain Inspection & Repair',true),('Timing Belt Service',true),('Spark Plug Replacement',true),('Ignition Coil Replacement',true),('Fuel System Repair',true),('Fuel Injector Service',true),('Fuel Pump Repair',true),('Cooling System Service',true),('Radiator Repair / Replacement',true),('Water Pump Replacement',true),('Thermostat Replacement',true),('Coolant Flush',true),('Automatic Transmission Service',true),('Transmission Fluid & Filter Service',true),('Transmission Repair / Rebuild',true),('Gearbox Mount Replacement',true),('Driveshaft / Propeller Shaft Repair',true),('Differential Service & Repair',true),('Transfer Case Service',true),('Clutch Service',true),('AIRMATIC Diagnosis & Repair',true),('Air Suspension Compressor Repair',true),('Air Suspension Leak Repair',true),('Shock Absorber Replacement',true),('Control Arm / Bush Replacement',true),('Steering System Repair',true),('Power Steering Service',true),('Wheel Bearing Replacement',true),('Air Conditioning Service',true),('AC Gas Recharge',true),('AC Compressor Repair',true),('Climate Control Repair',true),('Electrical System Repair',true),('Wiring & CAN-Bus Diagnosis',true),('ECU Coding & Programming',true),('Key / Immobiliser Diagnosis',true),('Window / Central Lock Repair',true),('Lighting & Headlamp Repair',true),('Parking Sensor / Camera Repair',true),('MBUX / Infotainment Repair',true),('Software / Module Updates',true),('Airbag / SRS Repair',true),('AdBlue / Emissions System Repair',true),('DPF / Exhaust System Repair',true),('Turbocharger Repair',true),('Hybrid / EV System Inspection',true),('Pre-Purchase Inspection',true),('Roadworthiness Inspection',true),('Accident / Collision Repair',true),('Paint & Panel Repair',true),('Paint Correction & Polishing',true),('Ceramic Coating',true),('Interior Detailing',true),('Exterior Detailing',true),('Headlight Restoration',true),('Windshield / Glass Replacement',true),('Benz Diagnosing',true),('Benz Diagnosing — Full Vehicle Scan',true),('Benz Diagnosing — Engine Management',true),('Benz Diagnosing — Transmission & Gearbox',true),('Benz Diagnosing — ABS / ESP / SBC',true),('Benz Diagnosing — AIRMATIC / Air Suspension',true),('Benz Diagnosing — Electrical & Battery',true),('Benz Diagnosing — CAN-Bus / Communication',true),('Benz Diagnosing — Air Conditioning / Climate',true),('Benz Diagnosing — MBUX / Infotainment',true),('Benz Diagnosing — Airbag / SRS',true),('Benz Diagnosing — AdBlue / Emissions',true),('Benz Diagnosing — Starting / No-Start',true),('Benz Diagnosing — Turbo / Boost System',true),('Benz Diagnosing — Cooling System',true),('Benz Diagnosing — Steering & Suspension',true),('Benz Diagnosing — Hybrid / EV System',true),('Benz Diagnosing — Pre-Purchase',true),('Benz Diagnosing — Road Test',true),('Other',true) on conflict (name) do nothing;

-- Public reads.
drop policy if exists "public read active services" on public.services;
create policy "public read active services" on public.services for select to anon, authenticated using(active=true);

drop policy if exists "public read active inventory" on public.inventory;
create policy "public read active inventory" on public.inventory for select to anon, authenticated using(active=true);

drop policy if exists "public read active repair stories" on public.before_after;
create policy "public read active repair stories" on public.before_after for select to anon, authenticated using(active=true);

drop policy if exists "public read approved reviews" on public.reviews;
create policy "public read approved reviews" on public.reviews for select to anon, authenticated using(approved=true);

drop policy if exists "public read active credentials" on public.credentials;
create policy "public read active credentials" on public.credentials for select to anon, authenticated using(active=true);

drop policy if exists "public health read" on public.site_health;
create policy "public health read" on public.site_health for select to anon, authenticated using(true);

-- Public inserts needed by the customer-facing forms.
drop policy if exists "public create appointment" on public.appointments;
create policy "public create appointment" on public.appointments for insert to anon, authenticated with check(true);

drop policy if exists "public create review" on public.reviews;
create policy "public create review" on public.reviews for insert to anon, authenticated with check(true);

-- Admin portal: this project intentionally has no customer signup. The only intended
-- authenticated account is the workshop admin. Keep the Supabase Auth account private.
-- If you later create more authenticated users, replace these broad authenticated policies
-- with an admin-user table + auth.uid() policy.
drop policy if exists "authenticated manage services" on public.services;
create policy "authenticated manage services" on public.services for all to authenticated using(true) with check(true);
drop policy if exists "authenticated manage inventory" on public.inventory;
create policy "authenticated manage inventory" on public.inventory for all to authenticated using(true) with check(true);
drop policy if exists "authenticated manage appointments" on public.appointments;
create policy "authenticated manage appointments" on public.appointments for all to authenticated using(true) with check(true);
drop policy if exists "authenticated manage reviews" on public.reviews;
create policy "authenticated manage reviews" on public.reviews for all to authenticated using(true) with check(true);
drop policy if exists "authenticated manage repair stories" on public.before_after;
create policy "authenticated manage repair stories" on public.before_after for all to authenticated using(true) with check(true);
drop policy if exists "authenticated manage credentials" on public.credentials;
create policy "authenticated manage credentials" on public.credentials for all to authenticated using(true) with check(true);
