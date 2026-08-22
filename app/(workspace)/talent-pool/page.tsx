import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { mockCandidates } from "@/lib/ats-data";
import { Avatar, StatusBadge } from "../../components/ui";

export default async function TalentPoolPage() {
  await auth.protect();
  const pool = mockCandidates.filter((c) => c.stage === "Hired" || c.matchScore >= 80);

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Talent pool</h1>
        <p className="text-sm text-muted mt-1">
          Silver-medalist and high-match people you may want for a future req.
        </p>
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {pool.map((c) => (
          <li key={c.id} className="card-quiet p-4 flex gap-3">
            <Avatar name={c.name} />
            <div className="min-w-0">
              <Link href={`/candidates/${c.id}`} className="font-medium hover:text-accent">
                {c.name}
              </Link>
              <p className="text-sm text-muted">{c.role}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {c.skills.slice(0, 3).map((s) => (
                  <StatusBadge key={s}>{s}</StatusBadge>
                ))}
              </div>
            </div>
            <span className="ml-auto text-sm font-semibold text-accent">{c.matchScore}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
