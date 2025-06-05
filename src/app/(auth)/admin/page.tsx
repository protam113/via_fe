'use client';

import SelectCountriesSimple from '@/components/common/options/select.option';
import ImageUploadPreview from '@/components/features/image_upload';
import { RichTextEditorDemo } from '@/components/tiptap/rich-text-editor';
import { useAuthStore } from '@/store/auth/store.auth';
import React from 'react';

const Page = () => {
  const userInfo = useAuthStore((state) => state.userInfo);

  return (
    <div className="container">
      <p>Hello {userInfo?.name}!</p>

      <main className="flex-grow container mx-auto px-4 py-8" id="editor">
        <SelectCountriesSimple />
        {/* <RichTextEditorDemo className="w-full rounded-xl" /> */}
        <ImageUploadPreview type="thumbnail" />
      </main>
    </div>
  );
};

export default Page;
