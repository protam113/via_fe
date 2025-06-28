'use client';

import DashboardStats from '@/components/common/cards/DashboardStats.card';
import RecentContact from '@/components/common/cards/recentContact.card';
import RecentNews from '@/components/common/cards/recentNews.card';
import SelectCountriesSimple from '@/components/common/options/select.option';
import AdminBanner from '@/components/features/admin_hero';
import ImageUploadPreview from '@/components/features/image_upload';
import { useAuthStore } from '@/store/auth/store.auth';
import React from 'react';

const Page = () => {
  const userInfo = useAuthStore((state) => state.userInfo);

  return (
    <div className="container mx-auto ">
      <main className="flex-grow container mx-auto px-4 py-8">
        <AdminBanner />
        <div className="mt-8">
          <DashboardStats />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentNews />
          <RecentContact />
        </div>
        <p>Hello {userInfo?.name}!</p>

        <SelectCountriesSimple />
        <ImageUploadPreview type="thumbnail" />
      </main>
    </div>
  );
};

export default Page;
