"use client";

import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-sm">
      <div className="page-shell flex h-20 sm:h-24 items-center justify-between">
        <Link
          href="/"
          className="text-[1.05rem] font-medium tracking-tight text-ink"
        >
          TalentFlow
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[0.9375rem] font-normal text-muted">
          <Link href="/jobs" className="hover:text-ink transition-colors">
            Jobs
          </Link>
          <Link href="/#product" className="hover:text-ink transition-colors">
            Product
          </Link>
          <Link href="/#for-recruiters" className="hover:text-ink transition-colors">
            Recruiters
          </Link>
          <Link href="/#for-candidates" className="hover:text-ink transition-colors">
            Candidates
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="text-[0.9375rem] font-normal text-muted hover:text-ink transition-colors"
            >
              Sign in
            </Link>
            <Link href="/sign-up" className="btn-primary hidden sm:inline-flex">
              Get started
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="text-[0.9375rem] font-medium text-ink hover:text-accent transition-colors"
            >
              Dashboard
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 rounded-full",
                },
              }}
            />
          </Show>
        </div>
      </div>
      <div className="page-shell">
        <div className="h-px bg-line" />
      </div>
    </header>
  );
}
