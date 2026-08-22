import Link from "next/link";
import {
  Briefcase,
  UserCheck,
  BarChart3,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Building2,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Talent<span className="text-indigo-600">Flow</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <a href="#for-recruiters" className="hover:text-indigo-600 transition-colors">
              For Recruiters
            </a>
            <a href="#for-candidates" className="hover:text-indigo-600 transition-colors">
              For Candidates
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#features"
              className="text-sm font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors"
            >
              Sign In
            </a>
            <a
              href="#get-started"
              className="hidden sm:inline-flex items-center justify-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm shadow-indigo-200 transition-all duration-200 hover:shadow"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section
          id="get-started"
          className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pb-36"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-blue-200/30 rounded-full blur-2xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Applicant Tracking & Hiring Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
              Hire Smarter,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Apply Faster.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              TalentFlow connects recruiters who post jobs with candidates who
              search roles and upload resumes — one clean pipeline for hiring
              teams and job seekers.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              <a
                href="#for-recruiters"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-indigo-600/35 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Building2 className="w-5 h-5" />
                <span>I am a Recruiter</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#for-candidates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-slate-800 font-semibold text-base border border-slate-300 shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                <Search className="w-5 h-5 text-indigo-600" />
                <span>I am a Candidate</span>
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">10k+</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Verified Candidates
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">500+</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Hiring Teams
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                  &lt; 48 hrs
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Average Time-to-Interview
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="py-16 sm:py-24 bg-white border-y border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-indigo-600 mb-2">
                Core Capabilities
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Everything you need to hire and get hired
              </h3>
              <p className="mt-4 text-base sm:text-lg text-slate-600">
                Simple tools for posting jobs, applying in one click, and
                tracking the pipeline with dashboard analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="relative group bg-slate-50 border border-slate-200/80 rounded-2xl p-8 transition-all duration-200 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Easy Job Posting
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Recruiters can create and publish detailed job postings in
                  minutes with requirements, tags, salary ranges, and screening
                  questions.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 border-t border-slate-200 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>Structured listings for every role</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <span>Custom screening questionnaires</span>
                  </li>
                </ul>
              </article>

              <article className="relative group bg-slate-50 border border-slate-200/80 rounded-2xl p-8 transition-all duration-200 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  1-Click Apply
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Candidates upload a resume once, then apply to matching jobs
                  without filling the same forms over and over.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 border-t border-slate-200 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Resume upload and profile reuse</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Live application status tracking</span>
                  </li>
                </ul>
              </article>

              <article className="relative group bg-slate-50 border border-slate-200/80 rounded-2xl p-8 transition-all duration-200 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Dashboard Analytics
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Review resumes, move candidates through stages, and see
                  conversion metrics from a single recruiter dashboard.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 border-t border-slate-200 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Pipeline stages at a glance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Time-to-hire and source insights</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                id="for-recruiters"
                className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm scroll-mt-24"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-800 mb-4">
                  For Hiring Teams
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Post jobs and review resumes in one workspace
                </h3>
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  Standardize applicant summaries, leave interview notes, and
                  manage the candidate journey without switching tools.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">
                      Centralized candidate repository with keyword filters
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">
                      Clear stages from applied to hired
                    </span>
                  </div>
                </div>
              </div>

              <div
                id="for-candidates"
                className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm scroll-mt-24"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 mb-4">
                  For Job Seekers
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Search jobs and apply without the black hole
                </h3>
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  Track status when your resume is viewed, shortlisted, or moved
                  to interview — no more guessing where you stand.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">
                      Live timeline updates on every application
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">
                      Job search matched to your uploaded profile
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl mx-auto">
              Ready to modernize hiring?
            </h2>
            <p className="mt-4 text-indigo-200 text-base sm:text-lg max-w-xl mx-auto">
              Recruiter and candidate accounts are coming next. Start from the
              role that matches how you use TalentFlow.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#for-recruiters"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-indigo-900 font-semibold hover:bg-slate-100 transition-colors shadow-md"
              >
                I am a Recruiter
              </a>
              <a
                href="#for-candidates"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-700 text-white font-semibold hover:bg-indigo-600 border border-indigo-500 transition-colors"
              >
                I am a Candidate
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800 tracking-tight">
              TalentFlow
            </span>
            <span className="text-xs text-slate-400">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Built for recruiters and candidates.
          </p>
        </div>
      </footer>
    </div>
  );
}
