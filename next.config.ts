import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["@node-rs/argon2", "@node-rs/bcrypt"],
  experimental: {
    // serverComponentsExternalPackages is deprecated in favor of serverExternalPackages
  }
};

export default nextConfig;
