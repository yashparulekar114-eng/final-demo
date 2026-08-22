"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
      allowedRedirectOrigins={[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://*.trycloudflare.com",
      ]}
      appearance={{
        variables: {
          colorPrimary: "#4f46e5",
          colorBackground: "#ffffff",
          colorNeutral: "#0f172a",
          borderRadius: "0.75rem",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        },
        elements: {
          card: "shadow-none border border-[#e2e8f0] rounded-xl bg-white",
          headerTitle: "font-semibold tracking-tight text-[#0f172a]",
          headerSubtitle: "text-[#64748b] font-normal",
          formButtonPrimary:
            "bg-[#4f46e5] hover:bg-[#4338ca] shadow-none rounded-xl font-medium",
          footerActionLink: "text-[#4f46e5] hover:text-[#4338ca]",
          socialButtonsBlockButton:
            "border border-[#e2e8f0] shadow-none rounded-xl",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
