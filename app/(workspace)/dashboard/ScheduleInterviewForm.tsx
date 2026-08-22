"use client";

import { useActionState, useState } from "react";
import { scheduleInterview, type ScheduleInterviewState } from "../dashboard/actions";

const initial: ScheduleInterviewState = {};

function toDateTimeLocalValue(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function ScheduleInterviewForm({
  applicationId,
  existing,
}: {
  applicationId: string;
  existing?: { scheduled_time: string; link: string } | null;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    scheduleInterview,
    initial,
  );

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-text mt-4"
      >
        {existing ? "Reschedule" : "Schedule interview"}
      </button>
    );
  }

  return (
    <form action={formAction} className="mt-8 max-w-md space-y-8">
      <input type="hidden" name="applicationId" value={applicationId} />
      <div>
        <label htmlFor={`scheduled_time-${applicationId}`} className="label">
          Date and time
        </label>
        <input
          id={`scheduled_time-${applicationId}`}
          name="scheduled_time"
          type="datetime-local"
          required
          defaultValue={
            existing ? toDateTimeLocalValue(existing.scheduled_time) : ""
          }
          className="field"
        />
      </div>
      <div>
        <label htmlFor={`link-${applicationId}`} className="label">
          Meeting URL
        </label>
        <input
          id={`link-${applicationId}`}
          name="link"
          type="url"
          required
          placeholder="https://meet.google.com/…"
          defaultValue={existing?.link ?? ""}
          className="field"
        />
      </div>
      {state.error ? (
        <p className="text-sm font-light leading-relaxed text-accent">
          {state.error}
        </p>
      ) : null}
      <div className="flex items-center gap-6">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Saving…" : "Save interview"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm font-light text-muted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
