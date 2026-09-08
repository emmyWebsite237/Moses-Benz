# Moses Benz Auto Care — Simple Supabase Admin

This version intentionally does NOT use Supabase Authentication.

## 1. Run the SQL

Run `supabase-admin-auth-migration.sql` in the Supabase SQL Editor.

## 2. Create your password hash

Run:

```sql
select encode(digest('YOUR_PASSWORD_HERE', 'sha256'), 'hex');
```

Copy the returned hash.

## 3. Create the admin

```sql
insert into public.admin_users (username, password)
values ('YOUR_USERNAME', 'PASTE_HASH_HERE');
```

The `password` column contains the one-way hash, not the plaintext password.

## 4. Configure the site

`js/supabase-config.js` needs only your Supabase project URL and public anon/publishable key.

Do NOT put a service-role/secret key in browser JavaScript.

## Login

Open:

`/mbac-control-7x4k9`

Enter your username and password.

The database verifies the credentials through `verify_admin_login`; the admin table itself is not readable by the browser.
