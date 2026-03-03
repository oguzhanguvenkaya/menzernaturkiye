import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "menzerna.com",
      },
      {
        protocol: "https",
        hostname: "www.menzerna.com",
      },
      {
        protocol: "https",
        hostname: "mtskimya.com",
      },
      {
        protocol: "https",
        hostname: "www.mtskimya.com",
      },
      {
        protocol: "https",
        hostname: "mgpolishing.com",
      },
      {
        protocol: "https",
        hostname: "www.mgpolishing.com",
      },
    ],
  },
};

export default nextConfig;
