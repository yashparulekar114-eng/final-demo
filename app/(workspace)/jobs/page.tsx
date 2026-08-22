import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import JobsManager from "./JobsManager";

export default async function JobsPage() {
  const { userId } = await auth();
  let live: {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: string;
  }[] = [];

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, description, status, created_at")
        .order("created_at", { ascending: false });
      if (!error) {
        live = (data ?? []) as typeof live;
      }
    }
  } catch {
    live = [];
  }

  return <JobsManager liveJobs={live} signedIn={Boolean(userId)} />;
}
