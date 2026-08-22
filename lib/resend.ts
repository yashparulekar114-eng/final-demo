import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "TalentFlow <onboarding@resend.dev>";

/** Free-tier Resend only delivers to the account owner. Hardcoded for production tests. */
const TEST_TO = "yashparulekar114@gmail.com";

export async function sendApplicationReceivedEmail(jobTitle: string) {
  const apiKey = process.env.RESEND_API_KEY ?? "";

  if (!apiKey.startsWith("re_") || apiKey.includes("your_copied_key")) {
    throw new Error(
      "Add your real Resend API key to RESEND_API_KEY (Vercel env vars or .env.local).",
    );
  }

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: TEST_TO,
    subject: "Application Received",
    html: `<p>Thank you for applying for the <strong>${escapeHtml(jobTitle)}</strong> role. We are reviewing your resume.</p>`,
  });

  if (error) {
    throw error;
  }

  return data;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
