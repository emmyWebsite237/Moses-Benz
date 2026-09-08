-- Secure admin membership: passwords remain only in Supabase Auth.
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  username text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists admin_users_self_read on public.admin_users;
create policy admin_users_self_read
on public.admin_users for select
to authenticated
using (auth.uid() = user_id);

-- After creating the Auth user, run:
-- insert into public.admin_users (user_id, username)
-- values ('AUTH-USER-UUID', 'YOUR-USERNAME');
