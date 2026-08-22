import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import JobSearchBar from "./JobSearchBar";

type Job = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
};

function sanitizeSearch(raw: string) {
  return raw.replace(/[%_,*()]/g, " ").replace(/\s+/g, " ").trim();
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: rawQuery } = await searchParams;
  const query = sanitizeSearch(rawQuery ?? "");

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <JobsShell query={rawQuery ?? ""}>
        <div className="py-10">
          <h2 className="text-xl font-medium tracking-tight">Supabase is not configured</h2>
          <p className="mt-3 text-base font-light text-muted leading-relaxed">
            Copy <code className="font-mono text-sm">.env.example</code> to{" "}
            <code className="font-mono text-sm">.env.local</code> and add your
            project URL and anon key, then restart the app.
          </p>
        </div>
      </JobsShell>
    );
  }

  let request = supabase
    .from("jobs")
    .select("id, title, description, status, created_at")
    .eq("status", "Open")
    .order("created_at", { ascending: false });

  if (query) {
    request = request.or(
      `title.ilike.%${query}%,description.ilike.%${query}%`,
    );
  }

  const { data, error } = await request;

  if (error) {
    const missingTable =
      error.code === "PGRST205" || error.message.includes("schema cache");

    return (
      <JobsShell query={rawQuery ?? ""}>
        <div className="py-10">
          <h2 className="text-xl font-medium tracking-tight">Could not load jobs</h2>
          <p className="mt-3 text-base font-light text-muted leading-relaxed">
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
    <JobsShell query={rawQuery ?? ""}>
      {jobs.length === 0 ? (
        <div className="py-16 max-w-lg">
          {query ? (
            <>
              <h2 className="text-2xl font-light tracking-tight">No jobs found</h2>
              <p className="mt-4 text-base font-light text-muted leading-relaxed">
                Nothing matched “{query}”. Try a different keyword.
              </p>
              <Link href="/jobs" className="btn-text mt-8">
                Clear search
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-light tracking-tight">No open jobs yet</h2>
              <p className="mt-4 text-base font-light text-muted leading-relaxed">
                Recruiters can post a role from the dashboard.
              </p>
              <Link href="/jobs/new" className="btn-text mt-8">
                Post a job
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {jobs.map((job) => (
            <li key={job.id} className="py-10 sm:py-12">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="eyebrow">{job.status}</p>
                  <h2 className="mt-3 text-2xl font-light tracking-tight">{job.title}</h2>
                  <p className="mt-4 text-base font-light leading-relaxed text-muted line-clamp-3">
                    {job.description}
                  </p>
                </div>
                <Link href={`/jobs/${job.id}`} className="btn-text shrink-0 mt-1">
                  View role
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </JobsShell>
  );
}

function JobsShell({
  children,
  query,
}: {
  children: ReactNode;
  query: string;
}) {
  return (
    <div>
      <div className="page-shell py-16 sm:py-24">
        <p className="eyebrow">Open roles</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-light tracking-tight">
          Browse jobs
        </h1>
        <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-muted">
          Positions posted by recruiters on TalentFlow.
        </p>
        <JobSearchBar query={query} />
        <div className="mt-16 sm:mt-20">{children}</div>
      </div>
    </div>
  );
}
