'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LangButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isVietnamese, setIsVietnamese] = useState<boolean | null>(null);

  useEffect(() => {
    if (!pathname) return;
    const vi = pathname === '/vi' || pathname.startsWith('/vi/');
    setIsVietnamese(vi);
  }, [pathname]);

  const handleLangChange = (lang: 'vi' | 'en') => {
    if (isVietnamese === null) return;

    // ✅ Clean path (remove /vi or /en prefix)
    const currentPath = pathname.replace(/^\/(en|vi)/, '');

    const isViaArtFairDetail = /^\/via-art-fair\/[^/]+$/.test(currentPath);
    const isViaAtelierDetail = /^\/via-atelier\/[^/]+$/.test(currentPath);
    const isViaPriveDetail = /^\/via-prive\/[^/]+$/.test(currentPath);

    if (isViaArtFairDetail || isViaAtelierDetail || isViaPriveDetail) {
      router.push(`/${lang}`);
    } else {
      router.push(`/${lang}${currentPath}`);
    }
  };

  if (isVietnamese === null) return null;

  return (
    <div className="flex items-center gap-4 text-base lg:text-lg">
      <span
        onClick={() => handleLangChange('en')}
        className={`cursor-pointer ${
          !isVietnamese
            ? 'text-red-main border-b-2 border-red-main'
            : 'text-black'
        }`}
      >
        EN
      </span>
      /
      <span
        onClick={() => handleLangChange('vi')}
        className={`cursor-pointer ${
          isVietnamese
            ? 'text-red-main border-b-2 border-red-main'
            : 'text-black'
        }`}
      >
        VN
      </span>
    </div>
  );
};

export default LangButton;
