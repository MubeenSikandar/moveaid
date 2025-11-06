import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Optimize for development to prevent cache issues
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Better handling of file system events
  experimental: {
    // Improves hot reload stability
    turbo: {
      // Additional turbopack configurations can go here
    },
  },
};

export default nextConfig;
