/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.premierleague.com',
        port: '',
        pathname: '/premierleague/photos/players/**',
      },
      {
        protocol: 'https',
        hostname: 'resources.premierleague.com',
        port: '',
        pathname: '/premierleague/badges/**',
      }
    ],
  },
};

export default nextConfig;
