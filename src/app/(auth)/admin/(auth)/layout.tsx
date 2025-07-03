'use client';

import React, { useEffect, useState } from 'react';
import { AdminLoading } from '@/components';
import { AuthWarning } from '@/constants';
import { ROUTES } from '@/lib';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AuthProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const loading = useAuthStore((state) => state.loading);
  const isAuthenticated = !!userInfo;
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        // Assume checkAuth is some function you call when logging in — leave it off if not needed
        // await checkAuth();
        if (isMounted) setAuthChecked(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        if (isMounted) setAuthChecked(true);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (authChecked) {
      if (!isAuthenticated || userInfo?.role.slug !== 'admin') {
        toast.error(AuthWarning.AUTH_PERMISTION);
        router.replace(ROUTES.DASHBOARD);
      }
    }
  }, [authChecked, isAuthenticated, userInfo, router]);

  if (!authChecked || loading) {
    return (
      <div>
        <AdminLoading />
      </div>
    );
  }

  return isAuthenticated && userInfo?.role.slug === 'admin' ? (
    <>{children}</>
  ) : null;
}
