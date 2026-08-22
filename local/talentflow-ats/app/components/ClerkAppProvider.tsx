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
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
