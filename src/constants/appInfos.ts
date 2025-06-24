import type { Metadata, Viewport } from 'next';

export const appInfo = {
  // Đường dẫn tới logo chính của app (hiển thị favicon, sharing, PWA...)
  logo: '/logo.svg',

  // Tiêu đề của ứng dụng, nên ngắn gọn và chứa từ khóa chính thương hiệu
  title: 'VIA',

  // Mô tả ngắn gọn về ứng dụng, nên chứa keyword SEO chính. Dưới 160 ký tự để hiển thị đẹp trên Google.
  description: 'app description',

  // Domain chính thức của web app, dùng cho canonical URL, meta tag...
  domain: 'app domain',

  // Ảnh mặc định khi share link lên mạng xã hội (Open Graph image)
  ogImage: '/logo.svg',

  // Màu chủ đạo cho trình duyệt, ảnh hưởng đến màu status bar trên mobile (PWA)
  themeColor: '#ffffff',

  // Danh sách keyword giúp tăng độ phủ SEO. Ưu tiên viết đúng chính tả, có cả phiên bản viết hoa - viết thường - dấu/không dấu nếu cần.
  keywords: [
    'VietNam International Art Fair',
    'VIA',
    'VIA ART FAIR',
    'VIA PRIVE',
    'VIA ATELIER',
    'Exhibitions',
    'VietName',
    'VietNamese',
  ],
};

export const metadata: Metadata = {
  title: appInfo.title,
  description: appInfo.description,
  keywords: appInfo.keywords,
  applicationName: appInfo.title,
  generator: 'Next.js',

  icons: {
    icon: appInfo.logo,
    apple: appInfo.logo,
    shortcut: appInfo.logo,
  },

  openGraph: {
    type: 'website',
    title: appInfo.title,
    description: appInfo.description,
    siteName: appInfo.title,
    url: appInfo.domain,
    images: [
      {
        url: `${appInfo.domain}${appInfo.ogImage}`,
        width: 1200,
        height: 630,
        alt: appInfo.title,
      },
    ],
    locale: 'vi_VN',
  },

  twitter: {
    card: 'summary_large_image',
    title: appInfo.title,
    description: appInfo.description,
    images: [`${appInfo.domain}${appInfo.ogImage}`],
    creator: '@via',
    site: '@via',
  },

  alternates: {
    canonical: appInfo.domain,
    languages: {
      'en-US': `${appInfo.domain}/en`,
      'vi-VN': `${appInfo.domain}`,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'verification_token',
    yandex: 'verification_token',
  },

  category: 'VietNam International Art Fair',
  creator: '@via',
  publisher: 'VIA',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: appInfo.themeColor,
};

export function PageMetadata(
  pageTitle: string,
  pageDescription?: string
): Metadata {
  return {
    ...metadata,
    title: `${pageTitle} | ${appInfo.title}`,
    description: pageDescription || metadata.description,
    openGraph: {
      ...metadata.openGraph,
      title: `${pageTitle} | ${appInfo.title}`,
      description: pageDescription || (metadata.description as string),
    },
    twitter: {
      ...metadata.twitter,
      title: `${pageTitle} | ${appInfo.title}`,
      description: pageDescription || (metadata.description as string),
    },
  };
}
