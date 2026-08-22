import { auth, currentUser } from "@clerk/nextjs/server";
import AppShell from "../components/AppShell";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    return <div className="min-h-screen bg-canvas">{children}</div>;
  }

  const user = await currentUser();
  const name =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "there";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  return (
    <AppShell userName={name} userEmail={email}>
      {children}
    </AppShell>
  );
}
