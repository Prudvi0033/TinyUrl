/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // disable Turbopack, force Webpack
  },
};

module.exports = nextConfig;
