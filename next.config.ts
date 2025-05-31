import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['hcm03.vstorage.vngcloud.vn'],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
