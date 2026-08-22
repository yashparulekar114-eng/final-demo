"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useToast } from "./ToastProvider";

const Ctx = createContext<{ open: () => void; close: () => void } | null>(null);

export function useCreateJob() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("CreateJobProvider missing");
  return ctx;
}

const STEPS = [
  "Job information",
  "Requirements",
  "Skills",
  "Hiring team",
  "Review & publish",
];

export function CreateJobProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const api = useMemo(
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }),
    [],
  );

  return (
    <Ctx.Provider value={api}>
      {children}
      {open ? <CreateJobModal onClose={() => setOpen(false)} /> : null}
    </Ctx.Provider>
  );
}

function CreateJobModal({ onClose }: { onClose: () => void }) {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [requirements, setRequirements] = useState("");
  const [skills, setSkills] = useState("");
  const [team, setTeam] = useState("");

  function next() {
    if (step === 0 && !title.trim()) {
      toast.push({ title: "Add a job title to continue" });
      return;
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else {
      toast.push({
        title: "Job drafted",
        body: "Connect posting to /jobs/new to publish to Supabase.",
      });
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-900/30 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-job-title"
    >
      <div className="w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-line bg-surface shadow-lg max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <div>
            <p className="text-xs font-medium text-muted">
              Step {step + 1} of {STEPS.length}
            </p>
            <h2 id="create-job-title" className="text-base font-semibold text-ink">
              {STEPS[step]}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 grid place-items-center rounded-lg hover:bg-slate-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 py-5 space-y-4">
          {step === 0 ? (
            <>
              <div>
                <label className="label" htmlFor="cj-title">
                  Title
                </label>
                <input
                  id="cj-title"
                  className="field"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Senior Frontend Engineer"
                />
              </div>
              <div>
                <label className="label" htmlFor="cj-dept">
                  Department
                </label>
                <select
                  id="cj-dept"
                  className="field"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {["Engineering", "Product", "Design", "Data", "People"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="cj-loc">
                  Location
                </label>
                <input
                  id="cj-loc"
                  className="field"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Bengaluru · Hybrid"
                />
              </div>
              <div>
                <label className="label" htmlFor="cj-type">
                  Employment type
                </label>
                <select
                  id="cj-type"
                  className="field"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {["Full-time", "Contract", "Internship"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </>
          ) : null}
          {step === 1 ? (
            <div>
              <label className="label" htmlFor="cj-req">
                Requirements
              </label>
              <textarea
                id="cj-req"
                className="field min-h-36"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="One requirement per line"
              />
            </div>
          ) : null}
          {step === 2 ? (
            <div>
              <label className="label" htmlFor="cj-skills">
                Skills
              </label>
              <input
                id="cj-skills"
                className="field"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, TypeScript, Next.js"
              />
            </div>
          ) : null}
          {step === 3 ? (
            <div>
              <label className="label" htmlFor="cj-team">
                Hiring team
              </label>
              <input
                id="cj-team"
                className="field"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Priya Menon, Arjun Shah"
              />
            </div>
          ) : null}
          {step === 4 ? (
            <dl className="text-sm space-y-3">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Title</dt>
                <dd className="font-medium">{title || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Department</dt>
                <dd className="font-medium">{department}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Location</dt>
                <dd className="font-medium">{location || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Type</dt>
                <dd className="font-medium">{type}</dd>
              </div>
            </dl>
          ) : null}
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-t border-line">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
          >
            {step === 0 ? "Cancel" : "Back"}
          </button>
          <button type="button" className="btn-primary" onClick={next}>
            {step === STEPS.length - 1 ? "Publish" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
