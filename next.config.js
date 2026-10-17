/** Keep in sync with asset URLs in `lib/content/portfolio.ts` (NEXT_PUBLIC_BASE_PATH). */
const BASE_PATH = '/gautam-m-a-portfolio';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
