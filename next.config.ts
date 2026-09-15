import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Hides the circular Next.js "N" overlay in local screenshots.
  devIndicators: false,
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/voices",
        destination: "/#voices",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
