// next.config.mjs
import path from "path";
import os from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid stale chunk references when the project lives on OneDrive/synced folders.
      config.cache = false;
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
