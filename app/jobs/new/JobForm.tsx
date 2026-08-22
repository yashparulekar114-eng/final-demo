"use client";

import { useActionState } from "react";
import { createJob, type CreateJobState } from "../actions";

const initialState: CreateJobState = {};

export default function JobForm() {
  const [state, formAction, pending] = useActionState(createJob, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
          Job Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="e.g. Senior Frontend Engineer"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Job Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={8}
          placeholder="Role overview, requirements, and what success looks like..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
        />
      </div>

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Posting job..." : "Post job"}
      </button>
    </form>
  );
}
