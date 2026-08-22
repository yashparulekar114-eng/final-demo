export type InterviewRecord = {
  id: string;
  application_id: string;
  scheduled_time: string;
  link: string;
  status: string;
};

export type DashboardApplication = {
  id: string;
  status: string;
  created_at: string;
  candidate_id: string;
  resume_url: string | null;
  job_id: string;
  job_title: string;
  interview: InterviewRecord | null;
};

export type DashboardData = {
  recruiterApplications: DashboardApplication[];
  candidateApplications: DashboardApplication[];
  openJobCount: number;
  applicantCount: number;
  interviewsTableMissing: boolean;
};
