import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Mark native-heavy packages as external for server components build
    serverComponentsExternalPackages: [
      "@tensorflow/tfjs-node",
      "@tensorflow-models/deeplab",
    ],
    // Increase body size limit for server actions / form parsing (default 1MB)
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Suppress warnings about optional deps of node-pre-gyp (aws-sdk etc.)
      config.externals = config.externals || [];
    }
    return config;
  },
};

export default nextConfig;
