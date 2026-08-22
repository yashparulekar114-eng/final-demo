import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="page-shell py-16 sm:py-24 flex flex-col items-center">
      <div className="w-full max-w-md text-center mb-12">
        <p className="eyebrow">Account</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight">
          Sign in
        </h1>
        <p className="mt-4 text-base font-light text-muted leading-relaxed">
          Continue to your TalentFlow dashboard.
        </p>
      </div>
      <SignIn />
    </div>
  );
}
