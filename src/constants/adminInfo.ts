import type { Metadata, Viewport } from 'next';

export const adminInfo = {
  logo: '/logo.svg', //web logo
  title: 'VIA Dashboard', //app name
  domain: 'app domain', //app domain
  ogImage: '/logo.svg', //og image
  themeColor: '#ffffff',
};

export const adminMetadata: Metadata = {
  title: adminInfo.title,
  applicationName: adminInfo.title,
  generator: 'Next.js',
};

// Move themeColor to viewport export
export const adminViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: adminInfo.themeColor,
};
