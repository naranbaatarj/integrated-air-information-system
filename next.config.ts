import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
