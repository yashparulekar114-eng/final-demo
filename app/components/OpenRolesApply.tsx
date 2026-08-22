import Link from "next/link";

export type ApplyJob = {
  id: string;
  title: string;
  status: string;
};

export default function OpenRolesApply({ jobs }: { jobs: ApplyJob[] }) {
  const open = jobs.filter((j) => j.status !== "Closed" && j.status !== "Draft");

  return (
    <section className="card-quiet p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Apply to a job</h2>
          <p className="text-sm text-muted mt-1">
            Open roles accept a PDF resume. This list is for candidates — the people
            table below is the recruiter pipeline.
          </p>
        </div>
        <Link href="/jobs" className="btn-secondary shrink-0">
          Browse all jobs
        </Link>
      </div>

      {open.length === 0 ? (
        <p className="text-sm text-muted">
          No posted roles are open yet. Ask a recruiter to publish a job, then
          return here to apply.
        </p>
      ) : (
        <ul className="divide-y divide-line">
          {open.slice(0, 8).map((job) => (
            <li
              key={job.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div>
                <p className="text-sm font-medium">{job.title}</p>
                <p className="text-xs text-muted">{job.status}</p>
              </div>
              <Link href={`/jobs/${job.id}#apply`} className="btn-primary">
                Apply
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
