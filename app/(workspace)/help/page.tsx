import { auth } from "@clerk/nextjs/server";

export default async function HelpPage() {
  await auth.protect();
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Help</h1>
      <div className="card-quiet p-6 space-y-3 text-sm leading-relaxed text-slate-700">
        <p>Post jobs from Jobs or the Create Job button. Candidates apply from a job page with a PDF.</p>
        <p>Schedule interviews from Interviews using live applications on jobs you posted.</p>
        <p>Pipeline board on Applications is interactive in this browser session.</p>
      </div>
    </div>
  );
}
