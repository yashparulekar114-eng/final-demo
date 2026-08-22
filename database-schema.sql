-- TalentFlow ATS schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query → Run).
-- Required before posting or listing jobs.

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  recruiter_id text not null,
  status text not null default 'Open',
  created_at timestamptz not null default now(),
  constraint jobs_status_check check (status in ('Open', 'Closed', 'Draft'))
);

create index if not exists jobs_status_idx on public.jobs (status);
create index if not exists jobs_recruiter_id_idx on public.jobs (recruiter_id);

alter table public.jobs enable row level security;

drop policy if exists "Anyone can read open jobs" on public.jobs;
create policy "Anyone can read open jobs"
  on public.jobs
  for select
  using (status = 'Open');

-- Clerk is not the same as Supabase Auth, so inserts use the anon key from the server.
-- Tighten this after Clerk JWTs are wired into Supabase.
drop policy if exists "Anyone can insert jobs" on public.jobs;
create policy "Anyone can insert jobs"
  on public.jobs
  for insert
  with check (true);

-- Applications
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  candidate_id text not null,
  status text not null default 'Applied',
  created_at timestamptz not null default now(),
  constraint applications_status_check check (status in ('Applied', 'Interviewing', 'Rejected', 'Hired')),
  constraint applications_job_candidate_unique unique (job_id, candidate_id)
);

create index if not exists applications_job_id_idx on public.applications (job_id);
create index if not exists applications_candidate_id_idx on public.applications (candidate_id);

alter table public.applications enable row level security;

drop policy if exists "Anyone can read applications" on public.applications;
create policy "Anyone can read applications"
  on public.applications
  for select
  using (true);

drop policy if exists "Anyone can insert applications" on public.applications;
create policy "Anyone can insert applications"
  on public.applications
  for insert
  with check (true);

alter table public.applications add column if not exists resume_url text;

drop policy if exists "Anyone can update applications" on public.applications;
create policy "Anyone can update applications"
  on public.applications
  for update
  using (true)
  with check (true);

-- Public resumes storage bucket (run in SQL Editor)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resumes', 'resumes', true, 5242880, array['application/pdf']::text[])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read resumes" on storage.objects;
create policy "Public read resumes"
  on storage.objects
  for select
  using (bucket_id = 'resumes');

drop policy if exists "Anyone can upload resumes" on storage.objects;
create policy "Anyone can upload resumes"
  on storage.objects
  for insert
  with check (bucket_id = 'resumes');

-- Interviews (one scheduled meeting per application)
create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  scheduled_time timestamptz not null,
  link text not null,
  status text not null default 'Scheduled',
  created_at timestamptz not null default now(),
  constraint interviews_status_check check (status in ('Scheduled', 'Completed', 'Cancelled')),
  constraint interviews_application_unique unique (application_id)
);

create index if not exists interviews_application_id_idx on public.interviews (application_id);

alter table public.interviews enable row level security;

drop policy if exists "Anyone can read interviews" on public.interviews;
create policy "Anyone can read interviews"
  on public.interviews
  for select
  using (true);

drop policy if exists "Anyone can insert interviews" on public.interviews;
create policy "Anyone can insert interviews"
  on public.interviews
  for insert
  with check (true);

drop policy if exists "Anyone can update interviews" on public.interviews;
create policy "Anyone can update interviews"
  on public.interviews
  for update
  using (true)
  with check (true);
