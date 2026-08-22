import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import JobForm from "./JobForm";

export default async function NewJobPage() {
  await auth.protect();

  return (
    <div>
      <div className="page-shell py-16 sm:py-24 max-w-3xl">
        <Link href="/dashboard" className="btn-text text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>

        <p className="eyebrow mt-12">Recruiter</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-light tracking-tight">
          Create a job
        </h1>
        <p className="mt-5 text-lg font-light leading-relaxed text-muted max-w-xl">
          Publish an open role. Candidates will see it on the jobs board right
          away.
        </p>

        <div className="mt-14">
          <JobForm />
        </div>
      </div>
    </div>
  );
}
