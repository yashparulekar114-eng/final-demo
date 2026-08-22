import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import JobForm from "./JobForm";
import { requireRecruiter } from "@/lib/roles";

export default async function NewJobPage() {
  await auth.protect();
  await requireRecruiter("/jobs");

  return (
    <div className="max-w-xl">
      <Link href="/jobs" className="btn-text text-muted">
        <ArrowLeft className="h-4 w-4" />
        Jobs
      </Link>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">Create a job</h1>
      <p className="mt-2 text-sm text-muted">
        Publishes to the shared jobs board for candidates.
      </p>
      <div className="card-quiet p-6 mt-8">
        <JobForm />
      </div>
    </div>
  );
}
