import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Allow Next.js to trace files outside the webapp/ directory (the repo root)
  outputFileTracingRoot: path.join(__dirname, "../"),
  
  // Allow images from leetcode CDN for problem statement images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.leetcode.com',
      },
    ],
  },
};

export default nextConfig;
