"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Toast = { id: number; title: string; body?: string };

const ToastCtx = createContext<{
  push: (t: Omit<Toast, "id">) => void;
} | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast requires ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { ...t, id }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }, 3200);
  }, []);
  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-20 md:bottom-6 right-4 z-[80] space-y-2 w-[min(22rem,calc(100vw-2rem))]">
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto rounded-xl border border-line bg-surface px-4 py-3 shadow-sm"
            role="status"
          >
            <p className="text-sm font-medium text-ink">{t.title}</p>
            {t.body ? <p className="mt-0.5 text-sm text-muted">{t.body}</p> : null}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
