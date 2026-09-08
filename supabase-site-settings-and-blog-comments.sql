-- Moses Benz Auto Care: site contact/social settings + blog comments
begin;

create table if not exists public.site_settings (
  id integer primary key,
  phone text not null default '',
  whatsapp text not null default '',
  email text not null default '',
  instagram text not null default '',
  facebook text not null default '',
  youtube text not null default '',
  tiktok text not null default '',
  x text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
drop policy if exists "public read site settings" on public.site_settings;
create policy "public read site settings" on public.site_settings
for select to anon, authenticated using (id=1);
grant select on public.site_settings to anon, authenticated;

insert into public.site_settings(id,phone,whatsapp,email,instagram,facebook,youtube,tiktok,x)
values (1,'2349061526267','2348106958638','','','','','','')
on conflict (id) do nothing;

create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  name text not null,
  comment text not null,
  admin_reply text,
  approved boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists blog_comments_post_slug_idx on public.blog_comments(post_slug,created_at);
alter table public.blog_comments enable row level security;
drop policy if exists "public read approved blog comments" on public.blog_comments;
drop policy if exists "public create blog comments" on public.blog_comments;
create policy "public read approved blog comments" on public.blog_comments
for select to anon, authenticated using (approved=true);
create policy "public create blog comments" on public.blog_comments
for insert to anon, authenticated with check (
  approved=true and length(trim(name)) between 1 and 80 and length(trim(comment)) between 1 and 2000
);
grant select,insert on public.blog_comments to anon,authenticated;

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

create or replace function public.admin_site_settings_update(
  p_username text,p_password text,p_phone text,p_whatsapp text,p_email text,
  p_instagram text,p_facebook text,p_youtube text,p_tiktok text,p_x text
)
returns public.site_settings
language plpgsql security definer set search_path=public
as $$
declare result public.site_settings;
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  insert into public.site_settings(id,phone,whatsapp,email,instagram,facebook,youtube,tiktok,x,updated_at)
  values(1,trim(coalesce(p_phone,'')),trim(coalesce(p_whatsapp,'')),trim(coalesce(p_email,'')),
         trim(coalesce(p_instagram,'')),trim(coalesce(p_facebook,'')),trim(coalesce(p_youtube,'')),
         trim(coalesce(p_tiktok,'')),trim(coalesce(p_x,'')),now())
  on conflict(id) do update set
    phone=excluded.phone,whatsapp=excluded.whatsapp,email=excluded.email,
    instagram=excluded.instagram,facebook=excluded.facebook,youtube=excluded.youtube,
    tiktok=excluded.tiktok,x=excluded.x,updated_at=now()
  returning * into result;
  return result;
end;
$$;

create or replace function public.admin_blog_comments_list(p_username text,p_password text)
returns setof public.blog_comments
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  return query select * from public.blog_comments order by created_at desc;
end;
$$;

create or replace function public.admin_blog_comment_reply(p_username text,p_password text,p_id uuid,p_reply text)
returns public.blog_comments
language plpgsql security definer set search_path=public
as $$
declare result public.blog_comments;
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  update public.blog_comments set admin_reply=nullif(trim(coalesce(p_reply,'')),''),updated_at=now()
  where id=p_id returning * into result;
  return result;
end;
$$;

create or replace function public.admin_blog_comment_delete(p_username text,p_password text,p_id uuid)
returns boolean
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  delete from public.blog_comments where id=p_id;
  return found;
end;
$$;

grant execute on function public.admin_site_settings_get(text,text) to anon,authenticated;
grant execute on function public.admin_site_settings_update(text,text,text,text,text,text,text,text,text,text) to anon,authenticated;
grant execute on function public.admin_blog_comments_list(text,text) to anon,authenticated;
grant execute on function public.admin_blog_comment_reply(text,text,uuid,text) to anon,authenticated;
grant execute on function public.admin_blog_comment_delete(text,text,uuid) to anon,authenticated;

commit;
