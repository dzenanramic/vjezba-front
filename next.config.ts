import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: [
      'http://192.168.100.131',
      'https://192.168.100.131'
    ]
  }
};

export default nextConfig;
