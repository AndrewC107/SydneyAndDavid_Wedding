import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  agentRules: false,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? "/SydneyAndDavid_Wedding" : "",
};

export default nextConfig;
