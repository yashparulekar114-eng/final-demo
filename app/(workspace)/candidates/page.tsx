import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isRecruiter } from "@/lib/roles";
import CandidatesBoard from "./CandidatesBoard";

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await auth.protect();
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (!isRecruiter(user)) redirect("/jobs");

  const { q } = await searchParams;

  return <CandidatesBoard initialQ={q ?? ""} />;
}
