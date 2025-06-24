'use client';

import { Icons, SocialMediaIcon } from '@/assets/icons/icons';
import { Badge, Container } from '@/components';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { NewsList } from '@/lib';
import {
  iconMap,
  isValidUrlType,
  UrlType,
} from '@/components/common/options/news_icons';

const Page = () => {
  const t = useTranslations('NewsPage');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [accumulatedNews, setAccumulatedNews] = useState<any[]>([]);

  const params = {
    page_size: 20,
  };

  const { news, isLoading, isError, pagination } = NewsList(
    currentPage,
    params,
    0
  );

  useEffect(() => {
    if (news && news.length > 0) {
      if (currentPage === 1) {
        setAccumulatedNews(news);
      } else {
        setAccumulatedNews((prev) => [...prev, ...news]);
      }
      setLoading(false);
    }
  }, [news, currentPage]);

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

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-700">
          <Icons.Loader2 className="animate-spin h-8 w-8 mb-4 text-gray-500" />
          <p className="text-lg font-medium">
            Loading the latest news for you...
          </p>
          <p className="text-sm text-gray-500 mt-2">Please wait a moment </p>
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <p className="text-red-600">Oops! Failed to load news.</p>
      </Container>
    );
  }

  return (
    <Container>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vietnam International ArtFair
        </h1>
        <h2 className="text-4xl font-bold text-gray-900">{t('title')}</h2>
      </header>
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Latest news
        </h3>

        <div className="divide-y divide-gray-200">
          {accumulatedNews.map((item) => (
            <a key={item.id} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-3 py-3 px-4 transition-all duration-200 hover:bg-gray-100 hover:shadow-sm hover:scale-[1.01] cursor-pointer">
                <span className="text-gray-600">•</span>

                <span className="cursor-pointer">
                  {isValidUrlType(item.url_type) ? (
                    iconMap[item.url_type as UrlType]
                  ) : (
                    <SocialMediaIcon.TbWorld />
                  )}
                </span>

                <span className="text-gray-900 flex-1">{item.title}</span>

                {item.type === 'hot' && (
                  <Badge
                    variant="destructive"
                    className="bg-red-main text-white text-xs px-2 py-1"
                  >
                    HOT
                  </Badge>
                )}

                {item.type === 'popular' && (
                  <Badge
                    variant="destructive"
                    className="bg-purple-600 text-white text-xs px-2 py-1"
                  >
                    POPULAR
                  </Badge>
                )}
              </div>
            </a>
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
      </section>
    </Container>
  );
};

export default Page;
