import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import ApplyButton from "./ApplyButton";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: job, error } = await supabase
    .from("jobs")
    .select("id, title, description, status, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <div className="page-shell py-24">
        <p className="max-w-xl text-base font-light leading-relaxed text-muted">
          Could not load this job. {error.message}
        </p>
      </div>
    );
  }

  if (!job) {
    notFound();
  }

  const user = await currentUser();
  let alreadyApplied = false;
  let hasResume = false;

  if (user) {
    const withResume = await supabase
      .from("applications")
      .select("id, resume_url")
      .eq("job_id", job.id)
      .eq("candidate_id", user.id)
      .maybeSingle();

    if (withResume.error?.message.includes("resume_url")) {
      const fallback = await supabase
        .from("applications")
        .select("id")
        .eq("job_id", job.id)
        .eq("candidate_id", user.id)
        .maybeSingle();
      alreadyApplied = Boolean(fallback.data);
    } else {
      alreadyApplied = Boolean(withResume.data);
      hasResume = Boolean(withResume.data?.resume_url);
    }
  }

  return (
    <div>
      <div className="page-shell py-16 sm:py-24 max-w-3xl">
        <Link href="/jobs" className="btn-text text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          All jobs
        </Link>

        <p className="eyebrow mt-12">{job.status}</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-light tracking-tight leading-tight">
          {job.title}
        </h1>
        <p className="mt-10 text-lg font-light leading-[1.75] text-ink/90 whitespace-pre-wrap">
          {job.description}
        </p>

        <div className="mt-16 pt-12 border-t border-line">
          <ApplyButton
            jobId={job.id}
            isSignedIn={Boolean(user)}
            alreadyApplied={alreadyApplied}
            hasResume={hasResume}
          />
        </div>
      </div>
    </div>
  );
}
