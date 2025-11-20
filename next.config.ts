/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
import type { webpack } from 'next/dist/compiled/webpack/webpack';

const nextConfig: NextConfig = {
  webpack: (config: webpack.Configuration, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default nextConfig;
