begin;
alter table public.inventory add column if not exists brand text not null default 'Mercedes-Benz';
alter table public.appointments add column if not exists location text not null default '';
create table if not exists public.blog_posts (id uuid primary key default gen_random_uuid(),slug text not null unique,title text not null,category text not null default 'Car Care',excerpt text not null default '',content text not null default '',image_url text not null default '',author text not null default 'Moses Benz Auto Care',published boolean not null default true,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
alter table public.blog_posts enable row level security;
drop policy if exists "public read published blog" on public.blog_posts;
create policy "public read published blog" on public.blog_posts for select to anon, authenticated using(published=true);
grant usage on schema public to anon, authenticated;
grant select on public.services,public.inventory,public.reviews,public.before_after,public.credentials,public.blog_posts to anon,authenticated;
grant insert on public.appointments,public.reviews to anon,authenticated;
commit;

-- Seed the initial 10 blog posts. Safe to run repeatedly.
insert into public.blog_posts (slug,title,category,excerpt,content,image_url,author,published) values
('how-to-keep-your-mercedes-benz-healthy-in-lagos','How to Keep Your Mercedes-Benz Healthy in Lagos','Mercedes-Benz Maintenance','Simple maintenance habits that help a Mercedes-Benz handle traffic, heat, dust and stop-start driving.','Start with the basics: follow the correct service intervals, check fluids regularly and pay attention to new sounds or warning lights. Lagos driving can mean long idling and repeated short trips, so routine checks matter. A small leak or weak battery can become a much larger problem when ignored.

Keep a record of oil, filters, brake work and major repairs. If the car develops a warning light, do not simply clear the code and continue driving. Proper diagnosis identifies the cause before parts are replaced.

Tyres also deserve attention. Check pressure when the tyres are cold and inspect for uneven wear. Good tyres, healthy brakes and correct alignment make everyday driving safer and more comfortable.','images/workshop-yard.jpg','Moses Benz Auto Care',true),
('what-dashboard-warning-lights-are-trying-to-tell-you','What Dashboard Warning Lights Are Trying to Tell You','Mercedes-Benz Knowledge','A warning light is information, not decoration. Learn when a light means stop, inspect or book a diagnosis.','Modern Mercedes-Benz vehicles monitor many systems. A warning can point to the engine, braking system, air suspension, battery, emissions system or electronics. The correct response depends on the exact warning and the symptoms that accompany it.

A red warning normally deserves immediate attention, especially when the vehicle also feels unsafe, overheats or loses power. Yellow or amber warnings still deserve investigation rather than repeated resets.

If the warning returns after being cleared, proper diagnostic work is more useful than guessing. Save the message shown on the dashboard and tell the technician what the car was doing when it appeared.','images/workshop-technicians.jpg','Moses Benz Auto Care',true),
('why-short-trips-can-be-hard-on-your-car','Why Short Trips Can Be Hard on Your Car','Car Care','Repeated short journeys can prevent your vehicle from reaching normal operating conditions. Here is what owners should watch.','A car that is driven only for short trips may spend much of its time warming up. Fluids, engine temperature, battery charging and emissions systems may not get the same conditions they would during a longer drive.

That does not mean every short trip is harmful, but it does mean maintenance should not be neglected. Give the vehicle an occasional proper drive when safe and appropriate, and follow the manufacturer maintenance schedule.

If you notice rough starting, battery weakness, unusual fuel consumption or repeated warning lights, have the vehicle checked instead of waiting for the next service date.','images/street-cars.jpg','Moses Benz Auto Care',true),
('what-to-check-before-buying-a-used-mercedes-benz','What to Check Before Buying a Used Mercedes-Benz','Buying Guide','A used Mercedes can be a great purchase when the history and condition make sense. Here is a practical starting checklist.','Start with documentation and history. Confirm the model, year and ownership information, then inspect the body for inconsistent paint, panel gaps and accident repairs.

Next, check the mechanical condition: engine leaks, cooling system, transmission behaviour, brakes, suspension and tyres. A diagnostic scan should be part of the inspection, but a scan alone is not a complete inspection.

Finally, drive the vehicle. Listen for unusual noises, feel how the gearbox shifts and watch for warning lights. A pre-purchase inspection can help you understand the cost of ownership before money changes hands.','images/workshop-yard.jpg','Moses Benz Auto Care',true),
('when-should-you-check-your-brake-system','When Should You Check Your Brake System?','Mercedes-Benz Maintenance','Brake noise, vibration, pulling and a change in pedal feel should never be ignored.','Brake components wear with use, and city traffic can increase the number of braking events. Listen for new squeals or grinding, and pay attention to vibration through the steering wheel or pedal.

Brake inspection should include pads, discs, fluid and the wider braking system. On Mercedes-Benz vehicles, electronic braking and stability systems can also produce warning messages that need proper diagnosis.

If braking performance changes suddenly, treat it as urgent. A workshop can identify whether the issue is simple wear or a deeper hydraulic, electronic or suspension-related problem.','images/workshop-technicians.jpg','Moses Benz Auto Care',true),
('how-to-look-after-your-car-battery','How to Look After Your Car Battery','Car Care','A weak battery can cause a surprising number of electrical symptoms. These habits can help you catch problems early.','Modern vehicles depend heavily on stable electrical power. A battery that is approaching the end of its life can cause slow starting, strange warning messages or intermittent electrical faults.

Keep battery terminals clean and have charging voltage checked when you notice starting changes. If the vehicle sits for long periods, ask about the correct maintenance approach rather than repeatedly jump-starting it.

When a battery is replaced, the vehicle may also require system checks or registration depending on its model and equipment. The correct procedure is better than treating every battery replacement as identical.','images/landmark-fuel-station.jpg','Moses Benz Auto Care',true),
('understanding-airmatic-suspension-symptoms','Understanding AIRMATIC Suspension Symptoms','Mercedes-Benz Knowledge','A Mercedes-Benz with AIRMATIC can be exceptionally comfortable. It can also tell you clearly when something in the system needs attention.','AIRMATIC problems can show up as one corner sitting low, slow height changes, a compressor that runs too often or a warning on the dashboard. Common causes include leaks, compressors, valve blocks, sensors and related control issues.

Do not assume that replacing the compressor will solve every suspension problem. A proper inspection looks for the reason the system lost pressure or failed to maintain the correct ride height.

If the car drops overnight or the compressor keeps running, arrange a diagnosis before the issue causes additional wear.','images/workshop-yard.jpg','Moses Benz Auto Care',true),
('why-correct-engine-oil-matters','Why Correct Engine Oil Matters','Car Care','Oil is not simply oil. The right specification matters for modern engines and their service requirements.','Engine oil lubricates moving components, helps manage heat and carries contaminants toward the filter. The wrong specification or a poor-quality product can undermine the protection the engine was designed to receive.

Use the specification recommended for your exact engine and service requirement. Do not rely only on viscosity numbers or a generic claim that an oil is suitable for every vehicle.

During an oil service, check for leaks and inspect the old oil and filter for signs that may justify further investigation.','images/workshop-technicians.jpg','Moses Benz Auto Care',true),
('simple-tyre-checks-every-driver-can-do','Simple Tyre Checks Every Driver Can Do','Car Care','Tyres are the only part of your vehicle touching the road. A few minutes of inspection can reveal problems early.','Check tyre pressure regularly and use the vehicle-recommended pressure rather than guessing. Inspect tread for uneven wear, cuts, bulges and objects embedded in the tyre.

Uneven wear can be a clue to alignment, suspension or inflation problems. Replacing tyres without addressing the underlying cause may simply repeat the problem.

Also remember the spare tyre or emergency equipment. A good main set of tyres does not help much if the emergency wheel is flat when you need it.','images/street-cars.jpg','Moses Benz Auto Care',true),
('why-diagnosis-should-come-before-parts','Why Diagnosis Should Come Before Parts','Mercedes-Benz Knowledge','Replacing parts until a warning disappears is expensive. Diagnosis is about finding the cause first.','Modern Mercedes-Benz vehicles contain many interconnected control modules. One symptom can have several possible causes, and one faulty component can create symptoms somewhere else.

A proper diagnosis combines fault codes with live information, physical inspection and the customer''s description of what happened. A code is a clue, not automatically a command to replace a part.

The goal is simple: identify the cause, explain it clearly and then repair what actually needs repairing.','images/workshop-technicians.jpg','Moses Benz Auto Care',true)
on conflict (slug) do nothing;

-- Custom admin blog operations for the simple admin_users/password setup.
create or replace function public.admin_blog_list(p_username text,p_password text)
returns setof public.blog_posts
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  return query select * from public.blog_posts order by created_at desc;
end;
$$;

create or replace function public.admin_blog_create(p_username text,p_password text,p_slug text,p_title text,p_category text,p_excerpt text,p_content text,p_image_url text,p_published boolean default true)
returns public.blog_posts
language plpgsql security definer set search_path=public
as $$
declare result public.blog_posts;
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  insert into public.blog_posts(slug,title,category,excerpt,content,image_url,author,published) values(p_slug,p_title,p_category,p_excerpt,p_content,coalesce(p_image_url,''),'Moses Benz Auto Care',coalesce(p_published,true)) returning * into result;
  return result;
end;
$$;

create or replace function public.admin_blog_delete(p_username text,p_password text,p_id uuid)
returns boolean
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  delete from public.blog_posts where id=p_id;
  return found;
end;
$$;

grant execute on function public.admin_blog_list(text,text) to anon,authenticated;
grant execute on function public.admin_blog_create(text,text,text,text,text,text,text,text,boolean) to anon,authenticated;
grant execute on function public.admin_blog_delete(text,text,uuid) to anon,authenticated;

-- Admin appointment operations for the custom admin_users login.
create or replace function public.admin_appointments_list(p_username text,p_password text)
returns setof public.appointments
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then raise exception 'Invalid admin credentials'; end if;
  return query select * from public.appointments order by created_at desc;
end;
$$;

create or replace function public.admin_appointment_status(p_username text,p_password text,p_id text,p_status text)
returns boolean
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then raise exception 'Invalid admin credentials'; end if;
  update public.appointments set status=p_status where id=p_id;
  return found;
end;
$$;

create or replace function public.admin_appointment_schedule(p_username text,p_password text,p_id text,p_date text,p_time text)
returns boolean
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then raise exception 'Invalid admin credentials'; end if;
  update public.appointments set scheduled_date=p_date,scheduled_time=p_time,status='confirmed' where id=p_id;
  return found;
end;
$$;

create or replace function public.admin_appointment_delete(p_username text,p_password text,p_id text)
returns boolean
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then raise exception 'Invalid admin credentials'; end if;
  delete from public.appointments where id=p_id;
  return found;
end;
$$;

grant execute on function public.admin_appointments_list(text,text) to anon,authenticated;
grant execute on function public.admin_appointment_status(text,text,text,text) to anon,authenticated;
grant execute on function public.admin_appointment_schedule(text,text,text,text,text) to anon,authenticated;
grant execute on function public.admin_appointment_delete(text,text,text) to anon,authenticated;
