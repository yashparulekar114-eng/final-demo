import { auth } from "@clerk/nextjs/server";
import CandidatesBoard from "./CandidatesBoard";

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await auth.protect();
  const { q } = await searchParams;
  return <CandidatesBoard initialQ={q ?? ""} />;
}
