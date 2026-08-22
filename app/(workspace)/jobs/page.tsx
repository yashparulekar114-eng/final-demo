import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import JobsManager from "./JobsManager";

export default async function JobsPage() {
  await auth.protect();
  let live: { id: string; title: string; description: string; status: string; created_at: string }[] =
    [];

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { data } = await supabase
      .from("jobs")
      .select("id, title, description, status, created_at")
      .order("created_at", { ascending: false });
    live = (data ?? []) as typeof live;
  }

  return <JobsManager liveJobs={live} />;
}
