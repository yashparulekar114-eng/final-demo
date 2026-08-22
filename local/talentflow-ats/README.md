# TalentFlow ATS (local)

All landing-page source for this project lives in this folder. Run it on your computer — not on the cloud VM.

## Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- lucide-react

## Files

- `app/page.tsx` — home / landing page
- `app/layout.tsx` — root layout and metadata
- `app/globals.css` — Tailwind styles
- `public/` — static assets

## Run locally

```bash
cd local/talentflow-ats
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser (this only works on the same machine where you ran `npm run dev`).
