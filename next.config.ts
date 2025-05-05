import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8787/api/:path*' // Change 3001 to your backend port
      }
    ];
  }
};

export default nextConfig;
