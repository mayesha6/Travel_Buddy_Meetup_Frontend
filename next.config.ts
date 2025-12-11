import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["res.cloudinary.com"], // allow images from Cloudinary
  },
};

export default nextConfig;
