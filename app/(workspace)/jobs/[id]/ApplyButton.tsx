"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { applyToJob, type ApplyState } from "./actions";

const initial: ApplyState = {};

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
  const applied =
    ((alreadyApplied && hasResume) || Boolean(state.success)) &&
    state.failedStep !== "upload";
  const displayError = clientError || state.error;

  if (!isSignedIn) {
    return (
      <Link
        href={`/sign-in?redirect_url=${encodeURIComponent(`/jobs/${jobId}`)}`}
        className="btn-primary"
      >
        Sign in to apply
      </Link>
    );
  }

  if (applied) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-light tracking-tight">Application received.</p>
        {state.error ? (
          <p className="text-sm font-medium text-amber-700 leading-relaxed" role="alert">
            {state.error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-8 max-w-md"
      onSubmit={(event) => {
        const input = event.currentTarget.elements.namedItem(
          "resume",
        ) as HTMLInputElement | null;
        const file = input?.files?.[0];
        if (!file) {
          event.preventDefault();
          setClientError("Resume upload failed: Please choose a PDF resume.");
          return;
        }
        const isPdf =
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf");
        if (!isPdf) {
          event.preventDefault();
          setClientError("Resume upload failed: Only PDF files are allowed.");
          return;
        }
        setClientError(null);
      }}
    >
      <input type="hidden" name="jobId" value={jobId} />
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
          className="block w-full text-sm font-light text-muted file:mr-4 file:border-0 file:bg-transparent file:px-0 file:py-0 file:text-sm file:font-medium file:text-accent"
        />
      </div>
      <button type="submit" disabled={pending} className="btn-primary">
        {pending
          ? "Uploading…"
          : alreadyApplied
            ? "Attach resume"
            : "Apply"}
      </button>
      {displayError ? (
        <p className="text-sm font-medium text-rose-600 leading-relaxed" role="alert">
          {displayError}
        </p>
      ) : null}
    </form>
  );
}
