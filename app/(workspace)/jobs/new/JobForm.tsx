"use client";

import { useActionState } from "react";
import { createJob, type CreateJobState } from "../actions";

const initialState: CreateJobState = {};

export default function JobForm() {
  const [state, formAction, pending] = useActionState(createJob, initialState);

  return (
    <form action={formAction} className="space-y-10">
      <div>
        <label htmlFor="title" className="label">
          Job title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Senior Frontend Engineer"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={10}
          placeholder="Role overview, requirements, and what success looks like."
          className="field resize-y min-h-[12rem]"
        />
      </div>

      {state.error ? (
        <p className="text-sm font-light text-accent leading-relaxed">{state.error}</p>
      ) : null}

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Posting…" : "Post job"}
      </button>
    </form>
  );
}
