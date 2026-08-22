import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { mockInterviews } from "@/lib/ats-data";
import { StatusBadge } from "../../components/ui";
import LiveInterviews from "./LiveInterviews";
import { loadDashboardData } from "../dashboard/load";

export default async function InterviewsPage() {
  await auth.protect();
  const user = await currentUser();
  const live = user ? await loadDashboardData(user.id) : null;

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Interviews</h1>
        <p className="text-sm text-muted mt-1">Schedule, join, and review upcoming conversations.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d) => (
          <div
            key={d.toISOString()}
            className="min-w-16 rounded-xl border border-line bg-surface px-3 py-2 text-center"
          >
            <p className="text-[10px] uppercase text-muted">
              {d.toLocaleDateString(undefined, { weekday: "short" })}
            </p>
            <p className="text-sm font-semibold">{d.getDate()}</p>
          </div>
        ))}
      </div>

      <section className="card-quiet overflow-hidden">
        <div className="px-5 py-3 border-b border-line text-sm font-semibold">Upcoming</div>
        <ul className="divide-y divide-line">
          {mockInterviews.map((i) => (
            <li key={i.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
              <div>
                <Link href={`/candidates/${i.candidateId}`} className="font-medium hover:text-accent">
                  {i.candidate}
                </Link>
                <p className="text-muted">
                  {i.role} · {i.interviewer} · {i.type}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge tone={i.status === "Scheduled" ? "indigo" : "slate"}>
                  {i.status}
                </StatusBadge>
                <span className="text-muted">
                  {new Date(i.at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {live ? (
        <LiveInterviews
          recruiterApplications={live.recruiterApplications}
          candidateApplications={live.candidateApplications}
          interviewsTableMissing={live.interviewsTableMissing}
        />
      ) : null}
    </div>
  );
}
