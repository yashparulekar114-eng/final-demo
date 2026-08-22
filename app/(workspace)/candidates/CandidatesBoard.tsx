"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { mockCandidates, PIPELINE_STAGES } from "@/lib/ats-data";
import { Avatar, StatusBadge, EmptyState } from "../../components/ui";

export default function CandidatesBoard({ initialQ }: { initialQ: string }) {
  const [q, setQ] = useState(initialQ);
  const [skill, setSkill] = useState("All");
  const [exp, setExp] = useState("All");
  const [loc, setLoc] = useState("All");
  const [minMatch, setMinMatch] = useState(0);
  const [stage, setStage] = useState<string>("All");

  const skills = ["All", ...new Set(mockCandidates.flatMap((c) => c.skills))];
  const locs = ["All", ...new Set(mockCandidates.map((c) => c.location))];

  const rows = useMemo(() => {
    return mockCandidates.filter((c) => {
      const text = `${c.name} ${c.role} ${c.skills.join(" ")}`.toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      if (skill !== "All" && !c.skills.includes(skill)) return false;
      if (loc !== "All" && c.location !== loc) return false;
      if (stage !== "All" && c.stage !== stage) return false;
      if (c.matchScore < minMatch) return false;
      if (exp === "5+" && c.experienceYears < 5) return false;
      if (exp === "0-4" && c.experienceYears >= 5) return false;
      return true;
    });
  }, [q, skill, exp, loc, minMatch, stage]);

  return (
    <div className="max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">People in pipeline</h1>
        <p className="text-sm text-muted mt-1">
          Recruiter view of candidates. To apply yourself, use Apply on the open
          roles above.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        <label className="relative xl:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            className="field pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, role, skill"
          />
        </label>
        <select className="field" value={skill} onChange={(e) => setSkill(e.target.value)}>
          {skills.map((s) => (
            <option key={s}>{s === "All" ? "All skills" : s}</option>
          ))}
        </select>
        <select className="field" value={exp} onChange={(e) => setExp(e.target.value)}>
          <option value="All">All experience</option>
          <option value="0-4">0–4 years</option>
          <option value="5+">5+ years</option>
        </select>
        <select className="field" value={loc} onChange={(e) => setLoc(e.target.value)}>
          {locs.map((s) => (
            <option key={s}>{s === "All" ? "All locations" : s}</option>
          ))}
        </select>
        <select className="field" value={stage} onChange={(e) => setStage(e.target.value)}>
          <option>All</option>
          {PIPELINE_STAGES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-3 text-sm text-muted max-w-sm">
        Match ≥ {minMatch}%
        <input
          type="range"
          min={0}
          max={100}
          value={minMatch}
          onChange={(e) => setMinMatch(Number(e.target.value))}
          className="flex-1 accent-indigo-600"
        />
      </label>

      {rows.length === 0 ? (
        <EmptyState title="No candidates" body="Adjust filters to see people in the pipeline." />
      ) : (
        <div className="overflow-x-auto card-quiet">
          <table className="w-full text-sm text-left min-w-[960px]">
            <thead className="text-xs text-muted border-b border-line">
              <tr>
                {[
                  "Candidate",
                  "Current role",
                  "Location",
                  "Exp",
                  "Skills",
                  "Match",
                  "Stage",
                  "Activity",
                  "",
                ].map((h) => (
                  <th key={h} className="px-4 py-2.5 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-0 hover:bg-slate-50/70">
                  <td className="px-4 py-3">
                    <Link href={`/candidates/${c.id}`} className="flex items-center gap-2.5">
                      <Avatar name={c.name} size="sm" />
                      <span>
                        <span className="block font-medium">{c.name}</span>
                        <span className="block text-xs text-muted">{c.email}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{c.role}</td>
                  <td className="px-4 py-3 text-muted">{c.location}</td>
                  <td className="px-4 py-3">{c.experienceYears}y</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {c.skills.slice(0, 3).map((s) => (
                        <StatusBadge key={s}>{s}</StatusBadge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{c.matchScore}%</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone="indigo">{c.stage}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-muted">{c.lastActivity}</td>
                  <td className="px-4 py-3">
                    <Link href={`/candidates/${c.id}`} className="btn-text text-xs">
                      Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
