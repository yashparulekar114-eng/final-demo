import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "TalentFlow <onboarding@resend.dev>";

export async function sendApplicationReceivedEmail(jobTitle: string) {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  const to = process.env.RESEND_TO_EMAIL ?? "";

  if (!apiKey.startsWith("re_") || apiKey.includes("your_copied_key")) {
    throw new Error(
      "Add your real Resend API key to RESEND_API_KEY in .env.local (from resend.com → API Keys).",
    );
  }

  if (!to || !to.includes("@")) {
    throw new Error(
      "Set RESEND_TO_EMAIL in .env.local to the email you used to sign up for Resend (free-tier restriction).",
    );
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: "Application Received",
    html: `<p>Thank you for applying for the <strong>${escapeHtml(jobTitle)}</strong> role. We are reviewing your resume.</p>`,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
