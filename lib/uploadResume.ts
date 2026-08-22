import { supabase } from "./supabase";

const BUCKET = "resumes";
const MAX_BYTES = 5 * 1024 * 1024;

function isPdfFile(file: File) {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  return type === "application/pdf" || name.endsWith(".pdf");
}

function uniqueResumePath(candidateId: string) {
  const safeId = candidateId.replace(/[^a-zA-Z0-9_-]/g, "_");
  const unique =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${safeId}/${Date.now()}-${unique}.pdf`;
}

/**
 * Uploads a PDF to the public `resumes` storage bucket and returns its public URL.
 * Object keys are `{candidateId}/{timestamp}-{uuid}.pdf` so files never overwrite.
 */
export async function uploadResumeToBucket(
  file: File,
  candidateId: string,
): Promise<string> {
  if (!isPdfFile(file)) {
    throw new Error("Only PDF files are allowed.");
  }

  if (file.size === 0) {
    throw new Error("The resume file is empty.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("Resume must be 5MB or smaller.");
  }

  const path = uniqueResumePath(candidateId);
  const buffer = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: "application/pdf",
    upsert: false,
  });

  if (error) {
    const message = error.message.toLowerCase();
    if (message.includes("bucket") || message.includes("not found")) {
      throw new Error(
        'The "resumes" storage bucket is missing. Run database-schema.sql in the Supabase SQL Editor.',
      );
    }
    throw error;
  }

  const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(
    data?.path ?? path,
  );

  if (!publicUrl.publicUrl) {
    throw new Error("Upload succeeded but no public URL was returned.");
  }

  return publicUrl.publicUrl;
}
