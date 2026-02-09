import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Log environment variables during build
  env: {
    CUSTOM_BUILD_TIME_API_URL: process.env.NEXT_PUBLIC_API_URL || 'NOT_SET',
  },
  // Ensure proper handling of dynamic routes
  experimental: {
    // Optimize for production
    optimizePackageImports: ['lucide-react'],
  },
  // Better error handling in production
  onDemandEntries: {
    // Keep pages in memory for 60s
    maxInactiveAge: 60 * 1000,
    // Number of pages to keep simultaneously
    pagesBufferLength: 5,
  },
  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
