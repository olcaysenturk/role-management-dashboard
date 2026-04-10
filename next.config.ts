import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/user-management',
      },
    ];
  },
};

export default nextConfig;
