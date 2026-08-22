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
  const applied = (alreadyApplied && hasResume) || Boolean(state.success);

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
    <form
      action={formAction}
      className="space-y-4"
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
        const isPdf =
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf");
        if (!isPdf) {
          event.preventDefault();
          setClientError("Only PDF files are allowed.");
          return;
        }
        setClientError(null);
      }}
    >
      <input type="hidden" name="jobId" value={jobId} />
      <div>
        <label htmlFor="resume" className="block text-sm font-semibold text-slate-700 mb-2">
          Resume (PDF)
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept="application/pdf,.pdf"
          required
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending
          ? "Uploading resume..."
          : alreadyApplied
            ? "Attach resume"
            : "Apply Now"}
      </button>
      {clientError || state.error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {clientError || state.error}
        </p>
      ) : null}
    </form>
  );
}
