import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'javascript/auto',
      loader: 'next-wasm-loader',
    });
    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },

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
  },

};

export default nextConfig;
