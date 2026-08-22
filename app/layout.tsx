import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClerkAppProvider from "./components/ClerkAppProvider";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentFlow — Hire Smarter, Apply Faster",
  description:
    "Applicant tracking system for recruiters who post jobs and candidates who search roles and upload resumes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <ClerkAppProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </ClerkAppProvider>
      </body>
    </html>
  );
}
