import { supabase } from "./supabase";

const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadResumeToBucket(
  file: File,
  candidateId: string,
): Promise<string> {
  const isPdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    throw new Error("Only PDF resumes are allowed.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("Resume must be 5MB or smaller.");
  }

  const path = `${candidateId}/${Date.now()}.pdf`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabase.storage.from("resumes").upload(path, buffer, {
    contentType: "application/pdf",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data: publicUrl } = supabase.storage.from("resumes").getPublicUrl(
    data?.path ?? path,
  );
  return publicUrl.publicUrl;
}
