"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  PIPELINE_STAGES,
  mockCandidates,
  type CandidateRecord,
  type PipelineStage,
} from "@/lib/ats-data";
import { Avatar, EmptyState, StatusBadge } from "../../components/ui";

export default function ApplicationsBoard() {
  const [view, setView] = useState<"table" | "board">("board");
  const [sort, setSort] = useState<"match" | "name">("match");
  const [columns, setColumns] = useState<Record<PipelineStage, CandidateRecord[]>>(() => {
    const init = Object.fromEntries(PIPELINE_STAGES.map((s) => [s, [] as CandidateRecord[]])) as Record<
      PipelineStage,
      CandidateRecord[]
    >;
    for (const c of mockCandidates) init[c.stage].push(c);
    return init;
  });
  const [confirm, setConfirm] = useState<CandidateRecord | null>(null);

  const tableRows = useMemo(() => {
    const all = PIPELINE_STAGES.flatMap((s) => columns[s]);
    return [...all].sort((a, b) =>
      sort === "match" ? b.matchScore - a.matchScore : a.name.localeCompare(b.name),
    );
  }, [columns, sort]);

  function onDrop(stage: PipelineStage, id: string) {
    setColumns((prev) => {
      const next = { ...prev };
      for (const s of PIPELINE_STAGES) {
        next[s] = prev[s].filter((c) => c.id !== id);
      }
      const found = mockCandidates.find((c) => c.id === id);
      if (found) next[stage] = [...next[stage], { ...found, stage }];
      return next;
    });
  }

  return (
    <div className="max-w-[90rem] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
          <p className="text-sm text-muted mt-1">Track every stage from applied to hired.</p>
        </div>
        <div className="flex gap-2">
          <select className="field w-36" value={sort} onChange={(e) => setSort(e.target.value as "match" | "name")}>
            <option value="match">Sort: match</option>
            <option value="name">Sort: name</option>
          </select>
          <div className="flex rounded-xl border border-line p-0.5 bg-surface">
            <button
              type="button"
              className={`px-3 py-1.5 text-sm rounded-lg ${view === "board" ? "bg-indigo-50 text-indigo-700" : "text-muted"}`}
              onClick={() => setView("board")}
            >
              Board
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 text-sm rounded-lg ${view === "table" ? "bg-indigo-50 text-indigo-700" : "text-muted"}`}
              onClick={() => setView("table")}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {view === "board" ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((stage) => (
            <section
              key={stage}
              className="min-w-[220px] w-56 shrink-0"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData("text/plain");
                if (id) onDrop(stage, id);
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {stage}
                </h2>
                <span className="text-xs text-muted">{columns[stage].length}</span>
              </div>
              <div className="space-y-2 min-h-40 rounded-xl border border-dashed border-line p-1">
                {columns[stage].map((c) => (
                  <article
                    key={c.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", c.id)}
                    className="card-quiet p-3 cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar name={c.name} size="sm" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{c.name}</p>
                        <p className="text-xs text-muted truncate">{c.jobTitle}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      {c.matchScore}% · {c.experienceYears}y · {c.lastActivity}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : tableRows.length === 0 ? (
        <EmptyState title="No applications" body="When candidates apply, they will land here." />
      ) : (
        <div className="overflow-x-auto card-quiet">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="text-xs text-muted border-b border-line">
              <tr>
                {["Candidate", "Position", "Match", "Stage", "Recruiter", ""].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted">{c.jobTitle}</td>
                  <td className="px-4 py-3">{c.matchScore}%</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone="indigo">{c.stage}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-muted">{c.recruiter}</td>
                  <td className="px-4 py-3">
                    <Link href={`/candidates/${c.id}`} className="btn-text text-xs">
                      Open
                    </Link>
                    <button
                      type="button"
                      className="ml-3 text-xs text-rose-600 hover:underline"
                      onClick={() => setConfirm(c)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirm ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/30 p-4">
          <div className="card-quiet max-w-sm w-full p-5">
            <h3 className="font-semibold">Reject {confirm.name}?</h3>
            <p className="mt-2 text-sm text-muted">
              This is a demo confirmation. No email will be sent.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" className="btn-secondary" onClick={() => setConfirm(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary bg-rose-600 hover:bg-rose-700"
                onClick={() => setConfirm(null)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
