"use client";

import Link from "next/link";
import type { DashboardApplication } from "../dashboard/types";
import { EmptyState, StatusBadge } from "../../components/ui";

function tone(status: string): "green" | "slate" | "amber" | "indigo" | "red" {
  if (status === "Hired") return "green";
  if (status === "Rejected") return "red";
  if (status === "Interviewing") return "amber";
  if (status === "Applied") return "indigo";
  return "slate";
}

function ApplicationTable({
  rows,
  emptyTitle,
  emptyBody,
}: {
  rows: DashboardApplication[];
  emptyTitle: string;
  emptyBody: string;
}) {
  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} body={emptyBody} />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full text-sm min-w-[720px] text-left">
        <thead className="text-xs text-muted border-b border-line">
          <tr>
            {["Role", "Candidate", "Status", "Applied", "Resume", ""].map((h) => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-medium">{row.job_title}</td>
              <td className="px-4 py-3 text-muted font-mono text-xs">
                {row.candidate_id}
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={tone(row.status)}>{row.status}</StatusBadge>
              </td>
              <td className="px-4 py-3 text-muted">
                {new Date(row.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                {row.resume_url ? (
                  <a
                    href={row.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-text text-xs"
                  >
                    PDF
                  </a>
                ) : (
                  <span className="text-xs text-muted">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                <Link href={`/jobs/${row.job_id}`} className="btn-text text-xs">
                  Job
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ApplicationsBoard({
  recruiterApplications,
  candidateApplications,
  isCandidate,
}: {
  recruiterApplications: DashboardApplication[];
  candidateApplications: DashboardApplication[];
  isCandidate: boolean;
}) {
  return (
    <div className="max-w-6xl space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
          <p className="text-sm text-muted mt-1">
            Live records from Supabase after a candidate clicks Apply Now.
          </p>
        </div>
        {isCandidate ? (
          <Link href="/jobs" className="btn-primary">
            Apply to a job
          </Link>
        ) : (
          <Link href="/jobs/new" className="btn-secondary">
            Post a job
          </Link>
        )}
      </div>

      {isCandidate ? (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Your applications</h2>
          <ApplicationTable
            rows={candidateApplications}
            emptyTitle="You have not applied yet"
            emptyBody="Open a posted job and click Apply Now."
          />
        </section>
      ) : (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Applicants on your jobs</h2>
          <ApplicationTable
            rows={recruiterApplications}
            emptyTitle="No applicants yet"
            emptyBody="When someone applies to a job you posted, they appear here."
          />
        </section>
      )}
    </div>
  );
}
