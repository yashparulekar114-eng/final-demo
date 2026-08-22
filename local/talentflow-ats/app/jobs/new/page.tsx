import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Briefcase } from "lucide-react";
import JobForm from "./JobForm";

export default async function NewJobPage() {
  await auth.protect();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-indigo-600">Recruiter</p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create a new job
        </h1>
        <p className="mt-2 text-slate-600">
          Publish an open role. Candidates will see it on the jobs board right away.
        </p>

        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <JobForm />
        </div>
      </div>
    </div>
  );
}
