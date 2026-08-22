"use client";

import type { DashboardApplication } from "../dashboard/types";
import ScheduleInterviewForm from "../dashboard/ScheduleInterviewForm";

export default function LiveInterviews({
  recruiterApplications,
  candidateApplications,
  interviewsTableMissing,
}: {
  recruiterApplications: DashboardApplication[];
  candidateApplications: DashboardApplication[];
  interviewsTableMissing: boolean;
}) {
  return (
    <div className="space-y-8">
      {interviewsTableMissing ? (
        <p className="text-sm text-muted">
          Live scheduling needs the interviews table. Run database-schema.sql, then refresh.
        </p>
      ) : null}

      <section>
        <h2 className="text-sm font-semibold">Your jobs — schedule</h2>
        {recruiterApplications.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No live applications on your posted jobs yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {recruiterApplications.map((a) => (
              <li key={a.id} className="py-5">
                <p className="font-medium text-sm">{a.job_title}</p>
                <p className="text-xs text-muted mt-1">
                  {a.status}
                  {a.interview
                    ? ` · ${new Date(a.interview.scheduled_time).toLocaleString()}`
                    : ""}
                </p>
                <ScheduleInterviewForm
                  applicationId={a.id}
                  existing={
                    a.interview
                      ? { scheduled_time: a.interview.scheduled_time, link: a.interview.link }
                      : null
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold">As candidate — join</h2>
        <ul className="mt-3 space-y-3">
          {candidateApplications.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 text-sm">
              <span>{a.job_title}</span>
              {a.interview?.link ? (
                <a href={a.interview.link} className="btn-primary" target="_blank" rel="noreferrer">
                  Join interview
                </a>
              ) : (
                <span className="text-muted">No interview yet</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
