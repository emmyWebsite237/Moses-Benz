-- Moses Benz Auto Care — production starting schema.
-- This version intentionally has NO preferred date/time on the customer request.
-- Admin decides the actual appointment time after reviewing the request.

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null unique,
  description text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  model text not null,
  year integer,
  service text not null,
  registration text,
  message text not null,
  status text not null default 'requested' check (status in ('requested','confirmed','in_progress','done','cancelled')),
  scheduled_date text,
  scheduled_time text,
  review_requested boolean not null default false,
  review_required boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id),
  name text not null,
  model text,
  rating integer not null check (rating between 1 and 5),
  review text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.before_after (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  before_url text not null,
  after_url text not null,
  video_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;
alter table public.diagnostics enable row level security;
alter table public.appointments enable row level security;
alter table public.reviews enable row level security;
alter table public.before_after enable row level security;

create policy "public read active services" on public.services for select using (active = true);
create policy "public read active diagnostics" on public.diagnostics for select using (active = true);
create policy "public read active repair stories" on public.before_after for select using (active = true);
create policy "public create appointment" on public.appointments for insert with check (true);
create policy "public create review" on public.reviews for insert with check (true);

-- IMPORTANT:
-- Do NOT create public update/delete policies for appointments, services, diagnostics,
-- inventory or repair stories. Admin writes should be protected by Supabase Auth + RLS,
-- or by a server-side Vercel/Edge Function using a secret key.
