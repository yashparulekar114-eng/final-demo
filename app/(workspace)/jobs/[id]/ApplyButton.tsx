"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { applyToJob, type ApplyState } from "./actions";

const initial: ApplyState = {};

function isPdfFile(file: File) {
  return (
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
  );
}

export default function ApplyButton({
  jobId,
  isSignedIn,
  alreadyApplied,
  hasResume,
}: {
  jobId: string;
  isSignedIn: boolean;
  alreadyApplied: boolean;
  hasResume: boolean;
}) {
  const [state, formAction, pending] = useActionState(applyToJob, initial);
  const [clientError, setClientError] = useState<string | null>(null);
  const complete = (alreadyApplied && hasResume) || Boolean(state.success);

  if (!isSignedIn) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted">Sign in to upload a PDF resume and apply.</p>
        <Link
          href={`/sign-in?redirect_url=${encodeURIComponent(`/jobs/${jobId}#apply`)}`}
          className="btn-primary"
        >
          Sign in to apply
        </Link>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="space-y-3">
        <button type="button" disabled className="btn-primary opacity-60 pointer-events-none">
          Applied
        </button>
        <p className="text-sm text-emerald-700" role="status">
          Application received with your resume. Track it on{" "}
          <Link href="/applications" className="underline">
            Applications
          </Link>
          .
        </p>
        {state.error && state.failedStep === "email" ? (
          <p className="text-sm text-amber-700" role="alert">
            {state.error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-5 max-w-md"
      onSubmit={(event) => {
        const input = event.currentTarget.elements.namedItem(
          "resume",
        ) as HTMLInputElement | null;
        const file = input?.files?.[0];
        if (!file) {
          event.preventDefault();
          setClientError("Please choose a PDF resume.");
          return;
        }
        if (!isPdfFile(file)) {
          event.preventDefault();
          setClientError("Only PDF files are allowed.");
          return;
        }
        setClientError(null);
      }}
    >
      <input type="hidden" name="jobId" value={jobId} />
      <p className="text-sm text-muted">
        Upload a PDF resume. It is stored in the Supabase <code>resumes</code> bucket
        and the public URL is saved on your application.
      </p>
      <div>
        <label htmlFor="resume" className="label">
          Resume (PDF)
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept="application/pdf,.pdf"
          required
          disabled={pending}
          className="mt-1 block w-full text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn-primary disabled:opacity-60 disabled:pointer-events-none"
      >
        {pending
          ? "Uploading…"
          : alreadyApplied
            ? "Upload resume"
            : "Apply Now"}
      </button>
      {clientError || (state.error && state.failedStep !== "email") ? (
        <p className="text-sm font-medium text-rose-600 leading-relaxed" role="alert">
          {clientError || state.error}
        </p>
      ) : null}
    </form>
  );
}
