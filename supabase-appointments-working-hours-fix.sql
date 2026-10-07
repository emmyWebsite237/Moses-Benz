-- Moses Benz Auto Care: appointment persistence + working-hours controls.
-- Run this once in Supabase SQL Editor after the existing Moses Benz schema.
begin;

alter table public.site_settings
  add column if not exists working_hours jsonb not null default '{"mon":{"open":true,"start":"08:00","end":"19:00"},"tue":{"open":true,"start":"08:00","end":"19:00"},"wed":{"open":true,"start":"08:00","end":"19:00"},"thu":{"open":true,"start":"08:00","end":"19:00"},"fri":{"open":true,"start":"08:00","end":"19:00"},"sat":{"open":true,"start":"08:00","end":"15:00"},"sun":{"open":false,"start":"08:00","end":"15:00"}}'::jsonb;

create or replace function public.create_appointment(
  p_id text,p_name text,p_email text,p_phone text,p_model text,p_year integer,
  p_service text,p_registration text,p_location text,p_message text
)
returns public.appointments
language plpgsql security definer set search_path=public
as $$
declare result public.appointments;
begin
  if length(trim(coalesce(p_name,'')))=0 or length(trim(coalesce(p_email,'')))=0
     or length(trim(coalesce(p_phone,'')))=0 or length(trim(coalesce(p_model,'')))=0
     or length(trim(coalesce(p_location,'')))=0 or length(trim(coalesce(p_message,'')))=0 then
    raise exception 'Please complete all required appointment fields.';
  end if;
  insert into public.appointments(id,name,email,phone,model,year,service,registration,location,message,status)
  values(trim(p_id),trim(p_name),trim(p_email),trim(p_phone),trim(p_model),p_year,trim(coalesce(p_service,'Appointment Request')),nullif(trim(coalesce(p_registration,'')),''),trim(p_location),trim(p_message),'requested')
  returning * into result;
  return result;
end;
$$;

grant execute on function public.create_appointment(text,text,text,text,text,integer,text,text,text,text) to anon,authenticated;

create or replace function public.admin_appointments_list(p_username text,p_password text)
returns setof public.appointments
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  return query select * from public.appointments order by created_at desc;
end;
$$;

grant execute on function public.admin_appointments_list(text,text) to anon,authenticated;

create or replace function public.admin_site_settings_get(p_username text,p_password text)
returns setof public.site_settings
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  return query select * from public.site_settings where id=1;
end;
$$;

grant execute on function public.admin_site_settings_get(text,text) to anon,authenticated;

create or replace function public.admin_site_settings_update(
  p_username text,p_password text,p_phone text,p_whatsapp text,p_email text,
  p_instagram text,p_facebook text,p_youtube text,p_tiktok text,p_x text,p_working_hours jsonb
)
returns public.site_settings
language plpgsql security definer set search_path=public
as $$
declare result public.site_settings;
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  insert into public.site_settings(id,phone,whatsapp,email,instagram,facebook,youtube,tiktok,x,working_hours,updated_at)
  values(1,trim(coalesce(p_phone,'')),trim(coalesce(p_whatsapp,'')),trim(coalesce(p_email,'')),trim(coalesce(p_instagram,'')),trim(coalesce(p_facebook,'')),trim(coalesce(p_youtube,'')),trim(coalesce(p_tiktok,'')),trim(coalesce(p_x,'')),coalesce(p_working_hours,'{}'::jsonb),now())
  on conflict(id) do update set
    phone=excluded.phone,whatsapp=excluded.whatsapp,email=excluded.email,
    instagram=excluded.instagram,facebook=excluded.facebook,youtube=excluded.youtube,
    tiktok=excluded.tiktok,x=excluded.x,working_hours=excluded.working_hours,updated_at=now()
  returning * into result;
  return result;
end;
$$;

grant execute on function public.admin_site_settings_update(text,text,text,text,text,text,text,text,text,text,jsonb) to anon,authenticated;

commit;
