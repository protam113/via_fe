'use client';

import {
  AdminContainer,
  PushButton,
  Heading,
  LoadingSpin,
  NoResultsFound,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Label,
} from '@/components';
import { TranslationUpdateFields } from '@/components/common/tables/translationUpdate.table';
import { UpdateEventHeadForm } from '@/components/pages/AUTH/form/exhibition_update.form';
import { ENV, ExhibitionAdminDetailData, ROUTES } from '@/lib';
import { UpdateHeadExhibitionData } from '@/types';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { id } = useParams();
  const postId = Array.isArray(id) ? id[0] : id || '';

  const { blog, isLoading, isError } = ExhibitionAdminDetailData(postId, 0);
  const categoryId = ENV.VIA_ART_FAIR_ID;

  const translations = blog.translations || [];
  const hasEN = translations.some((t) => t.language === 'en');
  const hasVN = translations.some((t) => t.language === 'vn');

  if (isLoading) {
    return <LoadingSpin message={'Loading exhibition information...'} />;
  }

  if (isError || !blog) {
    return (
      <AdminContainer className="min-h-screen flex items-center justify-center">
        <NoResultsFound />
      </AdminContainer>
    );
  }

  if (!blog?.id) {
    return <NoResultsFound />; // hoặc return null nếu cần
  }

  const translationEN = translations.find((t) => t.language === 'en');
  const translationVN = translations.find((t) => t.language === 'vn');

  return (
    <AdminContainer>
      <div>
        <PushButton href="/admin/via-art-fair" label="Back" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <Heading name="Via art fair Page" desc="Manage your categories here" />
      </div>
      <section>
        <UpdateEventHeadForm
          category={categoryId}
          exhibition={blog as UpdateHeadExhibitionData}
          postId={blog.id}
          href={ROUTES.ADMIN_VIA_PRIVE.ROOT}
        />

        {/* update body */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Event Details</Label>

          <Tabs
            defaultValue={hasEN ? 'en' : hasVN ? 'vn' : ''}
            className="w-full rounded-none"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-400 rounded-none">
              {hasEN && (
                <TabsTrigger value="en" className="rounded-none">
                  English
                </TabsTrigger>
              )}
              {hasVN && (
                <TabsTrigger value="vn" className="rounded-none">
                  Vietnamese
                </TabsTrigger>
              )}
            </TabsList>

            {hasEN ? (
              <TabsContent value="en">
                <TranslationUpdateFields
                  translation={translationEN}
                  lang="en"
                />
              </TabsContent>
            ) : (
              <TabsContent value="en">
                <button
                  className="text-blue-500 underline"
                  onClick={() => {
                    /* logic open modal/add form */
                  }}
                >
                  ➕ Add English Translation
                </button>
              </TabsContent>
            )}

            {hasVN ? (
              <TabsContent value="vn">
                <TranslationUpdateFields
                  translation={translationVN}
                  lang="vn"
                />
              </TabsContent>
            ) : (
              <TabsContent value="vn">
                <button
                  className="text-blue-500 underline"
                  onClick={() => {
                    /* logic open modal/add form */
                  }}
                >
                  ➕ Add Vietnamese Translation
                </button>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </AdminContainer>
  );
};

export default Page;
