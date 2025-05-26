'use client';

import { useRouter, usePathname } from 'next/navigation';

const LangButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Kiểm tra chính xác ngôn ngữ Việt: đúng /vi hoặc bắt đầu bằng /vi/
  const isVietnamese = pathname === '/vi' || pathname.startsWith('/vi/');

  const handleLangChange = (lang: 'vi' | 'en') => {
    if (lang === 'vi') {
      // Nếu chưa phải tiếng Việt → thêm /vi phía trước
      if (!isVietnamese) {
        const newPath = `/vi${pathname.startsWith('/') ? '' : '/'}${pathname}`;
        router.push(newPath);
      }
    } else {
      // Nếu là tiếng Việt → bỏ đúng /vi hoặc /vi/
      const newPath = pathname.replace(/^\/vi(\/|$)/, '') || '/';
      router.push(newPath);
    }
  };

  return (
    <div className="flex items-center gap-4 text-base lg:text-lg">
      <span
        onClick={() => handleLangChange('en')}
        className={`cursor-pointer ${
          !isVietnamese ? 'text-black border-b-2 border-black' : 'text-gray-400'
        }`}
      >
        EN
      </span>
      /
      <span
        onClick={() => handleLangChange('vi')}
        className={`cursor-pointer ${
          isVietnamese ? 'text-black border-b-2 border-black' : 'text-gray-400'
        }`}
      >
        VN
      </span>
    </div>
  );
};

export default LangButton;
