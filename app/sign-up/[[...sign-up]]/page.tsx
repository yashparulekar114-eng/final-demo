import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const normalized = role === "candidate" ? "candidate" : "recruiter";

  return (
    <div>
      <header className="page-shell h-14 flex items-center">
        <Link href="/" className="font-semibold tracking-tight">
          TalentFlow
        </Link>
      </header>
      <div className="page-shell py-10 flex flex-col items-center">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {normalized === "candidate" ? "Candidate" : "Recruiter"}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight mb-8">Create an account</h1>
        <SignUp unsafeMetadata={{ role: normalized }} />
      </div>
    </div>
  );
}
