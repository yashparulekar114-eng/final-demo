"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { uploadResumeToBucket } from "@/lib/uploadResume";

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

  const resume = formData.get("resume");
  if (!(resume instanceof File) || resume.size === 0) {
    return { error: "Please attach a PDF resume." };
  }

  let resumeUrl: string;
  try {
    resumeUrl = await uploadResumeToBucket(resume, user.id);
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Resume upload failed.",
    };
  }

  const { data: existing, error: existingError } = await supabase
    .from("applications")
    .select("id, resume_url")
    .eq("job_id", jobId)
    .eq("candidate_id", user.id)
    .maybeSingle();

  if (existingError && existingError.code !== "PGRST116") {
    const missingCol = existingError.message.includes("resume_url");
    return {
      error:
        existingError.code === "PGRST205" ||
        existingError.message.includes("schema cache")
          ? "The applications table is missing. Run the latest database-schema.sql in the Supabase SQL Editor."
          : missingCol
            ? "Add resume_url by running the latest database-schema.sql in the Supabase SQL Editor."
            : existingError.message,
    };
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("applications")
      .update({ resume_url: resumeUrl, status: "Applied" })
      .eq("id", existing.id);

    if (updateError) {
      return { error: updateError.message };
    }
  } else {
    const { error } = await supabase.from("applications").insert({
      job_id: jobId,
      candidate_id: user.id,
      status: "Applied",
      resume_url: resumeUrl,
    });

    if (error) {
      if (error.code === "23505") {
        await supabase
          .from("applications")
          .update({ resume_url: resumeUrl })
          .eq("job_id", jobId)
          .eq("candidate_id", user.id);
      } else if (error.message.includes("resume_url")) {
        return {
          error:
            "Add resume_url by running the latest database-schema.sql in the Supabase SQL Editor.",
        };
      } else {
        return { error: error.message };
      }
    }
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  return { success: true };
}
