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
    if (isVietnamese === null) return; // avoid race condition
    if (lang === 'vi' && !isVietnamese) {
      const newPath = pathname.replace(/^\/en/, '');
      router.push(`/vi${newPath.startsWith('/') ? newPath : '/' + newPath}`);
    } else if (lang === 'en' && isVietnamese) {
      const newPath = pathname.replace(/^\/vi/, '');
      router.push(`/en${newPath.startsWith('/') ? newPath : '/' + newPath}`);
    }
  };

  if (isVietnamese === null) return null; // hoặc loading skeleton cho đẹp

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
