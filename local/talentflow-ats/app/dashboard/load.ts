import { supabase } from "@/lib/supabase";
import type {
  DashboardApplication,
  DashboardData,
  InterviewRecord,
} from "./types";

export type { DashboardApplication, DashboardData, InterviewRecord } from "./types";

function missingTable(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    (error.message ?? "").toLowerCase().includes("schema cache")
  );
}

export async function loadDashboardData(
  userId: string,
): Promise<DashboardData> {
  const { data: recruiterJobs, error: jobsError } = await supabase
    .from("jobs")
    .select("id, title, status")
    .eq("recruiter_id", userId);

  if (jobsError && !missingTable(jobsError)) {
    throw new Error(jobsError.message);
  }

  const jobs = recruiterJobs ?? [];
  const jobTitleById = new Map(jobs.map((job) => [job.id as string, job.title as string]));
  const recruiterJobIds = jobs.map((job) => job.id as string);

  const { data: received, error: receivedError } = recruiterJobIds.length
    ? await supabase
        .from("applications")
        .select("id, status, created_at, candidate_id, resume_url, job_id")
        .in("job_id", recruiterJobIds)
        .order("created_at", { ascending: false })
    : { data: [], error: null };

  if (receivedError && !missingTable(receivedError)) {
    throw new Error(receivedError.message);
  }

  const { data: mine, error: mineError } = await supabase
    .from("applications")
    .select("id, status, created_at, candidate_id, resume_url, job_id")
    .eq("candidate_id", userId)
    .order("created_at", { ascending: false });

  if (mineError && !missingTable(mineError)) {
    throw new Error(mineError.message);
  }

  const myApps = mine ?? [];
  const extraJobIds = [
    ...new Set(
      myApps
        .map((app) => app.job_id as string)
        .filter((id) => !jobTitleById.has(id)),
    ),
  ];

  if (extraJobIds.length) {
    const { data: extraJobs } = await supabase
      .from("jobs")
      .select("id, title")
      .in("id", extraJobIds);
    for (const job of extraJobs ?? []) {
      jobTitleById.set(job.id as string, job.title as string);
    }
  }

  const receivedApps = received ?? [];
  const allApps = [...receivedApps, ...myApps];
  const applicationIds = [...new Set(allApps.map((app) => app.id as string))];

  let interviews: InterviewRecord[] = [];
  let interviewsTableMissing = false;

  if (applicationIds.length) {
    const { data: interviewRows, error: interviewError } = await supabase
      .from("interviews")
      .select("id, application_id, scheduled_time, link, status")
      .in("application_id", applicationIds);

    if (interviewError) {
      interviewsTableMissing = missingTable(interviewError);
      if (!interviewsTableMissing) {
        throw new Error(interviewError.message);
      }
    } else {
      interviews = (interviewRows ?? []) as InterviewRecord[];
    }
  }

  const interviewByApp = new Map<string, InterviewRecord>();
  for (const row of interviews) {
    const existing = interviewByApp.get(row.application_id);
    if (!existing || row.scheduled_time > existing.scheduled_time) {
      interviewByApp.set(row.application_id, row);
    }
  }

  const toDashboard = (app: {
    id: string;
    status: string;
    created_at: string;
    candidate_id: string;
    resume_url: string | null;
    job_id: string;
  }): DashboardApplication => ({
    id: app.id,
    status: app.status,
    created_at: app.created_at,
    candidate_id: app.candidate_id,
    resume_url: app.resume_url,
    job_id: app.job_id,
    job_title: jobTitleById.get(app.job_id) ?? "Untitled role",
    interview: interviewByApp.get(app.id) ?? null,
  });

  return {
    recruiterApplications: receivedApps.map(toDashboard),
    candidateApplications: myApps.map(toDashboard),
    openJobCount: jobs.filter((job) => job.status === "Open").length,
    applicantCount: receivedApps.length,
    interviewsTableMissing,
  };
}
