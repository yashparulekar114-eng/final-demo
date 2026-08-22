"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isRecruiter } from "@/lib/roles";

export type CreateJobState = {
  error?: string;
};

export async function createJob(
  _prev: CreateJobState,
  formData: FormData,
): Promise<CreateJobState> {
  await auth.protect();

  const user = await currentUser();
  if (!user) {
    return { error: "You must be signed in to post a job." };
  }

  if (!isRecruiter(user)) {
    return { error: "Only recruiters can post jobs." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !description) {
    return { error: "Job title and description are required." };
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { error: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY." };
  }

  let error;
  try {
    ({ error } = await supabase.from("jobs").insert({
      title,
      description,
      recruiter_id: user.id,
      status: "Open",
    }));
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Could not create the job.",
    };
  }

  if (error) {
    return {
      error:
        error.message.includes("schema cache") || error.code === "PGRST205"
          ? "The jobs table is missing. Run database-schema.sql in the Supabase SQL Editor, then try again."
          : error.message,
    };
  }

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  redirect("/jobs");
}
