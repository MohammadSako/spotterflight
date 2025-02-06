import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sky-scrapper.p.rapidapi.com",
        pathname: "/api/v1/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost",
        "localhost:3000",
        "sky-scrapper.p.rapidapi.com",
        "bionatural.vercel.com",
        "38.242.195.164:3000",
      ],
    },
  },
};

export default nextConfig;
