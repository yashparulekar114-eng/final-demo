"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !description) {
    return { error: "Job title and description are required." };
  }

  const { error } = await supabase.from("jobs").insert({
    title,
    description,
    recruiter_id: user.id,
    status: "Open",
  });

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
