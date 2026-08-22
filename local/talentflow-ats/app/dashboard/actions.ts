"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export type ScheduleInterviewState = {
  error?: string;
  success?: boolean;
};

function missingTable(error: { code?: string; message?: string }) {
  return (
    error.code === "PGRST205" ||
    (error.message ?? "").toLowerCase().includes("schema cache")
  );
}

function normalizeMeetingUrl(raw: string) {
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export async function scheduleInterview(
  _prev: ScheduleInterviewState,
  formData: FormData,
): Promise<ScheduleInterviewState> {
  await auth.protect();

  const user = await currentUser();
  if (!user) {
    return { error: "You must be signed in to schedule an interview." };
  }

  const applicationId = String(formData.get("applicationId") ?? "").trim();
  const scheduledRaw = String(formData.get("scheduled_time") ?? "").trim();
  const linkRaw = String(formData.get("link") ?? "").trim();

  if (!applicationId) {
    return { error: "Missing application." };
  }

  const scheduled = new Date(scheduledRaw);
  if (!scheduledRaw || Number.isNaN(scheduled.getTime())) {
    return { error: "Choose a valid date and time." };
  }

  const link = normalizeMeetingUrl(linkRaw);
  if (!link) {
    return { error: "Enter a valid meeting URL (https://…)." };
  }

  const { data: application, error: applicationError } = await supabase
    .from("applications")
    .select("id, job_id")
    .eq("id", applicationId)
    .maybeSingle();

  if (applicationError) {
    return { error: applicationError.message };
  }
  if (!application) {
    return { error: "Application not found." };
  }

  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .select("id, recruiter_id")
    .eq("id", application.job_id)
    .maybeSingle();

  if (jobError) {
    return { error: jobError.message };
  }
  if (!job || job.recruiter_id !== user.id) {
    return { error: "You can only schedule interviews for your own jobs." };
  }

  const payload = {
    application_id: applicationId,
    scheduled_time: scheduled.toISOString(),
    link,
    status: "Scheduled",
  };

  const { data: existing, error: existingError } = await supabase
    .from("interviews")
    .select("id")
    .eq("application_id", applicationId)
    .maybeSingle();

  if (existingError && missingTable(existingError)) {
    return {
      error:
        "The interviews table is missing. Run the latest database-schema.sql in the Supabase SQL Editor.",
    };
  }
  if (existingError && existingError.code !== "PGRST116") {
    return { error: existingError.message };
  }

  if (existing) {
    const { error: updateInterviewError } = await supabase
      .from("interviews")
      .update(payload)
      .eq("id", existing.id);
    if (updateInterviewError) {
      return { error: updateInterviewError.message };
    }
  } else {
    const { error: insertError } = await supabase.from("interviews").insert(payload);
    if (insertError) {
      if (missingTable(insertError)) {
        return {
          error:
            "The interviews table is missing. Run the latest database-schema.sql in the Supabase SQL Editor.",
        };
      }
      return { error: insertError.message };
    }
  }

  const { error: statusError } = await supabase
    .from("applications")
    .update({ status: "Interviewing" })
    .eq("id", applicationId);

  if (statusError) {
    return { error: statusError.message };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/jobs/${application.job_id}`);
  return { success: true };
}
