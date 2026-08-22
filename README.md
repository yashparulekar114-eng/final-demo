# TalentFlow ATS

Applicant tracking system starter (Next.js App Router). Recruiters post jobs and review resumes; candidates search roles and upload resumes.

## Auth (Clerk)

Copy `.env.example` to `.env.local` and add your Clerk keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Never commit `.env.local`.

## Run locally

From the repo root:

```bash
npm install
npm run dev
```

Or from the standalone copy in **`local/talentflow-ats`**:

```bash
cd local/talentflow-ats
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on the same computer.

- Sign in: `/sign-in`
- Sign up as recruiter: `/sign-up?role=recruiter`
- Sign up as candidate: `/sign-up?role=candidate`
- Dashboard (signed in): `/dashboard`
- Browse jobs: `/jobs`
- Post a job (signed in): `/jobs/new`

## Database (Supabase)

The `jobs` table does **not** exist until you run the schema.

1. Open [Supabase](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste `database-schema.sql` and click **Run**

If you skip this, posting and listing jobs will fail (`PGRST205`).`
