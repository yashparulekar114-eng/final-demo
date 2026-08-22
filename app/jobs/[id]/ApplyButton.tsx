"use client";

import { useActionState } from "react";
import Link from "next/link";
import { applyToJob, type ApplyState } from "./actions";

const initial: ApplyState = {};

export default function ApplyButton({
  jobId,
  isSignedIn,
  alreadyApplied,
}: {
  jobId: string;
  isSignedIn: boolean;
  alreadyApplied: boolean;
}) {
  const [state, formAction, pending] = useActionState(applyToJob, initial);
  const applied = alreadyApplied || Boolean(state.success);

  if (!isSignedIn) {
    return (
      <Link
        href={`/sign-in?redirect_url=${encodeURIComponent(`/jobs/${jobId}`)}`}
        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition-colors"
      >
        Sign in to apply
      </Link>
    );
  }

  if (applied) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold opacity-90 cursor-not-allowed"
      >
        Applied
      </button>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="jobId" value={jobId} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Submitting..." : "Apply Now"}
      </button>
      {state.error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
