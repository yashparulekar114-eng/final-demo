import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const normalized = role === "candidate" ? "candidate" : "recruiter";

  return (
    <div className="page-shell py-16 sm:py-24 flex flex-col items-center">
      <div className="w-full max-w-md text-center mb-12">
        <p className="eyebrow">
          {normalized === "candidate" ? "Candidate" : "Recruiter"}
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight">
          Create an account
        </h1>
        <p className="mt-4 text-base font-light text-muted leading-relaxed">
          One account. Then you can post jobs or apply.
        </p>
      </div>
      <SignUp unsafeMetadata={{ role: normalized }} />
    </div>
  );
}
