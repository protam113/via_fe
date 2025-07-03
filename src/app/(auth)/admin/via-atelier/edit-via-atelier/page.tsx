'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/lib';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.ADMIN_VIA_ATELIER.ROOT);
  }, [router]);

  return null;
};

export default Page;
