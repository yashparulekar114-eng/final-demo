import type { ReactNode } from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Job = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
};

export default async function JobsPage() {
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, description, status, created_at")
    .eq("status", "Open")
    .order("created_at", { ascending: false });

  if (error) {
    const missingTable =
      error.code === "PGRST205" || error.message.includes("schema cache");

    return (
      <JobsShell>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
          <h2 className="font-bold">Could not load jobs</h2>
          <p className="mt-2 text-sm">
            {missingTable
              ? "The jobs table does not exist yet. Open the Supabase SQL Editor and run database-schema.sql, then refresh this page."
              : error.message}
          </p>
        </div>
      </JobsShell>
    );
  }

  const jobs = (data ?? []) as Job[];

  return (
    <JobsShell>
      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h2 className="mt-4 text-lg font-bold text-slate-900">No open jobs yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Recruiters can post a role from the dashboard.
          </p>
          <Link
            href="/jobs/new"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Post a job
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">{job.title}</h2>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <MapPin className="w-3.5 h-3.5" />
                {job.status}
              </p>
              <p className="mt-3 text-sm text-slate-600 line-clamp-4 flex-grow">
                {job.description}
              </p>
              <Link
                href={`/jobs/${job.id}`}
                className="mt-6 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                View / Apply
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </JobsShell>
  );
}

function JobsShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="text-sm font-semibold text-indigo-600">Open roles</p>
        <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Browse jobs
        </h1>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Explore open positions posted by recruiters on TalentFlow.
        </p>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
