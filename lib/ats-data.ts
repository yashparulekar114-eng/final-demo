export const PIPELINE_STAGES = [
  "Applied",
  "Screening",
  "Interview",
  "Assessment",
  "Offer",
  "Hired",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export type JobStatus = "Active" | "Draft" | "Paused" | "Closed";

export type CandidateRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  role: string;
  location: string;
  experienceYears: number;
  skills: string[];
  matchScore: number;
  stage: PipelineStage;
  lastActivity: string;
  jobId: string;
  jobTitle: string;
  recruiter: string;
  source: string;
  education: string;
  about: string;
  experience: { company: string; title: string; dates: string; detail: string }[];
  educationHistory: { school: string; degree: string; dates: string }[];
  matches: string[];
  gaps: string[];
  breakdown: {
    skills: number;
    experience: number;
    education: number;
    requirements: number;
  };
};

export type MockJob = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  manager: string;
  status: JobStatus;
  posted: string;
  applicants: number;
  description: string;
  requirements: string[];
  skills: string[];
  team: string[];
};

export type MockInterview = {
  id: string;
  candidateId: string;
  candidate: string;
  role: string;
  interviewer: string;
  at: string;
  type: "Phone" | "Video" | "Onsite";
  status: "Scheduled" | "Completed" | "Cancelled";
  jobId: string;
};

