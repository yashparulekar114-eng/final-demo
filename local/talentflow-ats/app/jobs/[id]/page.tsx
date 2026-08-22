import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function JobDetailPlaceholder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </Link>
        <h1 className="mt-8 text-2xl font-bold text-slate-900">Job details coming soon</h1>
        <p className="mt-2 text-slate-600">
          This is a placeholder for job <span className="font-mono text-sm">{id}</span>.
          Apply flow will be added next.
        </p>
      </div>
    </div>
  );
}
