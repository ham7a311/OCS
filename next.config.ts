import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Hides the circular Next.js "N" overlay in local screenshots.
  devIndicators: false,
  agentRules: false,
};

export default nextConfig;
