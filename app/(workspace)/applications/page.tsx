import { auth } from "@clerk/nextjs/server";
import ApplicationsBoard from "./ApplicationsBoard";

export default async function ApplicationsPage() {
  await auth.protect();
  return <ApplicationsBoard />;
}
