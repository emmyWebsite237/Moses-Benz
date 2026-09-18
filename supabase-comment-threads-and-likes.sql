-- Moses Benz Auto Care: comment likes + threaded replies (admin + public)
-- Run this once in the Supabase SQL editor after supabase-site-settings-and-blog-comments.sql
begin;

alter table public.blog_comments add column if not exists likes integer not null default 0;

create table if not exists public.blog_comment_replies (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references public.blog_comments(id) on delete cascade,
  name text not null,
  reply text not null,
  is_admin boolean not null default false,
  approved boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists blog_comment_replies_comment_idx on public.blog_comment_replies(comment_id,is_admin,created_at);

alter table public.blog_comment_replies enable row level security;
drop policy if exists "public read approved replies" on public.blog_comment_replies;
drop policy if exists "public create replies" on public.blog_comment_replies;
create policy "public read approved replies" on public.blog_comment_replies
for select to anon, authenticated using (approved=true);
create policy "public create replies" on public.blog_comment_replies
for insert to anon, authenticated with check (
  is_admin=false and approved=true
  and length(trim(name)) between 1 and 80
  and length(trim(reply)) between 1 and 2000
);
grant select,insert on public.blog_comment_replies to anon,authenticated;

-- Public: like a comment (no login required, no dedupe — one tap adds one like)
create or replace function public.blog_comment_like(p_id uuid)
returns integer
language plpgsql security definer set search_path=public
as $$
declare new_count integer;
begin
  update public.blog_comments set likes=likes+1 where id=p_id returning likes into new_count;
  if new_count is null then raise exception 'Comment not found'; end if;
  return new_count;
end;
$$;
grant execute on function public.blog_comment_like(uuid) to anon,authenticated;

-- Admin: reply to a comment (creates a threaded, admin-flagged reply row)
create or replace function public.admin_blog_comment_reply_add(p_username text,p_password text,p_comment_id uuid,p_reply text)
returns public.blog_comment_replies
language plpgsql security definer set search_path=public
as $$
declare result public.blog_comment_replies;
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  insert into public.blog_comment_replies(comment_id,name,reply,is_admin,approved)
  values (p_comment_id,'Moses Benz Auto Care',trim(coalesce(p_reply,'')),true,true)
  returning * into result;
  return result;
end;
$$;
grant execute on function public.admin_blog_comment_reply_add(text,text,uuid,text) to anon,authenticated;

-- Admin: delete any reply (their own admin reply or a public one)
create or replace function public.admin_blog_reply_delete(p_username text,p_password text,p_id uuid)
returns boolean
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  delete from public.blog_comment_replies where id=p_id;
  return found;
end;
$$;
grant execute on function public.admin_blog_reply_delete(text,text,uuid) to anon,authenticated;

-- Admin: list every reply (joined client-side against admin_blog_comments_list)
create or replace function public.admin_blog_comment_replies_list(p_username text,p_password text)
returns setof public.blog_comment_replies
language plpgsql security definer set search_path=public
as $$
begin
  if not exists(select 1 from public.admin_users where username=trim(p_username) and password=p_password) then
    raise exception 'Invalid admin credentials';
  end if;
  return query select * from public.blog_comment_replies order by comment_id, is_admin desc, created_at asc;
end;
$$;
grant execute on function public.admin_blog_comment_replies_list(text,text) to anon,authenticated;

commit;
