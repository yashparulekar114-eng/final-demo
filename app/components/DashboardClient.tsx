"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

type Role = "recruiter" | "candidate";

type DashboardUser = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

const mockApplications = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "Northwind Labs",
    status: "Applied" as const,
    updated: "2 days ago",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Harbor & Co.",
    status: "Interviewing" as const,
    updated: "Yesterday",
  },
  {
    id: "3",
    title: "Full-Stack Developer",
    company: "Brightline",
    status: "Applied" as const,
    updated: "5 days ago",
  },
];

export default function DashboardClient({ user }: { user: DashboardUser }) {
  const [role, setRole] = useState<Role>("recruiter");

  return (
    <div>
      <main className="page-shell py-16 sm:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-xl">
            <p className="eyebrow">Welcome</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-light tracking-tight text-ink">
              {user.name}
            </h1>
            <p className="mt-4 text-base font-light text-muted">{user.email}</p>
          </div>

          <div className="flex items-center gap-8 self-start">
            <button
              type="button"
              onClick={() => setRole("recruiter")}
              className={`text-sm tracking-wide pb-1 border-b transition-colors ${
                role === "recruiter"
                  ? "border-ink text-ink font-medium"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`text-sm tracking-wide pb-1 border-b transition-colors ${
                role === "candidate"
                  ? "border-ink text-ink font-medium"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Candidate
            </button>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          {role === "recruiter" ? <RecruiterView /> : <CandidateView />}
        </div>
      </main>
    </div>
  );
}

function RecruiterView() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
        <article className="bg-surface p-10 sm:p-12">
          <p className="eyebrow">Active jobs</p>
          <p className="mt-6 text-5xl font-light tracking-tight">12</p>
          <p className="mt-4 text-sm font-light text-muted leading-relaxed">
            Open roles currently accepting applicants
          </p>
        </article>
        <article className="bg-surface p-10 sm:p-12">
          <p className="eyebrow">Candidates</p>
          <p className="mt-6 text-5xl font-light tracking-tight">84</p>
          <p className="mt-4 text-sm font-light text-muted leading-relaxed">
            Applicants across all open pipelines
          </p>
        </article>
      </div>

      <Link href="/jobs/new" className="btn-primary mt-12">
        Create a job
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function CandidateView() {
  return (
    <div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-light tracking-tight">My applications</h2>
        <p className="mt-3 text-base font-light text-muted leading-relaxed">
          Track where each application stands. Sample data until live pipeline
          history is connected.
        </p>
      </div>

      <ul className="mt-12 divide-y divide-line border-y border-line">
        {mockApplications.map((app) => (
          <li
            key={app.id}
            className="py-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3"
          >
            <div>
              <p className="text-lg font-medium tracking-tight">{app.title}</p>
              <p className="mt-1 text-sm font-light text-muted">{app.company}</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted font-light">
              <span className="text-ink font-normal">{app.status}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {app.updated}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Link href="/jobs" className="btn-text mt-10">
        Browse jobs
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
