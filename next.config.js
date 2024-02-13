/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  transpilePackages: ['@uniswap/widgets', '@uniswap/conedison'],
};

module.exports = nextConfig;
