import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardOverview from "../../components/DashboardOverview";
import { loadDashboardData } from "./load";

export default async function DashboardPage() {
  await auth.protect();

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "there";

  let openJobCount = 0;
  let applicantCount = 0;
  try {
    const live = await loadDashboardData(user.id);
    openJobCount = live.openJobCount;
    applicantCount = live.applicantCount;
  } catch {
    openJobCount = 0;
    applicantCount = 0;
  }

  return (
    <DashboardOverview
      name={fullName}
      liveJobs={openJobCount}
      liveApplicants={applicantCount}
    />
  );
}
