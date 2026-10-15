-- Run this file in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Brand Identity',
  year text not null default extract(year from now())::text,
  description text not null default '',
  image_url text not null,
  accent text not null default '#a88bff',
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 99,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project text not null default 'Something else',
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;

-- Anyone may view published projects. Writes require an admin app_metadata claim.
drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public" on public.projects for select using (published = true);
drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects" on public.projects for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- No public read/write policy on contact_messages. The server route inserts with service role.
-- Never expose SUPABASE_SERVICE_ROLE_KEY in client code or NEXT_PUBLIC variables.

-- Optional seed rows. The app uses its bundled sample projects until you add your own rows.
insert into public.projects (title, category, year, description, image_url, accent, featured, published, sort_order)
values
('Solis Royal','Brand Identity','2026','A considered identity for a Mediterranean hospitality destination.','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85','#d8c5a7',true,true,1),
('Elora Organics','Packaging Design','2026','Earth-led packaging built around clarity, texture and calm.','https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=85','#a5b59a',true,true,2),
('Afterhours','Campaign Design','2025','A high-energy visual system for nights that move differently.','https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85','#a58bff',false,true,3),
('FORM Objects','Art Direction','2025','A sculptural campaign exploring everyday objects and form.','https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=85','#c8c5bf',false,true,4),
('Valos Motion','Brand Identity','2025','A confident, kinetic identity for a new mobility generation.','https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1400&q=85','#d4ff59',false,true,5),
('Mono Studio','Digital Design','2024','A digital-first identity with a strong typographic point of view.','https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=85','#b7a1ff',false,true,6)
on conflict do nothing;
