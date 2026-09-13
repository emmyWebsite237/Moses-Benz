-- Moses Benz Auto Care — editable inventory migration.
-- Run this once in Supabase SQL Editor. Existing static catalogue remains the fallback until this is run.
alter table public.inventory add column if not exists slug text;
alter table public.inventory add column if not exists brand text not null default 'Mercedes-Benz';
create unique index if not exists inventory_slug_unique on public.inventory(slug) where slug is not null;

create or replace function public.admin_inventory_sync_static(p_username text,p_password text)
returns boolean language plpgsql security definer set search_path=public as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password and active=true) then raise exception 'Invalid admin credentials'; end if;
  return true;
end; $$;

create or replace function public.admin_inventory_upsert(
 p_username text,p_password text,p_id text,p_slug text,p_name text,p_year integer,p_price_ngn numeric,p_mileage_km integer,p_spec_tag text,p_status text,p_image_url text,p_description text,p_condition text,p_fuel text,p_transmission text,p_body text,p_drivetrain text,p_engine_size text,p_cylinders text,p_horsepower text,p_color text,p_interior_color text,p_seats text,p_registered text,p_active boolean)
returns boolean language plpgsql security definer set search_path=public as $$
begin
 if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password and active=true) then raise exception 'Invalid admin credentials'; end if;
 insert into public.inventory(id,slug,name,year,price_ngn,mileage_km,spec_tag,status,image_url,description,condition,fuel,transmission,body,drivetrain,engine_size,cylinders,horsepower,color,interior_color,seats,registered,active,brand,updated_at)
 values(trim(p_id),nullif(trim(p_slug),''),trim(p_name),p_year,coalesce(p_price_ngn,0),coalesce(p_mileage_km,0),coalesce(trim(p_spec_tag),''),case when p_status in ('sold','available') then p_status else 'available' end,coalesce(trim(p_image_url),''),coalesce(trim(p_description),''),coalesce(trim(p_condition),''),coalesce(trim(p_fuel),''),coalesce(trim(p_transmission),''),coalesce(trim(p_body),''),coalesce(trim(p_drivetrain),''),coalesce(trim(p_engine_size),''),coalesce(trim(p_cylinders),''),coalesce(trim(p_horsepower),''),coalesce(trim(p_color),''),coalesce(trim(p_interior_color),''),coalesce(trim(p_seats),''),coalesce(trim(p_registered),''),coalesce(p_active,true),'Mercedes-Benz',now())
 on conflict(id) do update set slug=excluded.slug,name=excluded.name,year=excluded.year,price_ngn=excluded.price_ngn,mileage_km=excluded.mileage_km,spec_tag=excluded.spec_tag,status=excluded.status,image_url=excluded.image_url,description=excluded.description,condition=excluded.condition,fuel=excluded.fuel,transmission=excluded.transmission,body=excluded.body,drivetrain=excluded.drivetrain,engine_size=excluded.engine_size,cylinders=excluded.cylinders,horsepower=excluded.horsepower,color=excluded.color,interior_color=excluded.interior_color,seats=excluded.seats,registered=excluded.registered,active=excluded.active,brand='Mercedes-Benz',updated_at=now();
 return true;
end; $$;

create or replace function public.admin_inventory_delete(p_username text,p_password text,p_id text)
returns boolean language plpgsql security definer set search_path=public as $$
begin
 if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password and active=true) then raise exception 'Invalid admin credentials'; end if;
 delete from public.inventory where id=trim(p_id); delete from public.car_visibility where id=trim(p_id); return true;
end; $$;
revoke all on function public.admin_inventory_sync_static(text,text) from public; grant execute on function public.admin_inventory_sync_static(text,text) to anon,authenticated;
revoke all on function public.admin_inventory_upsert(text,text,text,text,text,integer,numeric,integer,text,text,text,text,text,text,text,text,text,text,text,text,text,text,text,boolean) from public; grant execute on function public.admin_inventory_upsert(text,text,text,text,text,integer,numeric,integer,text,text,text,text,text,text,text,text,text,text,text,text,text,text,text,boolean) to anon,authenticated;
revoke all on function public.admin_inventory_delete(text,text,text) from public; grant execute on function public.admin_inventory_delete(text,text,text) to anon,authenticated;
