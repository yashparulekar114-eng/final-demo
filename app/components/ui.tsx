export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  const dim =
    size === "lg" ? "h-16 w-16 text-lg" : size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  return (
    <div
      className={`shrink-0 ${dim} rounded-full bg-indigo-50 text-indigo-700 font-semibold grid place-items-center`}
    >
      {initials}
    </div>
  );
}

export function StatusBadge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "green" | "amber" | "indigo" | "red";
}) {
  const map = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-800",
    indigo: "bg-indigo-50 text-indigo-700",
    red: "bg-rose-50 text-rose-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface px-8 py-16 text-center">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-muted max-w-md mx-auto leading-relaxed">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200/80 ${className ?? ""}`} />;
}

export function MatchBar({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-muted mb-1.5">
        <span>{label}</span>
        <span className="font-medium text-ink">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

export function MiniChart({
  values,
  kind = "line",
}: {
  values: number[];
  kind?: "line" | "bar";
}) {
  const max = Math.max(...values, 1);
  const w = 560;
  const h = 180;
  const pad = 8;
  if (kind === "bar") {
    const bw = (w - pad * 2) / values.length;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44" role="img" aria-label="Bar chart">
        {values.map((v, i) => {
          const bh = ((v / max) * (h - pad * 2)) | 0;
          return (
            <rect
              key={i}
              x={pad + i * bw + 1}
              y={h - pad - bh}
              width={Math.max(2, bw - 3)}
              height={bh}
              rx={2}
              fill="#4F46E5"
              opacity={0.75}
            />
          );
        })}
      </svg>
    );
  }
  const pts = values
    .map((v, i) => {
      const x = pad + (i / Math.max(values.length - 1, 1)) * (w - pad * 2);
      const y = h - pad - (v / max) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44" role="img" aria-label="Line chart">
      <polyline fill="none" stroke="#4F46E5" strokeWidth="2.2" points={pts} />
    </svg>
  );
}
