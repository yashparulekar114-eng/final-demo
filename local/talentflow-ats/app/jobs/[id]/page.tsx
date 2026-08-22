import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, CircleDot } from "lucide-react";
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
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
            Could not load this job. {error.message}
          </p>
        </div>
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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </Link>

        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              <CircleDot className="w-3.5 h-3.5" />
              {job.status}
            </span>
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {job.title}
          </h1>
          <p className="mt-6 text-slate-700 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <ApplyButton
              jobId={job.id}
              isSignedIn={Boolean(user)}
              alreadyApplied={alreadyApplied}
              hasResume={hasResume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
