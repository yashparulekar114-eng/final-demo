"use client";

import { useState } from "react";
import { useToast } from "../../../components/ToastProvider";

export default function NotesPanel() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>(["Strong culture add. Follow up Friday."]);
  const toast = useToast();

  return (
    <article className="card-quiet p-6">
      <h2 className="text-sm font-semibold">Notes</h2>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {notes.map((n) => (
          <li key={n} className="border-b border-line pb-2 last:border-0">
            {n}
          </li>
        ))}
      </ul>
      <label className="label mt-4" htmlFor="note">
        Add note
      </label>
      <textarea
        id="note"
        className="field min-h-24"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        type="button"
        className="btn-primary mt-3"
        onClick={() => {
          if (!note.trim()) return;
          setNotes((p) => [note.trim(), ...p]);
          setNote("");
          toast.push({ title: "Note saved" });
        }}
      >
        Save note
      </button>
    </article>
  );
}
