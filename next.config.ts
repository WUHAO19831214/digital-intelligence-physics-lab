import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_TARGET === "netlify" ? "export" : undefined,
  trailingSlash: true,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
