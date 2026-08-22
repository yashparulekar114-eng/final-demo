import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <header className="page-shell h-14 flex items-center">
        <Link href="/" className="font-semibold tracking-tight">
          TalentFlow
        </Link>
      </header>
      <div className="page-shell py-10 flex flex-col items-center">
        <h1 className="text-2xl font-semibold tracking-tight mb-8">Sign in</h1>
        <SignIn />
      </div>
    </div>
  );
}
