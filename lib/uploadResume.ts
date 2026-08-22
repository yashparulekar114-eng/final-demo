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

  const { error } = await supabase.storage.from("resumes").upload(path, buffer, {
    contentType: "application/pdf",
    upsert: false,
  });

  if (error) {
    if (error.message.toLowerCase().includes("bucket") || error.message.includes("not found")) {
      throw new Error(
        'The "resumes" storage bucket is missing. Create it (public) in Supabase Storage, or run the latest database-schema.sql.',
      );
    }
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("resumes").getPublicUrl(path);
  return data.publicUrl;
}
