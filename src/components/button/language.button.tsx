'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English', path: '/' },
  { code: 'vi', name: 'Vietnamese', path: '/vi' },
];

const LangButton = () => {
  const [language, setLanguage] = useState('en');
  const router = useRouter();
  const pathname = usePathname();

  const handleLangChange = (lang: string) => {
    setLanguage(lang);
    const langObj = languages.find((l) => l.code === lang);
    if (langObj) {
      // Nếu đang ở trang /about và chọn "vi" → chuyển đến /vi/about
      const segments = pathname.split('/').filter(Boolean);
      const hasLangPrefix = segments[0] === 'vi';
      const targetPath =
        lang === 'vi'
          ? `/vi${hasLangPrefix ? '/' + segments.slice(1).join('/') : pathname}`
          : pathname.replace(/^\/vi/, '') || '/';

      router.push(targetPath);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLangChange(lang.code)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangButton;
