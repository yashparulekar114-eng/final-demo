import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClerkAppProvider from "./components/ClerkAppProvider";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TalentFlow — Hire Smarter, Apply Faster",
  description:
    "Applicant tracking system for recruiters who post jobs and candidates who search roles and upload resumes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans">
        <ClerkAppProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </ClerkAppProvider>
      </body>
    </html>
  );
}
