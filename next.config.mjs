// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { dev }) => {
    // Avoid stale chunk references when .next is on a synced folder (e.g. OneDrive).
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
