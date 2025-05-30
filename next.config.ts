import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['hcm03.vstorage.vngcloud.vn'],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
