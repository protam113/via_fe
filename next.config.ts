import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import pkg from './package.json';

const nextConfig: NextConfig = {
  images: {
    domains: ['hcm03.vstorage.vngcloud.vn'],
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
