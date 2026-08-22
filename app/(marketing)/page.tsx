import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <main>
        <section id="get-started" className="page-shell pt-20 pb-28 sm:pt-28 sm:pb-36">
          <p className="eyebrow">Applicant tracking</p>
          <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-[3.5rem] font-light leading-[1.15] tracking-tight text-ink">
            Hire with clarity.
            <br />
            Apply with ease.
          </h1>
          <p className="mt-8 max-w-xl text-lg sm:text-xl font-light leading-relaxed text-muted">
            TalentFlow is a quiet workspace for recruiters who post roles and
            candidates who search, apply, and track status — without the noise.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
            <Link href="/sign-up?role=recruiter" className="btn-primary">
              I am a recruiter
            </Link>
            <Link href="/sign-up?role=candidate" className="btn-secondary">
              I am a candidate
            </Link>
          </div>
        </section>

        <section id="product" className="page-shell pb-28 sm:pb-36">
          <div className="h-px bg-line" />
          <div className="pt-16 sm:pt-24 max-w-2xl">
            <p className="eyebrow">Product</p>
            <h2 className="mt-5 text-3xl sm:text-4xl font-light tracking-tight text-ink leading-snug">
              Three things. Done well.
            </h2>
          </div>

          <ol className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <li>
              <p className="text-sm font-medium tracking-[0.16em] text-muted">01</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight">Job posting</h3>
              <p className="mt-4 text-base font-light leading-relaxed text-muted">
                Publish a role in minutes. Candidates see it on the board as soon
                as it is open.
              </p>
            </li>
            <li>
              <p className="text-sm font-medium tracking-[0.16em] text-muted">02</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight">One-click apply</h3>
              <p className="mt-4 text-base font-light leading-relaxed text-muted">
                Sign in, attach a PDF resume, and apply. Your status stays visible
                on the role.
              </p>
            </li>
            <li>
              <p className="text-sm font-medium tracking-[0.16em] text-muted">03</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight">A calm dashboard</h3>
              <p className="mt-4 text-base font-light leading-relaxed text-muted">
                Switch between recruiter and candidate views. Post jobs or follow
                applications from one place.
              </p>
            </li>
          </ol>
        </section>

        <section id="how-it-works" className="page-shell pb-28 sm:pb-36">
          <div className="h-px bg-line" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 pt-16 sm:pt-24">
            <div id="for-recruiters" className="scroll-mt-32">
              <p className="eyebrow">Recruiters</p>
              <h2 className="mt-5 text-3xl font-light tracking-tight leading-snug">
                Post jobs. Review people. Stay in one workspace.
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-muted">
                Create an open role, then return to the jobs board to see who
                applied. Stages stay simple: applied, interviewing, hired.
              </p>
            </div>
            <div id="for-candidates" className="scroll-mt-32">
              <p className="eyebrow">Candidates</p>
              <h2 className="mt-5 text-3xl font-light tracking-tight leading-snug">
                Search roles. Apply once. Know where you stand.
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-muted">
                Browse open positions, filter by keyword, and upload a resume.
                You will see when an application is recorded.
              </p>
            </div>
          </div>
        </section>

        <section className="page-shell pb-28 sm:pb-32">
          <div className="h-px bg-line" />
          <div className="pt-16 sm:pt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-snug">
                Begin when you are ready.
              </h2>
              <p className="mt-5 text-base font-light leading-relaxed text-muted">
                Create a recruiter or candidate account. You will land on your
                dashboard.
              </p>
            </div>
            <Link href="/jobs" className="btn-text shrink-0">
              Browse open roles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="page-shell pb-12">
        <div className="h-px bg-line" />
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted font-light">
          <p>TalentFlow</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
