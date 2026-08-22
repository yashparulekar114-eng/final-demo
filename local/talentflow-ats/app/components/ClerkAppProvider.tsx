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
          colorPrimary: "#7a1f3d",
          colorBackground: "#ffffff",
          colorNeutral: "#1c1917",
          borderRadius: "0.125rem",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        },
        elements: {
          card: "shadow-none border border-[#e6e2db] rounded-sm bg-white",
          headerTitle: "font-medium tracking-tight text-[#1c1917]",
          headerSubtitle: "text-[#6f6a64] font-normal",
          formButtonPrimary:
            "bg-[#7a1f3d] hover:bg-[#641832] shadow-none rounded-sm font-medium",
          footerActionLink: "text-[#7a1f3d] hover:text-[#641832]",
          socialButtonsBlockButton:
            "border border-[#e6e2db] shadow-none rounded-sm",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
