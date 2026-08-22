import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Linkedin, Mail, Phone, FileText } from "lucide-react";
import { candidateById } from "@/lib/ats-data";
import { Avatar, MatchBar, StatusBadge } from "../../../components/ui";
import NotesPanel from "./NotesPanel";

export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await auth.protect();
  const { id } = await params;
  const c = candidateById(id);
  if (!c) notFound();

  return (
    <div className="max-w-5xl space-y-8">
      <Link href="/candidates" className="btn-text text-muted">
        <ArrowLeft className="h-4 w-4" />
        Candidates
      </Link>

      <header className="card-quiet p-6 flex flex-col md:flex-row gap-6">
        <Avatar name={c.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{c.name}</h1>
            <StatusBadge tone="indigo">{c.stage}</StatusBadge>
          </div>
          <p className="mt-1 text-sm text-muted">
            {c.role} · {c.location}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
              <Mail className="h-4 w-4" />
              {c.email}
            </a>
            <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
              <Phone className="h-4 w-4" />
              {c.phone}
            </a>
            <a
              href={c.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
        <div className="md:text-right space-y-3">
          <p className="text-3xl font-semibold tracking-tight text-accent">{c.matchScore}%</p>
          <p className="text-xs font-medium text-muted">ATS match</p>
          <a href={`mailto:${c.email}`} className="btn-secondary">
            <FileText className="h-4 w-4" />
            Request resume
          </a>
        </div>
      </header>

      <section className="card-quiet p-6 grid sm:grid-cols-2 gap-5">
        <MatchBar label="Skills match" value={c.breakdown.skills} />
        <MatchBar label="Experience match" value={c.breakdown.experience} />
        <MatchBar label="Education match" value={c.breakdown.education} />
        <MatchBar label="Job requirements match" value={c.breakdown.requirements} />
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <article className="card-quiet p-6">
            <h2 className="text-sm font-semibold">Resume</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.about}</p>
          </article>
          <article className="card-quiet p-6">
            <h2 className="text-sm font-semibold">Experience</h2>
            <ul className="mt-4 space-y-4">
              {c.experience.map((e) => (
                <li key={e.company}>
                  <p className="text-sm font-medium">
                    {e.title} · {e.company}
                  </p>
                  <p className="text-xs text-muted">{e.dates}</p>
                  <p className="mt-1 text-sm text-slate-700">{e.detail}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className="card-quiet p-6">
            <h2 className="text-sm font-semibold">Education</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {c.educationHistory.map((e) => (
                <li key={e.school}>
                  <span className="font-medium">{e.degree}</span>
                  <span className="text-muted"> · {e.school} · {e.dates}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="card-quiet p-6">
            <h2 className="text-sm font-semibold">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <StatusBadge key={s}>{s}</StatusBadge>
              ))}
            </div>
          </article>
          <article className="card-quiet p-6">
            <h2 className="text-sm font-semibold">AI match analysis</h2>
            <p className="mt-1 text-xs text-muted">Why this candidate matches</p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              {c.matches.map((m) => (
                <li key={m}>✓ {m}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted">Potential gaps</p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              {c.gaps.map((m) => (
                <li key={m}>⚠ {m}</li>
              ))}
            </ul>
          </article>
          <article className="card-quiet p-6">
            <h2 className="text-sm font-semibold">Interview feedback</h2>
            <p className="mt-3 text-sm text-slate-700">
              Strong product sense and clear communication. Follow up on systems design in the next
              round.
            </p>
          </article>
        </div>
        <div className="space-y-6">
          <NotesPanel />
          <article className="card-quiet p-6">
            <h2 className="text-sm font-semibold">Activity</h2>
            <ol className="mt-4 space-y-3 text-sm border-l border-line pl-4">
              <li>
                <p className="font-medium">Moved to {c.stage}</p>
                <p className="text-xs text-muted">{c.lastActivity}</p>
              </li>
              <li>
                <p className="font-medium">Applied to {c.jobTitle}</p>
                <p className="text-xs text-muted">Sourced via {c.source}</p>
              </li>
              <li>
                <p className="font-medium">Recruiter assigned</p>
                <p className="text-xs text-muted">{c.recruiter}</p>
              </li>
            </ol>
          </article>
        </div>
      </div>
    </div>
  );
}
