"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Briefcase, Users, FileInput, Calendar, Gift } from "lucide-react";
import {
  applicationTrend,
  funnelCounts,
  mockCandidates,
  mockInterviews,
  PIPELINE_STAGES,
} from "@/lib/ats-data";
import { Avatar, MiniChart, StatusBadge } from "./ui";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const STATS = [
  { label: "Active Jobs", key: "jobs", change: 12, up: true, icon: Briefcase, fallback: 18 },
  { label: "Total Candidates", key: "cands", change: 8, up: true, icon: Users, fallback: 142 },
  { label: "New Applications", key: "apps", change: 5, up: true, icon: FileInput, fallback: 36 },
  { label: "Interviews This Week", key: "ints", change: 3, up: false, icon: Calendar, fallback: 9 },
  { label: "Offers Sent", key: "offers", change: 1, up: true, icon: Gift, fallback: 4 },
] as const;

export default function DashboardOverview({
  name,
  liveJobs,
  liveApplicants,
  isCandidate,
}: {
  name: string;
  liveJobs: number;
  liveApplicants: number;
  isCandidate: boolean;
}) {
  const values = {
    jobs: liveJobs || STATS[0].fallback,
    cands: STATS[1].fallback,
    apps: liveApplicants || STATS[2].fallback,
    ints: STATS[3].fallback,
    offers: STATS[4].fallback,
  };

  const maxFunnel = funnelCounts.Applied;

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            {greeting()}, {name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {isCandidate
              ? "Track your applications and apply to open roles."
              : "Track your hiring pipeline and post new roles."}
          </p>
        </div>
        {isCandidate ? (
          <Link href="/jobs" className="btn-primary">
            Apply to a job
          </Link>
        ) : (
          <Link href="/jobs/new" className="btn-primary">
            Create Job
          </Link>
        )}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
        {STATS.map((s) => {
          const Icon = s.icon;
          const n =
            s.key === "jobs"
              ? values.jobs
              : s.key === "apps"
                ? values.apps
                : s.fallback;
          return (
            <article key={s.label} className="card-quiet p-4">
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-muted">{s.label}</p>
                <span className="h-8 w-8 rounded-lg bg-indigo-50 text-accent grid place-items-center">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{n}</p>
              <p
                className={`mt-2 text-xs font-medium inline-flex items-center gap-1 ${s.up ? "text-emerald-600" : "text-rose-600"}`}
              >
                {s.up ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {s.change}% vs last month
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <article className="card-quiet p-5 xl:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Applications overview</h2>
            <span className="text-xs text-muted">Last 30 days</span>
          </div>
          <MiniChart values={applicationTrend} kind="line" />
        </article>
        <article className="card-quiet p-5 xl:col-span-2">
          <h2 className="text-sm font-semibold">Hiring pipeline</h2>
          <ul className="mt-4 space-y-3">
            {PIPELINE_STAGES.map((stage) => {
              const count = funnelCounts[stage];
              const pct = Math.round((count / maxFunnel) * 100);
              return (
                <li key={stage}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{stage}</span>
                    <span className="text-muted">
                      {count} · {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
      </section>

      <section className="card-quiet overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between border-b border-line">
          <h2 className="text-sm font-semibold">Recent applications</h2>
          <Link href="/applications" className="btn-text text-xs">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[720px]">
            <thead className="text-xs text-muted border-b border-line">
              <tr>
                {["Candidate", "Position", "Match", "Applied", "Stage", "Recruiter", ""].map(
                  (h) => (
                    <th key={h} className="px-5 py-2.5 font-medium">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {mockCandidates.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-b border-line last:border-0 hover:bg-slate-50/80">
                  <td className="px-5 py-3">
                    <Link href={`/candidates/${c.id}`} className="flex items-center gap-2.5">
                      <Avatar name={c.name} size="sm" />
                      <span className="font-medium">{c.name}</span>
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-muted">{c.jobTitle}</td>
                  <td className="px-5 py-3 font-medium">{c.matchScore}%</td>
                  <td className="px-5 py-3 text-muted">{c.lastActivity}</td>
                  <td className="px-5 py-3">
                    <StatusBadge tone="indigo">{c.stage}</StatusBadge>
                  </td>
                  <td className="px-5 py-3 text-muted">{c.recruiter}</td>
                  <td className="px-5 py-3">
                    <Link href={`/candidates/${c.id}`} className="btn-text text-xs">
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-quiet p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Upcoming interviews</h2>
          <Link href="/interviews" className="btn-text text-xs">
            Calendar
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {mockInterviews
            .filter((i) => i.status === "Scheduled")
            .map((i) => (
              <li key={i.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                <div>
                  <p className="font-medium">{i.candidate}</p>
                  <p className="text-muted">{i.role}</p>
                </div>
                <p className="text-muted">
                  {i.interviewer} · {i.type} ·{" "}
                  {new Date(i.at).toLocaleString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
