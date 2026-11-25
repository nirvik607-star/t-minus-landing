import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = process.env.PAGES_BASE_PATH ?? "/t-minus-landing";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: repoBasePath,
        assetPrefix: repoBasePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
