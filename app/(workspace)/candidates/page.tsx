import { auth } from "@clerk/nextjs/server";
import { loadLiveJobs } from "@/lib/loadLiveJobs";
import CandidatesBoard from "./CandidatesBoard";
import OpenRolesApply from "../../components/OpenRolesApply";

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await auth.protect();
  const { q } = await searchParams;
  const liveJobs = await loadLiveJobs();

  return (
    <div className="max-w-7xl space-y-6">
      <OpenRolesApply jobs={liveJobs} />
      <CandidatesBoard initialQ={q ?? ""} />
    </div>
  );
}
