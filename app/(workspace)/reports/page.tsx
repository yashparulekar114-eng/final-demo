import { auth } from "@clerk/nextjs/server";
import { applicationTrend, funnelCounts, mockJobs, PIPELINE_STAGES } from "@/lib/ats-data";
import { MiniChart } from "../../components/ui";

export default async function ReportsPage() {
  await auth.protect();
  const max = funnelCounts.Applied;

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="text-sm text-muted mt-1">Funnel health, velocity, and source quality.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <article className="card-quiet p-5">
          <h2 className="text-sm font-semibold">Applications per day</h2>
          <MiniChart values={applicationTrend} kind="bar" />
        </article>
        <article className="card-quiet p-5">
          <h2 className="text-sm font-semibold">Hiring funnel conversion</h2>
          <ul className="mt-4 space-y-3">
            {PIPELINE_STAGES.map((s, i) => {
              const prev = i === 0 ? max : funnelCounts[PIPELINE_STAGES[i - 1]];
              const count = funnelCounts[s];
              const conv = prev ? Math.round((count / prev) * 100) : 0;
              return (
                <li key={s} className="flex justify-between text-sm">
                  <span>{s}</span>
                  <span className="text-muted">
                    {count} · {conv}% from previous
                  </span>
                </li>
              );
            })}
          </ul>
        </article>
        <article className="card-quiet p-5">
          <h2 className="text-sm font-semibold">Time to hire</h2>
          <p className="mt-4 text-3xl font-semibold tracking-tight">28 days</p>
          <p className="mt-1 text-sm text-muted">Median, last 90 days · −4 days vs prior quarter</p>
        </article>
        <article className="card-quiet p-5">
          <h2 className="text-sm font-semibold">Source effectiveness</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["LinkedIn", "38% of onsites"],
              ["Referral", "2.1× hire rate"],
              ["Careers page", "22% of apps"],
              ["Agency", "Highest cost per hire"],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span>{k}</span>
                <span className="text-muted">{v}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="card-quiet p-5">
          <h2 className="text-sm font-semibold">Candidate quality</h2>
          <p className="mt-4 text-3xl font-semibold tracking-tight">81</p>
          <p className="mt-1 text-sm text-muted">Average ATS match on onsites</p>
        </article>
        <article className="card-quiet p-5">
          <h2 className="text-sm font-semibold">Hiring velocity</h2>
          <p className="mt-4 text-3xl font-semibold tracking-tight">3.2</p>
          <p className="mt-1 text-sm text-muted">Hires / month · Engineering 1.4</p>
        </article>
      </div>

      <article className="card-quiet p-5">
        <h2 className="text-sm font-semibold">Applications per job</h2>
        <ul className="mt-4 divide-y divide-line">
          {mockJobs.map((j) => (
            <li key={j.id} className="py-2.5 flex justify-between text-sm">
              <span>{j.title}</span>
              <span className="text-muted">{j.applicants}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
