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
      <div className="space-y-3">
        <p className="text-sm text-muted">Sign in with Clerk to submit an application.</p>
        <Link
          href={`/sign-in?redirect_url=${encodeURIComponent(`/jobs/${jobId}#apply`)}`}
          className="btn-primary"
        >
          Sign in to apply
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 max-w-md">
      <input type="hidden" name="jobId" value={jobId} />
      <p className="text-sm text-muted">
        We will record your application against this role. You can optionally attach
        a PDF resume.
      </p>
      <div>
        <label htmlFor="resume" className="label">
          Resume (PDF, optional)
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept="application/pdf,.pdf"
          disabled={applied || pending}
          className="block w-full text-sm font-light text-muted file:mr-4 file:border-0 file:bg-transparent file:px-0 file:py-0 file:text-sm file:font-medium file:text-accent disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={applied || pending}
        className="btn-primary disabled:opacity-60 disabled:pointer-events-none"
      >
        {applied ? "Applied" : pending ? "Applying…" : "Apply Now"}
      </button>
      {applied ? (
        <p className="text-sm text-emerald-700" role="status">
          You have already applied for this role. Track it on{" "}
          <Link href="/applications" className="underline">
            Applications
          </Link>
          .
        </p>
      ) : null}
      {state.error && !applied ? (
        <p className="text-sm font-medium text-rose-600 leading-relaxed" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.error && applied && state.failedStep === "email" ? (
        <p className="text-sm text-amber-700" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
