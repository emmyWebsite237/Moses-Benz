-- Moses Benz Auto Care: shared visibility only for GitHub-hosted car pages.
-- Vehicle data and photographs are NOT stored in Supabase.
create table if not exists public.car_visibility (
  id text primary key,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.car_visibility enable row level security;

drop policy if exists "Public can read car visibility" on public.car_visibility;
create policy "Public can read car visibility"
on public.car_visibility for select
to anon, authenticated
using (true);

revoke insert, update, delete on public.car_visibility from anon, authenticated;

create or replace function public.admin_car_visibility_set(
  p_username text,
  p_password text,
  p_id text,
  p_active boolean
)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
begin
  if not exists(
    select 1 from public.admin_users
    where username=trim(p_username) and password=p_password and active=true
  ) then
    raise exception 'Invalid admin credentials';
  end if;

  insert into public.car_visibility(id,active,updated_at)
  values(trim(p_id),p_active,now())
  on conflict(id) do update
  set active=excluded.active, updated_at=now();

  return true;
end;
$$;

revoke all on function public.admin_car_visibility_set(text,text,text,boolean) from public;
grant execute on function public.admin_car_visibility_set(text,text,text,boolean) to anon, authenticated;
