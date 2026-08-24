import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./dev.db"],
  },
  async redirects() {
    return [
      {
        source: "/open-data",
        destination: "/open-info",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
