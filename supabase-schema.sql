-- Moses Benz Auto Care: production-ready starting schema.
-- Run in Supabase SQL Editor, then enable the RLS policies you need.

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

create table if not exists public.appointment_slots (
  id uuid primary key default gen_random_uuid(),
  slot_date date not null,
  slot_time time not null,
  capacity integer not null default 1 check (capacity > 0),
  booked integer not null default 0 check (booked >= 0 and booked <= capacity),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  model text not null,
  year integer,
  service text not null,
  slot_id uuid references public.appointment_slots(id),
  registration text,
  message text not null,
  status text not null default 'requested' check (status in ('requested','confirmed','in_progress','done','cancelled')),
  review_requested boolean not null default false,
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

alter table public.services enable row level security;
alter table public.diagnostics enable row level security;
alter table public.appointment_slots enable row level security;
alter table public.appointments enable row level security;
alter table public.reviews enable row level security;

-- Public visitors can read active services/diagnostics/open slots.
create policy "public read active services" on public.services for select using (active = true);
create policy "public read active diagnostics" on public.diagnostics for select using (active = true);
create policy "public read active slots" on public.appointment_slots for select using (active = true);

-- Public appointment/review inserts are intentionally narrow.
create policy "public create appointment" on public.appointments for insert with check (true);
create policy "public create review" on public.reviews for insert with check (true);

-- IMPORTANT: admin write access should be tied to authenticated admin users/roles.
-- Do not add an unrestricted public update/delete policy to appointments or slots.
-- Use Supabase Auth + a private admin role or server-side RPC/Edge Function for those actions.


-- Optional atomic slot reservation. Call this before inserting an appointment in production.
create or replace function public.reserve_appointment_slot(p_slot_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare updated_count integer;
begin
  update public.appointment_slots
     set booked = booked + 1, active = case when booked + 1 >= capacity then false else active end
   where id = p_slot_id and active = true and booked < capacity;
  get diagnostics updated_count = row_count;
  return updated_count = 1;
end;
$$;

revoke all on function public.reserve_appointment_slot(uuid) from public;
grant execute on function public.reserve_appointment_slot(uuid) to anon, authenticated;
