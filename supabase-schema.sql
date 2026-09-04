-- Moses Benz Auto Care — Supabase schema for the HTML build.
-- Customer account data is handled by Supabase Auth.
-- IMPORTANT: the browser must only ever contain the publishable/anon key.
-- Never place the service-role/secret key in this static site.

create extension if not exists pgcrypto;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(), name text not null unique,
  active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.diagnostics (
  id uuid primary key default gen_random_uuid(), code text not null unique, name text not null unique,
  description text not null default '', active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text not null,
  model text not null, year integer, service text not null, registration text, message text not null,
  status text not null default 'requested' check(status in ('requested','confirmed','in_progress','done','cancelled')),
  scheduled_date text, scheduled_time text, review_requested boolean not null default false,
  review_required boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(), appointment_id uuid references public.appointments(id),
  name text not null, model text, rating integer not null check(rating between 1 and 5), review text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.before_after (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '',
  before_url text not null, after_url text not null, video_url text, gallery jsonb not null default '[]'::jsonb, active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.before_after add column if not exists gallery jsonb not null default '[]'::jsonb;

create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(), title text not null, issuer text, year integer,
  image_url text not null, description text not null default '', active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.site_health (
  id integer primary key, checked_at timestamptz not null default now()
);
insert into public.site_health(id) values(1) on conflict(id) do nothing;

alter table public.services enable row level security;
alter table public.diagnostics enable row level security;
alter table public.appointments enable row level security;
alter table public.reviews enable row level security;
alter table public.before_after enable row level security;
alter table public.credentials enable row level security;
alter table public.site_health enable row level security;

drop policy if exists "public read active services" on public.services;
drop policy if exists "public read active diagnostics" on public.diagnostics;
drop policy if exists "public read active repair stories" on public.before_after;
drop policy if exists "public read active credentials" on public.credentials;
drop policy if exists "public create appointment" on public.appointments;
drop policy if exists "public create review" on public.reviews;
drop policy if exists "public health read" on public.site_health;
create policy "public read active services" on public.services for select using(active=true);
create policy "public read active diagnostics" on public.diagnostics for select using(active=true);
create policy "public read active repair stories" on public.before_after for select using(active=true);
create policy "public read active credentials" on public.credentials for select using(active=true);
create policy "public create appointment" on public.appointments for insert with check(true);
create policy "public create review" on public.reviews for insert with check(true);
create policy "public health read" on public.site_health for select using(true);

-- Static-site fallback for workshop content: because this build has no server-side secret,
-- these two INSERT policies let the Admin page publish non-sensitive media metadata.
-- If you later add Supabase Auth for the Admin portal, replace these with authenticated
-- admin-only policies. Do not use a service-role key in the browser.
drop policy if exists "admin publish repair stories" on public.before_after;
drop policy if exists "admin publish credentials" on public.credentials;
create policy "admin publish repair stories" on public.before_after for insert with check(true);
create policy "admin publish credentials" on public.credentials for insert with check(true);

-- The Admin page's local appointment controls remain local until you add a server-side
-- admin API or Supabase Auth + RLS for update/delete operations.
