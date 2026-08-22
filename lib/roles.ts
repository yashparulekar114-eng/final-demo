import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type AppRole = "recruiter" | "candidate";

type RoleMetadata = {
  publicMetadata?: unknown;
  unsafeMetadata?: unknown;
};

function readMetaRole(meta: unknown) {
  if (!meta || typeof meta !== "object" || !("role" in meta)) return "";
  const role = (meta as { role?: unknown }).role;
  return typeof role === "string" ? role.trim().toLowerCase() : "";
}

/** Role is set at sign-up via Clerk `unsafeMetadata.role` (`?role=candidate|recruiter`). */
export function getAppRole(user: RoleMetadata | null | undefined): AppRole {
  const fromPublic = readMetaRole(user?.publicMetadata);
  const fromUnsafe = readMetaRole(user?.unsafeMetadata);
  const raw = fromPublic || fromUnsafe;
  if (raw === "candidate") return "candidate";
  return "recruiter";
}

export function isRecruiter(user: RoleMetadata | null | undefined) {
  return getAppRole(user) === "recruiter";
}

export function isCandidate(user: RoleMetadata | null | undefined) {
  return getAppRole(user) === "candidate";
}

export async function syncPublicRole() {
  const user = await currentUser();
  if (!user) return null;
  const role = getAppRole(user);
  const publicRole = readMetaRole(user.publicMetadata);
  if (publicRole === role) return role;
  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: { role },
    });
  } catch (err) {
    console.error("[role] could not sync publicMetadata", err);
  }
  return role;
}

export async function requireRecruiter(redirectTo = "/jobs") {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (!isRecruiter(user)) redirect(redirectTo);
  return user;
}
