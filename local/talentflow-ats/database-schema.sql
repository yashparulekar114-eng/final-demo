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
