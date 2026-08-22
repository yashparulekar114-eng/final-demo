"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Calendar,
  Sparkles,
  BarChart3,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useCreateJob } from "./CreateJobModal";
import { Avatar, cn } from "./ui";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/candidates", label: "Candidates", icon: Users },
  { href: "/applications", label: "Applications", icon: FileText },
  { href: "/interviews", label: "Interviews", icon: Calendar },
  { href: "/talent-pool", label: "Talent Pool", icon: Sparkles },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

const MOBILE = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/jobs", label: "Apply", icon: Briefcase },
  { href: "/candidates", label: "People", icon: Users },
  { href: "/interviews", label: "Talks", icon: Calendar },
  { href: "/reports", label: "Stats", icon: BarChart3 },
];

export default function AppShell({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas flex">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 bg-surface border-r border-line flex flex-col transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-14 px-4 flex items-center justify-between border-b border-line">
          <Link href="/dashboard" className="font-semibold tracking-tight text-ink">
            TalentFlow
          </Link>
          <button
            type="button"
            className="lg:hidden h-8 w-8 grid place-items-center rounded-lg hover:bg-slate-50"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-line space-y-0.5">
          <Link
            href="/settings"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/help"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
          <div className="flex items-center gap-2.5 px-3 py-2">
            <Avatar name={userName} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted truncate">{userEmail}</p>
            </div>
            <UserButton />
          </div>
        </div>
      </aside>

      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/20 lg:hidden"
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <TopBar onMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">{children}</main>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-surface grid grid-cols-5">
        {MOBILE.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium",
                active ? "text-accent" : "text-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function TopBar({
  onMenu,
}: {
  onMenu: () => void;
}) {
  const createJob = useCreateJob();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-14 bg-canvas/90 backdrop-blur border-b border-line flex items-center gap-3 px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        className="lg:hidden h-9 w-9 grid place-items-center rounded-lg border border-line bg-surface"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>
      <form
        className="flex-1 max-w-xl"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/candidates?q=${encodeURIComponent(q)}`);
        }}
      >
        <label className="relative block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search candidates, jobs…"
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-line bg-surface text-sm outline-none focus:border-accent"
          />
        </label>
      </form>
      <div className="relative">
        <button
          type="button"
          className="h-9 w-9 grid place-items-center rounded-xl border border-line bg-surface hover:bg-slate-50"
          aria-label="Notifications"
          onClick={() => setNotesOpen((v) => !v)}
        >
          <Bell className="h-4 w-4" />
        </button>
        {notesOpen ? (
          <div className="absolute right-0 mt-2 w-72 rounded-xl border border-line bg-surface shadow-sm p-3 text-sm z-30">
            <p className="font-medium">Notifications</p>
            <p className="mt-2 text-muted">Ananya Rao moved to Interview.</p>
            <p className="mt-1 text-muted">3 new applications on Frontend Engineer.</p>
          </div>
        ) : null}
      </div>
      <Link href="/jobs" className="btn-secondary hidden sm:inline-flex">
        Apply to a job
      </Link>
      <button type="button" className="btn-primary hidden sm:inline-flex" onClick={createJob.open}>
        <Plus className="h-4 w-4" />
        Create Job
      </button>
      <div className="hidden sm:block">
        <UserButton />
      </div>
    </header>
  );
}
