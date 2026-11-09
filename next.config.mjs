/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'pocketbase-qfp2khqiopiac7purq5j4byg.185.183.181.158.sslip.io',
      },
      {
        protocol: 'https',
        hostname: 'pub-36fd74211d094e5b8986e7abc18d714c.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
