import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal self-contained server for the Docker image (see Dockerfile).
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
    qualities: [75, 85],
  },
};

export default nextConfig;
