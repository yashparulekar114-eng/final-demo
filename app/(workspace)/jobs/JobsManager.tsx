"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { mockJobs, type JobStatus, type MockJob } from "@/lib/ats-data";
import { StatusBadge, EmptyState } from "../../components/ui";
import { useCreateJob } from "../../components/CreateJobModal";

const statusTone: Record<JobStatus, "green" | "slate" | "amber" | "red"> = {
  Active: "green",
  Draft: "slate",
  Paused: "amber",
  Closed: "red",
};

export type LiveJob = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
};

export default function JobsManager({ liveJobs }: { liveJobs: LiveJob[] }) {
  const create = useCreateJob();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const merged: MockJob[] = [
      ...liveJobs.map((j) => ({
        id: j.id,
        title: j.title,
        department: "General",
        location: "—",
        type: "Full-time",
        salary: "—",
        manager: "You",
        status: (j.status === "Open" ? "Active" : "Closed") as JobStatus,
        posted: new Date(j.created_at).toLocaleDateString(),
        applicants: 0,
        description: j.description,
        requirements: [],
        skills: [],
        team: ["You"],
      })),
      ...mockJobs,
    ];
    return merged.filter((j) => {
      const hit = `${j.title} ${j.department} ${j.location}`.toLowerCase().includes(q.toLowerCase());
      const st = status === "All" || j.status === status;
      return hit && st;
    });
  }, [liveJobs, q, status]);

  const pageSize = 6;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
          <p className="text-sm text-muted mt-1">Open roles, drafts, and closed reqs.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/jobs/new" className="btn-secondary">
            Full form
          </Link>
          <button type="button" className="btn-primary" onClick={create.open}>
            <Plus className="h-4 w-4" />
            Create Job
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            className="field pl-9"
            placeholder="Search title, team, location"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
          />
        </label>
        <select
          className="field sm:w-40"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(0);
          }}
        >
          {["All", "Active", "Draft", "Paused", "Closed"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {slice.length === 0 ? (
        <EmptyState title="No jobs" body="Try a different search or create a role." />
      ) : (
        <div className="overflow-x-auto card-quiet">
          <table className="w-full text-sm text-left min-w-[800px]">
            <thead className="text-xs text-muted border-b border-line">
              <tr>
                {[
                  "Job title",
                  "Department",
                  "Location",
                  "Type",
                  "Applicants",
                  "Hiring manager",
                  "Status",
                  "Posted",
                ].map((h) => (
                  <th key={h} className="px-4 py-2.5 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slice.map((j) => (
                <tr key={j.id} className="border-b border-line last:border-0 hover:bg-slate-50/80">
                  <td className="px-4 py-3">
                    <Link href={`/jobs/${j.id}`} className="font-medium hover:text-accent">
                      {j.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{j.department}</td>
                  <td className="px-4 py-3 text-muted">{j.location}</td>
                  <td className="px-4 py-3 text-muted">{j.type}</td>
                  <td className="px-4 py-3">{j.applicants}</td>
                  <td className="px-4 py-3 text-muted">{j.manager}</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={statusTone[j.status]}>{j.status}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-muted">{j.posted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <p className="text-muted">
          {filtered.length} roles · page {page + 1}/{pages}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-secondary"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn-secondary"
            disabled={page >= pages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
