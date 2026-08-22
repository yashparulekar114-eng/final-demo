import { supabase } from "@/lib/supabase";
import type {
  DashboardApplication,
  DashboardData,
  InterviewRecord,
} from "./types";

export type { DashboardApplication, DashboardData, InterviewRecord } from "./types";

const emptyDashboard = (): DashboardData => ({
  recruiterApplications: [],
  candidateApplications: [],
  openJobCount: 0,
  applicantCount: 0,
  interviewsTableMissing: true,
});

function missingTable(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    (error.message ?? "").toLowerCase().includes("schema cache")
  );
}

function missingColumn(
  error: { message?: string } | null,
  column: string,
) {
  if (!error?.message) return false;
  return error.message.includes(column);
}

type ApplicationRow = {
  id: string;
  status: string;
  created_at: string;
  candidate_id: string;
  resume_url: string | null;
  job_id: string;
};

async function fetchApplications(
  filter: { column: "job_id" | "candidate_id"; values: string[] } | { column: "candidate_id"; value: string },
) {
  const selectWithResume = "id, status, created_at, candidate_id, resume_url, job_id";
  const selectBare = "id, status, created_at, candidate_id, job_id";

  const run = async (columns: string) => {
    let query = supabase.from("applications").select(columns);
    if ("values" in filter) {
      query = query.in(filter.column, filter.values);
    } else {
      query = query.eq(filter.column, filter.value);
    }
    return query.order("created_at", { ascending: false });
  };

  let { data, error } = await run(selectWithResume);
  if (error && missingColumn(error, "resume_url")) {
    ({ data, error } = await run(selectBare));
  }

  if (error && missingTable(error)) {
    return [] as ApplicationRow[];
  }
  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as unknown as Array<Record<string, unknown>>).map((row) => ({
    id: String(row.id),
    status: String(row.status),
    created_at: String(row.created_at),
    candidate_id: String(row.candidate_id),
    resume_url: (row.resume_url as string | null | undefined) ?? null,
    job_id: String(row.job_id),
  }));
}

export async function loadDashboardData(
  userId: string,
): Promise<DashboardData> {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return emptyDashboard();
    }

    const { data: recruiterJobs, error: jobsError } = await supabase
      .from("jobs")
      .select("id, title, status")
      .eq("recruiter_id", userId);

    if (jobsError && !missingTable(jobsError)) {
      throw new Error(jobsError.message);
    }

    const jobs = recruiterJobs ?? [];
    const jobTitleById = new Map(
      jobs.map((job) => [job.id as string, job.title as string]),
    );
    const recruiterJobIds = jobs.map((job) => job.id as string);

    const receivedApps = recruiterJobIds.length
      ? await fetchApplications({ column: "job_id", values: recruiterJobIds })
      : [];
    const myApps = await fetchApplications({
      column: "candidate_id",
      value: userId,
    });

    const extraJobIds = [
      ...new Set(
        myApps.map((app) => app.job_id).filter((id) => !jobTitleById.has(id)),
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

    const allApps = [...receivedApps, ...myApps];
    const applicationIds = [...new Set(allApps.map((app) => app.id))];

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

    const toDashboard = (app: ApplicationRow): DashboardApplication => ({
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
  } catch {
    return emptyDashboard();
  }
}
