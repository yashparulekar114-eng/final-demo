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

  const live = await loadDashboardData(user.id);

  return (
    <DashboardOverview
      name={fullName}
      liveJobs={live.openJobCount}
      liveApplicants={live.applicantCount}
    />
  );
}
