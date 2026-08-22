import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the Cloudflare share URL load /_next JS in `next dev`.
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "**.trycloudflare.com",
    "127.0.0.1",
  ],
};

export default nextConfig;
