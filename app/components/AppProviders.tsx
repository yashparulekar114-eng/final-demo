"use client";

import { ToastProvider } from "./ToastProvider";
import { CreateJobProvider } from "./CreateJobModal";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CreateJobProvider>{children}</CreateJobProvider>
    </ToastProvider>
  );
}