export const mockJobs: MockJob[] = [
  {
    id: "job-fe",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Bengaluru · Hybrid",
    type: "Full-time",
    salary: "₹32–45 LPA",
    manager: "Priya Menon",
    status: "Active",
    posted: "12 Aug 2026",
    applicants: 48,
    description:
      "Own the recruiter-facing product surface. You will ship performant React interfaces, partner with design, and raise the quality bar for TalentFlow.",
    requirements: [
      "5+ years building production web apps",
      "Deep React and TypeScript",
      "Comfortable with design systems",
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind"],
    team: ["Priya Menon", "Arjun Shah"],
  },
  {
    id: "job-pm",
    title: "Product Manager, Hiring",
    department: "Product",
    location: "Mumbai · Onsite",
    type: "Full-time",
    salary: "₹28–40 LPA",
    manager: "Neha Kapoor",
    status: "Active",
    posted: "4 Aug 2026",
    applicants: 31,
    description:
      "Define the hiring OS for mid-market teams. Discovery, roadmap, and delivery with engineering.",
    requirements: ["4+ years product", "B2B SaaS", "Fluent with metrics"],
    skills: ["Roadmapping", "SQL", "User research"],
    team: ["Neha Kapoor"],
  },
  {
    id: "job-ds",
    title: "Data Scientist",
    department: "Data",
    location: "Remote · India",
    type: "Full-time",
    salary: "₹24–36 LPA",
    manager: "Rahul Iyer",
    status: "Paused",
    posted: "22 Jul 2026",
    applicants: 19,
    description: "Match-score models and funnel analytics for recruiting.",
    requirements: ["Python", "Applied ML", "Experiment design"],
    skills: ["Python", "SQL", "PyTorch"],
    team: ["Rahul Iyer", "Priya Menon"],
  },
  {
    id: "job-des",
    title: "Product Designer",
    department: "Design",
    location: "Pune · Hybrid",
    type: "Contract",
    salary: "₹18–26 LPA",
    manager: "Meera Joshi",
    status: "Draft",
    posted: "18 Aug 2026",
    applicants: 7,
    description: "End-to-end product design for recruiter workflows.",
    requirements: ["Portfolio of SaaS work", "Figma fluency"],
    skills: ["Figma", "Prototyping", "Design systems"],
    team: ["Meera Joshi"],
  },
  {
    id: "job-em",
    title: "Engineering Manager",
    department: "Engineering",
    location: "Hyderabad · Hybrid",
    type: "Full-time",
    salary: "₹45–60 LPA",
    manager: "Arjun Shah",
    status: "Closed",
    posted: "1 Jun 2026",
    applicants: 22,
    description: "Lead a pod shipping TalentFlow core.",
    requirements: ["Led teams of 5+", "Shipped SaaS at scale"],
    skills: ["Leadership", "TypeScript", "Hiring"],
    team: ["Arjun Shah"],
  },
];

export const mockCandidates: CandidateRecord[] = [
  {
    id: "c-ananya",
    name: "Ananya Rao",
    email: "ananya.rao@email.com",
    phone: "+91 98450 11223",
    linkedin: "https://linkedin.com/in/ananyarao",
    role: "Staff Frontend Engineer",
    location: "Bengaluru",
    experienceYears: 8,
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    matchScore: 92,
    stage: "Interview",
    lastActivity: "2h ago",
    jobId: "job-fe",
    jobTitle: "Senior Frontend Engineer",
    recruiter: "Priya Menon",
    source: "LinkedIn",
    education: "B.E. Computer Science, NITK",
    about:
      "Leads frontend architecture at a 200-person SaaS company. Strong systems thinking and hiring experience.",
    experience: [
      {
        company: "Northwind Labs",
        title: "Staff Engineer",
        dates: "2022 — Present",
        detail: "Design system, performance, and hiring loop for a 12-person frontend org.",
      },
      {
        company: "Harbor & Co.",
        title: "Senior Engineer",
        dates: "2018 — 2022",
        detail: "Rebuilt the customer dashboard in React; mentored 4 engineers.",
      },
    ],
    educationHistory: [
      { school: "NITK Surathkal", degree: "B.E. Computer Science", dates: "2014 — 2018" },
    ],
    matches: [
      "5+ years relevant experience",
      "Strong React and TypeScript experience",
      "Leadership experience",
      "Required education",
      "Excellent communication skills",
    ],
    gaps: ["Limited experience with AWS", "No experience with Kubernetes"],
    breakdown: { skills: 94, experience: 90, education: 88, requirements: 91 },
  },
  {
    id: "c-vikram",
    name: "Vikram Sethi",
    email: "vikram.sethi@email.com",
    phone: "+91 98200 44110",
    linkedin: "https://linkedin.com/in/vikramsethi",
    role: "Senior Product Manager",
    location: "Mumbai",
    experienceYears: 7,
    skills: ["Roadmapping", "SQL", "A/B testing"],
    matchScore: 86,
    stage: "Screening",
    lastActivity: "Yesterday",
    jobId: "job-pm",
    jobTitle: "Product Manager, Hiring",
    recruiter: "Neha Kapoor",
    source: "Referral",
    education: "MBA, ISB",
    about: "B2B workflow products. Previously owned onboarding activation.",
    experience: [
      {
        company: "Brightline",
        title: "Senior PM",
        dates: "2021 — Present",
        detail: "Activation up 18% through instrumentation and sequencing.",
      },
    ],
    educationHistory: [{ school: "ISB Hyderabad", degree: "MBA", dates: "2018 — 2019" }],
    matches: ["B2B SaaS product sense", "Comfortable with SQL", "Cross-functional leadership"],
    gaps: ["Limited recruiting-domain experience"],
    breakdown: { skills: 84, experience: 88, education: 90, requirements: 82 },
  },
  {
    id: "c-leah",
    name: "Leah Fernandes",
    email: "leah.f@email.com",
    phone: "+91 98111 22009",
    linkedin: "https://linkedin.com/in/leahfernandes",
    role: "Product Designer",
    location: "Goa",
    experienceYears: 5,
    skills: ["Figma", "Research", "Prototyping"],
    matchScore: 81,
    stage: "Applied",
    lastActivity: "4h ago",
    jobId: "job-des",
    jobTitle: "Product Designer",
    recruiter: "Meera Joshi",
    source: "Portfolio",
    education: "B.Des, NID",
    about: "Craft-focused product designer for dense information tools.",
    experience: [
      {
        company: "Kite Studio",
        title: "Product Designer",
        dates: "2021 — Present",
        detail: "Shipped a design system used by 40+ product surfaces.",
      },
    ],
    educationHistory: [{ school: "NID Ahmedabad", degree: "B.Des", dates: "2016 — 2020" }],
    matches: ["SaaS portfolio", "Systems thinking", "Strong visual craft"],
    gaps: ["Less experience with recruiter tools specifically"],
    breakdown: { skills: 88, experience: 76, education: 92, requirements: 74 },
  },
  {
    id: "c-kabir",
    name: "Kabir Nair",
    email: "kabir.nair@email.com",
    phone: "+91 99000 11882",
    linkedin: "https://linkedin.com/in/kabirnair",
    role: "ML Engineer",
    location: "Hyderabad",
    experienceYears: 6,
    skills: ["Python", "PyTorch", "SQL"],
    matchScore: 78,
    stage: "Assessment",
    lastActivity: "3d ago",
    jobId: "job-ds",
    jobTitle: "Data Scientist",
    recruiter: "Rahul Iyer",
    source: "Indeed",
    education: "M.Tech, IIIT-H",
    about: "Ranking and recommendations. Wants applied recruiting ML.",
    experience: [
      {
        company: "Orbit AI",
        title: "ML Engineer",
        dates: "2020 — Present",
        detail: "Search ranking; owned evaluation harness.",
      },
    ],
    educationHistory: [{ school: "IIIT Hyderabad", degree: "M.Tech CS", dates: "2018 — 2020" }],
    matches: ["Production ML", "Strong Python", "Evaluation discipline"],
    gaps: ["Fewer published papers than typical DS bar"],
    breakdown: { skills: 80, experience: 79, education: 86, requirements: 72 },
  },
  {
    id: "c-sara",
    name: "Sara D'Souza",
    email: "sara.ds@email.com",
    phone: "+91 97655 33001",
    linkedin: "https://linkedin.com/in/saradsouza",
    role: "Frontend Engineer",
    location: "Pune",
    experienceYears: 4,
    skills: ["React", "TypeScript", "CSS"],
    matchScore: 74,
    stage: "Offer",
    lastActivity: "1d ago",
    jobId: "job-fe",
    jobTitle: "Senior Frontend Engineer",
    recruiter: "Priya Menon",
    source: "Careers page",
    education: "B.Tech, COEP",
    about: "Product-minded engineer. High craft, still growing in systems scope.",
    experience: [
      {
        company: "Leaf Pay",
        title: "SDE II",
        dates: "2022 — Present",
        detail: "Checkout UI; accessibility and i18n.",
      },
    ],
    educationHistory: [{ school: "COEP Pune", degree: "B.Tech IT", dates: "2018 — 2022" }],
    matches: ["React/TS daily driver", "Product taste", "Reliable execution"],
    gaps: ["Below 5 years senior bar", "Limited staff-level leadership"],
    breakdown: { skills: 82, experience: 68, education: 80, requirements: 70 },
  },
  {
    id: "c-dev",
    name: "Dev Patel",
    email: "dev.patel@email.com",
    phone: "+91 98700 22119",
    linkedin: "https://linkedin.com/in/devpatel",
    role: "Engineering Manager",
    location: "Hyderabad",
    experienceYears: 11,
    skills: ["Leadership", "TypeScript", "Hiring"],
    matchScore: 88,
    stage: "Hired",
    lastActivity: "12d ago",
    jobId: "job-em",
    jobTitle: "Engineering Manager",
    recruiter: "Arjun Shah",
    source: "Agency",
    education: "B.E. BITS Pilani",
    about: "Manager who still reviews architecture. Hired.",
    experience: [
      {
        company: "Stackwell",
        title: "EM",
        dates: "2019 — 2026",
        detail: "Grew a team from 4 to 14; 9-month avg tenure improvement.",
      },
    ],
    educationHistory: [{ school: "BITS Pilani", degree: "B.E. CS", dates: "2009 — 2013" }],
    matches: ["Team leadership", "Hiring loop owner", "Technical depth"],
    gaps: ["Less recent IC coding"],
    breakdown: { skills: 86, experience: 94, education: 84, requirements: 90 },
  },
];

export const mockInterviews: MockInterview[] = [
  {
    id: "int-1",
    candidateId: "c-ananya",
    candidate: "Ananya Rao",
    role: "Senior Frontend Engineer",
    interviewer: "Priya Menon",
    at: "2026-08-24T10:30:00+05:30",
    type: "Video",
    status: "Scheduled",
    jobId: "job-fe",
  },
  {
    id: "int-2",
    candidateId: "c-vikram",
    candidate: "Vikram Sethi",
    role: "Product Manager, Hiring",
    interviewer: "Neha Kapoor",
    at: "2026-08-25T16:00:00+05:30",
    type: "Phone",
    status: "Scheduled",
    jobId: "job-pm",
  },
  {
    id: "int-3",
    candidateId: "c-kabir",
    candidate: "Kabir Nair",
    role: "Data Scientist",
    interviewer: "Rahul Iyer",
    at: "2026-08-21T11:00:00+05:30",
    type: "Onsite",
    status: "Completed",
    jobId: "job-ds",
  },
];

export const applicationTrend = [
  12, 18, 14, 22, 19, 25, 21, 28, 24, 31, 27, 33, 29, 36, 30, 34, 38, 32, 40, 35,
  42, 37, 41, 45, 39, 44, 48, 43, 50, 46,
];

export const funnelCounts: Record<PipelineStage, number> = {
  Applied: 86,
  Screening: 41,
  Interview: 22,
  Assessment: 14,
  Offer: 7,
  Hired: 3,
};

export function candidateById(id: string) {
  return mockCandidates.find((c) => c.id === id);
}

export function jobById(id: string) {
  return mockJobs.find((j) => j.id === id);
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}
