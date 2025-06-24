'use client';

import { usePathname } from 'next/navigation';

const useLangFromPath = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/vi')) return 'vi';
  if (pathname.startsWith('/en')) return 'en';
  return 'default';
};

export default useLangFromPath;
