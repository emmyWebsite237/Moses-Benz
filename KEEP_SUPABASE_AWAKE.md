# Keeping the Supabase project active

Supabase Free projects can be automatically paused after a period of low activity. This project includes a small GitHub Actions workflow that makes one lightweight database request each day.

## One-time setup

In GitHub → Settings → Secrets and variables → Actions, add:

- `SUPABASE_URL` = your project URL
- `SUPABASE_PUBLISHABLE_KEY` = your public/anon key

The workflow calls the `site_health` table once a day. It does not use a service-role key.

This is a practical activity check, not a promise that Supabase will never pause a Free project. Supabase's own policy says Free projects are considered for pausing when they show low activity over a 7-day period, and a few user database requests each day typically keeps a project active. A paid project is the only platform-level guarantee against inactivity pausing.
