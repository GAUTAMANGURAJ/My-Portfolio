/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gautam-m-a-portfolio',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};


module.exports = nextConfig;
