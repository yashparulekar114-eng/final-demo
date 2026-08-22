import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { loadDashboardData } from "../dashboard/load";
import ApplicationsBoard from "./ApplicationsBoard";
import { isCandidate } from "@/lib/roles";

export default async function ApplicationsPage() {
  await auth.protect();
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const live = await loadDashboardData(user.id);

  return (
    <ApplicationsBoard
      recruiterApplications={live.recruiterApplications}
      candidateApplications={live.candidateApplications}
      isCandidate={isCandidate(user)}
    />
  );
}
