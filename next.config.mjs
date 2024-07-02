import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'awsp-world-backend-4etmg5366a-uc.a.run.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'awsp-world-backend-staging.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default withNextVideo(nextConfig);
