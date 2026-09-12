-- Moses Benz Auto Care: public interaction safety patch
-- Safe to run after the existing schema/update SQL.

begin;

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
create policy "public read approved blog comments" on public.blog_comments
for select to anon, authenticated using (approved=true);

drop policy if exists "public create blog comments" on public.blog_comments;
create policy "public create blog comments" on public.blog_comments
for insert to anon, authenticated with check (
  approved=true
  and length(trim(name)) between 1 and 80
  and length(trim(comment)) between 1 and 2000
);

grant select,insert on public.blog_comments to anon,authenticated;

grant select on public.reviews to anon,authenticated;
grant insert on public.reviews to anon,authenticated;

commit;
