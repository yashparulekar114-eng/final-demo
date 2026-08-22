"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-shell py-24 max-w-lg">
      <p className="eyebrow">Error</p>
      <h1 className="mt-4 text-3xl font-light tracking-tight">Something went wrong</h1>
      <p className="mt-4 text-base font-light leading-relaxed text-muted">
        {error.message || "Please try again."}
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-10">
        Try again
      </button>
    </div>
  );
}
