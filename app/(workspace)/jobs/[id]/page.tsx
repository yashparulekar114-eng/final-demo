import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { jobById, mockCandidates } from "@/lib/ats-data";
import ApplyButton from "./ApplyButton";
import { StatusBadge, Avatar } from "../../../components/ui";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mock = jobById(id);

  let live: {
    id: string;
    title: string;
    description: string;
    status: string;
  } | null = null;
  let loadError: string | null = null;

  if (!mock && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, description, status")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        loadError = error.message;
      } else {
        live = data;
      }
    } catch (err) {
      loadError = err instanceof Error ? err.message : "Could not load this job.";
    }
  }

  if (loadError) {
    return <p className="text-sm text-muted">Could not load this job. {loadError}</p>;
  }

  if (!mock && !live) notFound();

  const title = mock?.title ?? live!.title;
  const description = mock?.description ?? live!.description;
  const status = mock?.status ?? live!.status;

  const user = await currentUser();
  let alreadyApplied = false;
  let hasResume = false;
  if (user && live) {
    try {
      const withResume = await supabase
        .from("applications")
        .select("id, resume_url")
        .eq("job_id", live.id)
        .eq("candidate_id", user.id)
        .maybeSingle();
      if (withResume.error?.message.includes("resume_url")) {
        const fallback = await supabase
          .from("applications")
          .select("id")
          .eq("job_id", live.id)
          .eq("candidate_id", user.id)
          .maybeSingle();
        alreadyApplied = Boolean(fallback.data);
      } else if (!withResume.error) {
        alreadyApplied = Boolean(withResume.data);
        hasResume = Boolean(withResume.data?.resume_url);
      }
    } catch {
      alreadyApplied = false;
      hasResume = false;
    }
  }

  const pipeline = mockCandidates.filter((c) => c.jobId === id);

  return (
    <div className="max-w-5xl space-y-8">
      <Link href="/jobs" className="btn-text text-muted">
        <ArrowLeft className="h-4 w-4" />
        Jobs
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <StatusBadge tone="indigo">{status}</StatusBadge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
            {mock ? (
              <p className="mt-2 text-sm text-muted">
                {mock.department} · {mock.location} · {mock.type} · {mock.salary}
              </p>
            ) : null}
          </div>
          <article className="card-quiet p-6">
            <h2 className="text-sm font-semibold">Job description</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {description}
            </p>
          </article>
          {mock ? (
            <>
              <article className="card-quiet p-6">
                <h2 className="text-sm font-semibold">Requirements</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {mock.requirements.map((r) => (
                    <li key={r}>· {r}</li>
                  ))}
                </ul>
              </article>
              <article className="card-quiet p-6">
                <h2 className="text-sm font-semibold">Skills</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mock.skills.map((s) => (
                    <StatusBadge key={s}>{s}</StatusBadge>
                  ))}
                </div>
              </article>
            </>
          ) : null}
          {live ? (
            <div className="card-quiet p-6">
              <h2 className="text-sm font-semibold mb-4">Apply</h2>
              <ApplyButton
                jobId={live.id}
                isSignedIn={Boolean(user)}
                alreadyApplied={alreadyApplied}
                hasResume={hasResume}
              />
            </div>
          ) : null}
        </div>
        <aside className="w-full lg:w-72 space-y-4">
          {mock ? (
            <div className="card-quiet p-5">
              <h2 className="text-sm font-semibold">Hiring team</h2>
              <ul className="mt-3 space-y-3">
                {mock.team.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Avatar name={p} size="sm" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="card-quiet p-5">
            <h2 className="text-sm font-semibold">Candidate pipeline</h2>
            <ul className="mt-3 space-y-3">
              {(pipeline.length ? pipeline : mockCandidates.slice(0, 3)).map((c) => (
                <li key={c.id}>
                  <Link href={`/candidates/${c.id}`} className="flex items-center gap-2">
                    <Avatar name={c.name} size="sm" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium truncate">{c.name}</span>
                      <span className="block text-xs text-muted">
                        {c.stage} · {c.matchScore}%
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
