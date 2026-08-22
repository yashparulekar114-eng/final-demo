"use client";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-lg py-8">
      <h1 className="text-xl font-semibold tracking-tight">This page hit an error</h1>
      <p className="mt-2 text-sm text-muted">{error.message || "Please try again."}</p>
      <button type="button" onClick={reset} className="btn-primary mt-6">
        Try again
      </button>
    </div>
  );
}
