# TalentFlow ATS (local)

Standalone copy of the Next.js landing page and Clerk auth. Run it on your computer — not on the cloud VM.

## Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- lucide-react
- Clerk (`@clerk/nextjs`)

## Files

- `app/page.tsx` — home / landing page
- `app/layout.tsx` — root layout, metadata, ClerkProvider
- `app/sign-in` / `app/sign-up` — Clerk auth routes
- `app/globals.css` — Tailwind styles
- `public/` — static assets

## Auth

Copy `.env.example` to `.env.local` and add your Clerk keys. Never commit `.env.local`.

## Run locally

```bash
cd local/talentflow-ats
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser (this only works on the same machine where you ran `npm run dev`).
