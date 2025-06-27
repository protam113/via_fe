'use client';

import { Icons } from '@/assets/icons/icons';
import ViaCard from '@/components/common/cards/via-card';
import SEO from '@/components/core/SEO';
import { ENV, ExhibitionsList } from '@/lib';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath } from '@/utils/helpers/get_local_path.helper';

const Page = () => {
  const t = useTranslations('NewsPage');
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname) || 'vi';
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);
  const [accumulatedExhibition, setAccumulatedExhibition] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const params = {
    language: locale,
    category_id: ENV.VIA_ART_FAIR_ID,
    limit: pageSize,
  };

  const { exhibitions, isLoading, isError, pagination } = ExhibitionsList(
    currentPage,
    params,
    0
  );

  useEffect(() => {
    if (exhibitions && exhibitions.length > 0) {
      if (currentPage === 1) {
        setAccumulatedExhibition(exhibitions);
      } else {
        setAccumulatedExhibition((prev) => [...prev, ...exhibitions]);
      }
      setLoading(false);
    }
  }, [exhibitions, currentPage]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      if (nextPage > 0 && nextPage <= pagination.total_page) {
        setCurrentPage(nextPage);
      }
      setLoading(false);
      setAllLoaded(true);
    }, 1500);
  };
  return (
    <>
      <SEO
        title="VIA Atelier"
        description="VIA brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main>
        <div
          className="space-y-4 min-h-screen overflow-y-auto"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {exhibitions.map((item) => (
            <ViaCard
              key={item.id}
              image={item.thumbnail.url}
              alt={item.description}
            />
          ))}
        </div>
        {!allLoaded && pagination.total_page > 1 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 rounded-none bg-gray-900 text-white font-medium transition-all duration-300
                                     hover:bg-red-main hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-main/60 focus:ring-opacity-50
                                     disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center">
                  <Icons.Loader2 className="animate-spin mr-2 h-5 w-5" />
                  LOADING...
                </span>
              ) : (
                t('button')
              )}
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Page;
