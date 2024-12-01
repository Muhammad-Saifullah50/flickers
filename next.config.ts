import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  remotePatterns: [
    {
      hostname: 'lh3.googleusercontent.com',
      protocol: 'https',
    },
    {
      hostname: 'res.cloudinary.com',
      protocol: 'https',
    }
  ]
 }
};

export default withNextVideo(nextConfig);