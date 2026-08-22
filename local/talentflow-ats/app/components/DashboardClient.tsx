"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle2,
  Building2,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

type Role = "recruiter" | "candidate";

type DashboardUser = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

const mockApplications = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "Northwind Labs",
    status: "Applied" as const,
    updated: "2 days ago",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Harbor & Co.",
    status: "Interviewing" as const,
    updated: "Yesterday",
  },
  {
    id: "3",
    title: "Full-Stack Developer",
    company: "Brightline",
    status: "Applied" as const,
    updated: "5 days ago",
  },
];

export default function DashboardClient({ user }: { user: DashboardUser }) {
  const [role, setRole] = useState<Role>("recruiter");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Talent<span className="text-indigo-600">Flow</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </span>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Welcome back</p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              {user.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">{user.email}</p>
          </div>

          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm self-start">
            <button
              type="button"
              onClick={() => setRole("recruiter")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                role === "recruiter"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                role === "candidate"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Search className="w-4 h-4" />
              Candidate
            </button>
          </div>
        </div>

        {role === "recruiter" ? <RecruiterView /> : <CandidateView />}
      </main>
    </div>
  );
}

function RecruiterView() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <article className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
            <Briefcase className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Active Jobs</p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">12</p>
          <p className="mt-2 text-sm text-slate-500">Open roles currently accepting applicants</p>
        </article>

        <article className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">Total Candidates</p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">84</p>
          <p className="mt-2 text-sm text-slate-500">Applicants across all open pipelines</p>
        </article>
      </div>

      <Link
        href="/jobs/new"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Create New Job
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function CandidateView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold text-slate-900">My Applications</h2>
        <p className="mt-1 text-sm text-slate-500">
          Track where each application stands. Data is mock until we wire Supabase.
        </p>
      </div>

      <ul className="space-y-4">
        {mockApplications.map((app) => (
          <li
            key={app.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{app.title}</p>
                <p className="text-sm text-slate-500">{app.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <StatusBadge status={app.status} />
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {app.updated}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/jobs"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
      >
        <Search className="w-5 h-5" />
        Browse Jobs
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function StatusBadge({ status }: { status: "Applied" | "Interviewing" }) {
  const isInterview = status === "Interviewing";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        isInterview
          ? "bg-blue-50 text-blue-700 border border-blue-100"
          : "bg-slate-100 text-slate-700 border border-slate-200"
      }`}
    >
      {isInterview ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <Clock className="w-3.5 h-3.5" />
      )}
      {status}
    </span>
  );
}
