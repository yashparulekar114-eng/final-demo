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
- Job details / apply: `/jobs/[id]`

## Database (Supabase)

Run `database-schema.sql` in the SQL Editor whenever it changes. It creates:

- `jobs`
- `applications` (including `resume_url`)
- public Storage bucket `resumes`

If you skip this, posting jobs, applying, or uploading a PDF will fail.

## Email (Resend)

Add to `.env.local`:

```
RESEND_API_KEY=re_your_copied_key_here
RESEND_TO_EMAIL=the_email_you_used_to_sign_up_at_resend.com
```

Free-tier Resend only delivers to that signup address. From address is `onboarding@resend.dev`. After a successful apply, we send **Application Received**.
