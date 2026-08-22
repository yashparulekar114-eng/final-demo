import { supabase } from "@/lib/supabase";

export type LiveJob = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
};

export async function loadLiveJobs(): Promise<LiveJob[]> {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return [];
    }
    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, description, status, created_at")
      .order("created_at", { ascending: false });
    if (error) return [];
    return (data ?? []) as LiveJob[];
  } catch {
    return [];
  }
}
