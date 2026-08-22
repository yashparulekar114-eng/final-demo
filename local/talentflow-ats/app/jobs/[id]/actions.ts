"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export type ApplyState = {
  error?: string;
  success?: boolean;
};

export async function applyToJob(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  await auth.protect();

  const user = await currentUser();
  if (!user) {
    return { error: "You must be signed in to apply." };
  }

  const jobId = String(formData.get("jobId") ?? "").trim();
  if (!jobId) {
    return { error: "Missing job id." };
  }

  const { data: existing, error: existingError } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("candidate_id", user.id)
    .maybeSingle();

  if (existingError && existingError.code !== "PGRST116") {
    return {
      error:
        existingError.code === "PGRST205" ||
        existingError.message.includes("schema cache")
          ? "The applications table is missing. Run the latest database-schema.sql in the Supabase SQL Editor."
          : existingError.message,
    };
  }

  if (existing) {
    return { success: true };
  }

  const { error } = await supabase.from("applications").insert({
    job_id: jobId,
    candidate_id: user.id,
    status: "Applied",
  });

  if (error) {
    if (error.code === "23505") {
      return { success: true };
    }
    return {
      error:
        error.code === "PGRST205" || error.message.includes("schema cache")
          ? "The applications table is missing. Run the latest database-schema.sql in the Supabase SQL Editor."
          : error.message,
    };
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  return { success: true };
}
