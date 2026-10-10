import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ข้ามการตรวจ TypeScript Error ตอน Build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;