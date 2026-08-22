import { auth, currentUser } from "@clerk/nextjs/server";
import { loadLiveJobs } from "@/lib/loadLiveJobs";
import { isRecruiter } from "@/lib/roles";
import JobsManager from "./JobsManager";

export default async function JobsPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const live = await loadLiveJobs();
  return (
    <JobsManager
      liveJobs={live}
      signedIn={Boolean(userId)}
      isRecruiter={Boolean(user) && isRecruiter(user)}
    />
  );
}
