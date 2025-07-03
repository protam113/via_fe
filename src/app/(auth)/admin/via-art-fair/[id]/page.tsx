'use client';

import { ExhibitionAdminDetailData } from '@/lib';
import { useParams } from 'next/navigation';
import { formatDateOnly } from '@/utils';
import CustomImage from '@/components/common/design/image.component';

import {
  Container,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  NoResultsFound,
  LoadingSpin,
} from '@/components';
import BackButton from '@/components/common/button/back-admin.button';

export default function Page() {
  const { id } = useParams();
  const postId = Array.isArray(id) ? id[0] : id || '';

  const { blog, isLoading, isError } = ExhibitionAdminDetailData(postId, 0);

  // UI - Loading & Error
  if (isLoading) {
    return <LoadingSpin message={'Loading exhibition information...'} />;
  }

  if (isError || !blog) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <NoResultsFound />
      </Container>
    );
  }

  // Extract translations
  const translations = blog.translations || [];
  const hasEN = translations.some((t) => t.language === 'en');
  const hasVN = translations.some((t) => t.language === 'vn');

  const renderContent = (lang: 'en' | 'vn') => {
    const t = translations.find((tr) => tr.language === lang);
    if (!t) return null;

    return (
      <div key={lang}>
        {' '}
        <h2 className="text-4xl md:text-3xl font-bold text-gray-900">
          {t.title}
        </h2>
        <p className="text-base text-gray-600">{t.location}</p>
        <p className="font-bold text-red-main">{t.price}</p>
        <p className="text-gray-700 leading-relaxed text-justify mt-4">
          {t.description}
        </p>
        <div
          className="rich-text-content mt-4"
          dangerouslySetInnerHTML={{ __html: t.content }}
        />
      </div>
    );
  };

  return (
    <Container className="gap-4">
      <div className="mb-8">
        <BackButton />
      </div>
      {/* Banner Image */}
      <div className="relative w-full h-96 md:h-[500px] mb-8 overflow-hidden">
        <CustomImage
          src={blog.banner?.url || ''}
          alt={'Banner'}
          fill
          className="object-cover"
        />
      </div>
      {/* Date & additional info */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
          <div>
            <p>
              {(blog?.start_date && formatDateOnly(blog.start_date)) || '—'} -{' '}
              {(blog?.end_date && formatDateOnly(blog.end_date)) || '—'}
            </p>
          </div>
        </div>
      </div>
      {/* Tabs with translations */}
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

        {hasEN && <TabsContent value="en">{renderContent('en')}</TabsContent>}
        {hasVN && <TabsContent value="vn">{renderContent('vn')}</TabsContent>}
      </Tabs>
    </Container>
  );
}
