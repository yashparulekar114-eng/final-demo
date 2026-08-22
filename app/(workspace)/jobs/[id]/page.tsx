import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { jobById } from "@/lib/ats-data";
import ApplyButton from "./ApplyButton";
import { StatusBadge } from "../../../components/ui";

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

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
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

  if (loadError && !mock) {
    return (
      <p className="text-sm text-rose-600">Could not load this job. {loadError}</p>
    );
  }

  if (!mock && !live) notFound();

  const title = live?.title ?? mock!.title;
  const description = live?.description ?? mock!.description;
  const status = live?.status ?? mock!.status;
  const jobId = live?.id ?? mock!.id;
  const canApplyLive = Boolean(live);

  const user = await currentUser();
  let alreadyApplied = false;
  if (user && live) {
    try {
      const existing = await supabase
        .from("applications")
        .select("id")
        .eq("job_id", live.id)
        .eq("candidate_id", user.id)
        .maybeSingle();
      if (!existing.error) {
        alreadyApplied = Boolean(existing.data);
      }
    } catch {
      alreadyApplied = false;
    }
  }

  const statusTone =
    status === "Open" || status === "Active"
      ? "green"
      : status === "Closed"
        ? "red"
        : "indigo";

  return (
    <div className="max-w-3xl space-y-8">
      <Link href="/jobs" className="btn-text text-muted">
        <ArrowLeft className="h-4 w-4" />
        Jobs
      </Link>

      <header className="space-y-4">
        <StatusBadge tone={statusTone}>{status}</StatusBadge>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
        {mock && !live ? (
          <p className="text-sm text-muted">
            {mock.department} · {mock.location} · {mock.type} · {mock.salary}
          </p>
        ) : null}
      </header>

      <article className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="text-sm font-semibold text-ink">Description</h2>
        <p className="mt-4 text-base font-light leading-relaxed text-slate-700 whitespace-pre-wrap">
          {description}
        </p>
      </article>

      <section
        id="apply"
        className="rounded-xl border border-line bg-surface p-6 sm:p-8 scroll-mt-24 space-y-4"
      >
        <h2 className="text-lg font-semibold tracking-tight">Apply Now</h2>
        {canApplyLive ? (
          <ApplyButton
            jobId={jobId}
            isSignedIn={Boolean(user)}
            alreadyApplied={alreadyApplied}
          />
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              This is a sample listing. Apply Now is available on posted jobs from
              the board.
            </p>
            <Link href="/jobs" className="btn-primary">
              Browse jobs to apply
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
