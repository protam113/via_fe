import { SocialMediaIcon } from '@/assets/icons/icons';
import { Badge, Container } from '@/components';
import React from 'react';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('NewsPage');

  const newsItems = [
    {
      title: 'Vietnam International ArtFair 2025 officially launched',
      isHot: true,
    },
    {
      title: 'Vietnam International ArtFair 2025 officially launched',
      isHot: false,
    },
    {
      title: 'Vietnam International ArtFair 2025 officially launched',
      isHot: false,
    },
    {
      title: 'Vietnam International ArtFair 2025 officially launched',
      isHot: false,
    },
    {
      title: 'Vietnam International ArtFair 2025 officially launched',
      isHot: false,
    },
  ];

  const mediaSources = [
    'Tapchimythuat',
    'Baotuoitre',
    'Ideaion',
    'Baothanhnien',
    'MOTMagazine',
    'ELLEMagazine',
  ];

  return (
    <Container>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vietnam International ArtFair
        </h1>
        <h2 className="text-4xl font-bold text-gray-900"> {t('title')}</h2>
      </header>
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Latest news
        </h3>

        <div className="divide-y divide-gray-200">
          {newsItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 py-2">
              <span className="text-gray-600">•</span>
              <span className="cursor-pointer">
                <SocialMediaIcon.FaFacebookF />
              </span>
              <span className="text-gray-900 flex-1">{item.title}</span>
              {item.isHot && (
                <Badge
                  variant="destructive"
                  className="bg-red-600 text-white text-xs px-2 py-1"
                >
                  HOT
                </Badge>
              )}
            </div>
          ))}

          {mediaSources.map((source, index) => (
            <div key={index} className="flex items-center gap-3 py-2">
              <span className="text-gray-600">•</span>
              <span className="cursor-pointer">
                <SocialMediaIcon.TbWorld />
              </span>
              <span className="text-gray-900">{source}</span>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Page;
