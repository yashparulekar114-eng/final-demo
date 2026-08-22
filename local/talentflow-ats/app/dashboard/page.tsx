import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "../components/DashboardClient";

export default async function DashboardPage() {
  await auth.protect();

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const email = user.primaryEmailAddress?.emailAddress ?? "";
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "there";

  return (
    <DashboardClient
      user={{
        id: user.id,
        name: fullName,
        email,
        imageUrl: user.imageUrl,
      }}
    />
  );
}
