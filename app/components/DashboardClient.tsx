"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { DashboardApplication } from "../dashboard/types";
import ScheduleInterviewForm from "../dashboard/ScheduleInterviewForm";

type Role = "recruiter" | "candidate";

type DashboardUser = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

function formatInterviewTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function DashboardClient({
  user,
  recruiterApplications,
  candidateApplications,
  openJobCount,
  applicantCount,
  interviewsTableMissing,
}: {
  user: DashboardUser;
  recruiterApplications: DashboardApplication[];
  candidateApplications: DashboardApplication[];
  openJobCount: number;
  applicantCount: number;
  interviewsTableMissing: boolean;
}) {
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

        {interviewsTableMissing ? (
          <p className="mt-12 max-w-xl text-sm font-light leading-relaxed text-muted">
            Interview scheduling needs the interviews table. Run the latest
            database-schema.sql in the Supabase SQL Editor, then refresh.
          </p>
        ) : null}

        <div className="mt-16 sm:mt-20">
          {role === "recruiter" ? (
            <RecruiterView
              applications={recruiterApplications}
              openJobCount={openJobCount}
              applicantCount={applicantCount}
            />
          ) : (
            <CandidateView applications={candidateApplications} />
          )}
        </div>
      </main>
    </div>
  );
}

function RecruiterView({
  applications,
  openJobCount,
  applicantCount,
}: {
  applications: DashboardApplication[];
  openJobCount: number;
  applicantCount: number;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
        <article className="bg-surface p-10 sm:p-12">
          <p className="eyebrow">Active jobs</p>
          <p className="mt-6 text-5xl font-light tracking-tight">{openJobCount}</p>
          <p className="mt-4 text-sm font-light text-muted leading-relaxed">
            Open roles currently accepting applicants
          </p>
        </article>
        <article className="bg-surface p-10 sm:p-12">
          <p className="eyebrow">Applications</p>
          <p className="mt-6 text-5xl font-light tracking-tight">{applicantCount}</p>
          <p className="mt-4 text-sm font-light text-muted leading-relaxed">
            Candidates who applied to your roles
          </p>
        </article>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-light tracking-tight">Applications received</h2>
        <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-muted">
          Schedule a time and meeting link. The candidate will see it on their
          dashboard, and their status becomes Interviewing.
        </p>
      </div>

      {applications.length === 0 ? (
        <p className="mt-12 text-base font-light text-muted">
          No applications yet. Post a job, then candidates can apply.
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {applications.map((app) => (
            <li key={app.id} className="py-10">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div>
                  <p className="eyebrow">{app.status}</p>
                  <p className="mt-3 text-xl font-medium tracking-tight">
                    {app.job_title}
                  </p>
                  <p className="mt-2 text-sm font-light text-muted">
                    Candidate {app.candidate_id}
                  </p>
                  {app.interview ? (
                    <p className="mt-4 text-sm font-light text-ink">
                      Interview {formatInterviewTime(app.interview.scheduled_time)}
                    </p>
                  ) : null}
                  {app.resume_url ? (
                    <a
                      href={app.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-text mt-4 text-sm"
                    >
                      Resume
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
                <ScheduleInterviewForm
                  applicationId={app.id}
                  existing={
                    app.interview
                      ? {
                          scheduled_time: app.interview.scheduled_time,
                          link: app.interview.link,
                        }
                      : null
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link href="/jobs/new" className="btn-primary mt-12">
        Create a job
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function CandidateView({
  applications,
}: {
  applications: DashboardApplication[];
}) {
  return (
    <div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-light tracking-tight">My applications</h2>
        <p className="mt-3 text-base font-light text-muted leading-relaxed">
          Status, interview time, and a link to join when a recruiter schedules
          you.
        </p>
      </div>

      {applications.length === 0 ? (
        <p className="mt-12 text-base font-light text-muted">
          You have not applied to any roles yet.
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {applications.map((app) => (
            <li
              key={app.id}
              className="py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <p className="text-lg font-medium tracking-tight">{app.job_title}</p>
                <p className="mt-2 text-sm font-light text-muted">{app.status}</p>
                {app.interview ? (
                  <p className="mt-3 text-sm font-light text-ink">
                    {formatInterviewTime(app.interview.scheduled_time)}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {app.interview?.link ? (
                  <a
                    href={app.interview.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    Join interview
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link href={`/jobs/${app.job_id}`} className="btn-text">
                  View role
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link href="/jobs" className="btn-text mt-10">
        Browse jobs
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
