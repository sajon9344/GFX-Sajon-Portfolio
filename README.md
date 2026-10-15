# Sajon® — Creative Portfolio

A responsive, animated graphic design portfolio built with Next.js App Router, React, Tailwind CSS v4, Framer Motion and Supabase. Includes a portfolio gallery with filters, project detail modal, contact form API, Supabase database schema, and a protected admin sign-in/dashboard for project CRUD.

## Requirements

- Node.js 20.9+ (recommended)
- A Supabase project for persistent project data, admin authentication and contact submissions

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The public portfolio can render bundled sample projects without Supabase configured. The contact form will show a setup error until Supabase server credentials are configured. The admin dashboard requires Supabase credentials and a configured admin user.

## Supabase setup

1. Create a project at https://supabase.com.
2. In **Project Settings → API**, copy the Project URL and publishable/anon key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Copy the **service_role** key to `SUPABASE_SERVICE_ROLE_KEY`. This key is server-only. Never commit it, expose it in browser code, or prefix it with `NEXT_PUBLIC_`.
4. Open **SQL Editor**, run `supabase/schema.sql`. This creates the `projects` and `contact_messages` tables, RLS policies, and sample projects.
5. In **Authentication → Users**, create an account for your admin email. Then run the following SQL, replacing the email with the exact email you created:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where email = 'you@example.com';
   ```

6. Sign out and sign back in at `/admin` so the refreshed session includes the admin role claim. Only users with `app_metadata.role = admin` can manage projects under the supplied RLS policies.
7. Restart the dev server after changing `.env.local`.

## Features

- Responsive dark luxury UI with purple accents and editorial typography
- Framer Motion entrance, layout and modal animations
- Category filters and interactive project cards
- Project detail modal
- Contact form validation and API endpoint that stores messages in Supabase
- `/admin` sign-in and project create/edit/delete interface
- SQL schema with row-level security
- Sample project content that can be replaced in the admin dashboard
- Reduced-motion accessibility support

## Contact form and email notifications

The contact form stores inquiries in `public.contact_messages`. It does **not** send an email notification out of the box. To receive email alerts, connect an email provider (for example Resend) and add a server-only API call after the database insert. `CONTACT_EMAIL` is a placeholder for that future integration, not an active mailer setting.

## Deployment (Vercel)

1. Push this project to a private or public GitHub repository.
2. Import the repository into https://vercel.com and select the Next.js framework preset.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in Vercel → Project Settings → Environment Variables for Production (and Preview if required).
4. Deploy, then test `/`, `/admin`, project CRUD and the contact form on the deployed URL.
5. In Supabase Authentication URL Configuration, set the production Site URL and add your deployed URL to the Redirect URLs if you later add OAuth or email sign-in flows.
6. Replace the `metadataBase` URL in `app/layout.tsx` with your real domain and update the sample email/social links in `app/page.tsx`.
7. Add your domain in Vercel and follow its DNS instructions.

## Before launch checklist

- Replace sample projects and Unsplash images with your own work and licensed images.
- Replace `hello@sajon.design` and social profile URLs with real links.
- Update the metadata domain and social preview details.
- Configure email notifications if desired.
- Add a privacy notice and consider rate limiting / CAPTCHA for the public contact endpoint.
- Keep `.env.local` out of version control.
