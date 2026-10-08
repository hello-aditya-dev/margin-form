import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === "export";
const basePath = process.env.NEXT_BASE_PATH; // "/margin-form" in CI export; undefined in dev

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  basePath: basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
};

export default nextConfig;
