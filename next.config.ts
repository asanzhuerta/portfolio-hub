import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Screenshots are stored as WebP; browsers that support AVIF get it instead.
  images: { formats: ["image/avif", "image/webp"] },
  // Every page lives under /es or /en. Old links (shared before the English
  // version existed) land on the Spanish page.
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: false },
      { source: "/paralelos", destination: "/es/paralelos", permanent: true },
      { source: "/projects/:slug", destination: "/es/projects/:slug", permanent: true },
    ];
  },
  turbopack: {
    // A stray package-lock.json in the home folder would otherwise be taken as the root.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
