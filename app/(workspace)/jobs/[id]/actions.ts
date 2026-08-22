"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { uploadResumeToBucket } from "@/lib/uploadResume";
import { sendApplicationReceivedEmail } from "@/lib/resend";

export type ApplyFailedStep = "upload" | "database" | "email" | "auth";

export type ApplyState = {
  error?: string;
  success?: boolean;
  failedStep?: ApplyFailedStep;
};

function serializeUnknown(err: unknown) {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      cause: err.cause,
    };
  }
  if (err && typeof err === "object") {
    try {
      return JSON.parse(JSON.stringify(err));
    } catch {
      return { message: String(err) };
    }
  }
  return { message: String(err) };
}

function applyError(
  failedStep: ApplyFailedStep,
  prefix: string,
  err: unknown,
): ApplyState {
  const detail =
    err instanceof Error
      ? err.message
      : err && typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : "Unknown error";
  return {
    success: failedStep === "email",
    failedStep,
    error: `${prefix}: ${detail}`,
  };
}

export async function applyToJob(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  await auth.protect();

  try {
    const user = await currentUser();
    if (!user) {
      return {
        failedStep: "auth",
        error: "You must be signed in to apply.",
      };
    }

    const jobId = String(formData.get("jobId") ?? "").trim();
    if (!jobId) {
      return { error: "Missing job id." };
    }

    const resume = formData.get("resume");
    const hasResumeFile =
      resume instanceof File && resume.size > 0;

    let resumeUrl: string | null = null;
    if (hasResumeFile) {
      try {
        resumeUrl = await uploadResumeToBucket(resume, user.id);
      } catch (err) {
        console.error("[applyToJob] Resume upload failed", serializeUnknown(err));
        return applyError("upload", "Resume upload failed", err);
      }
    }

    try {
      const { data: existing, error: existingError } = await supabase
        .from("applications")
        .select("id, resume_url")
        .eq("job_id", jobId)
        .eq("candidate_id", user.id)
        .maybeSingle();

      if (existingError && existingError.message.includes("resume_url")) {
        const fallback = await supabase
          .from("applications")
          .select("id")
          .eq("job_id", jobId)
          .eq("candidate_id", user.id)
          .maybeSingle();
        if (fallback.data) {
          revalidatePath("/applications");
          return { success: true };
        }
      } else if (existingError && existingError.code !== "PGRST116") {
        console.error(
          "[applyToJob] Application lookup failed",
          serializeUnknown(existingError),
        );
        const message =
          existingError.code === "PGRST205" ||
          existingError.message.includes("schema cache")
            ? "The applications table is missing. Run the latest database-schema.sql in the Supabase SQL Editor."
            : existingError.message;
        return { failedStep: "database", error: message };
      }

      if (existing) {
        if (resumeUrl) {
          const { error: updateError } = await supabase
            .from("applications")
            .update({ resume_url: resumeUrl, status: "Applied" })
            .eq("id", existing.id);

          if (updateError) {
            console.error(
              "[applyToJob] Application update failed",
              serializeUnknown(updateError),
            );
            return { failedStep: "database", error: updateError.message };
          }
        }
        revalidatePath(`/jobs/${jobId}`);
        revalidatePath("/jobs");
        revalidatePath("/dashboard");
        revalidatePath("/applications");
        return { success: true };
      }

      const insertPayload: {
        job_id: string;
        candidate_id: string;
        status: string;
        resume_url?: string;
      } = {
        job_id: jobId,
        candidate_id: user.id,
        status: "Applied",
      };
      if (resumeUrl) insertPayload.resume_url = resumeUrl;

      const { error } = await supabase.from("applications").insert(insertPayload);

      if (error) {
        console.error(
          "[applyToJob] Application insert failed",
          serializeUnknown(error),
        );
        if (error.code === "23505") {
          revalidatePath("/applications");
          return { success: true };
        }
        if (error.message.includes("resume_url") && resumeUrl) {
          const retry = await supabase.from("applications").insert({
            job_id: jobId,
            candidate_id: user.id,
            status: "Applied",
          });
          if (retry.error) {
            return { failedStep: "database", error: retry.error.message };
          }
        } else {
          return { failedStep: "database", error: error.message };
        }
      }
    } catch (err) {
      console.error(
        "[applyToJob] Application database failed",
        serializeUnknown(err),
      );
      return applyError("database", "Could not save the application", err);
    }

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/jobs");
    revalidatePath("/dashboard");
    revalidatePath("/applications");

    let jobTitle = "open";
    try {
      const { data: job } = await supabase
        .from("jobs")
        .select("title")
        .eq("id", jobId)
        .maybeSingle();
      jobTitle = job?.title?.trim() || "open";
    } catch (err) {
      console.error("[applyToJob] Job title lookup failed", serializeUnknown(err));
    }

    try {
      await sendApplicationReceivedEmail(jobTitle);
    } catch (err) {
      console.error(
        "[applyToJob] Email notification failed",
        serializeUnknown(err),
      );
      return applyError("email", "Email notification failed", err);
    }

    return { success: true };
  } catch (err) {
    console.error("[applyToJob] Unhandled error", serializeUnknown(err));
    return applyError("database", "Application could not be completed", err);
  }
}
