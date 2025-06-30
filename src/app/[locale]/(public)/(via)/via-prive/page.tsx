'use client';

import { Icons } from '@/assets/icons/icons';
import SEO from '@/components/core/SEO';
import { ENV, ExhibitionsList, Name } from '@/lib';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath } from '@/utils/helpers/get_local_path.helper';
import CategoryCard from '@/components/common/cards/category.card';
import { Container } from '@/components';
import CustomImage from '@/components/common/design/image.component';
import NoResultsFound from '@/components/common/design/NoResultsFound';
import ExhibitionContactForm from '@/components/wrappers/exhibition_contact.wrapper';
import { Link } from '@/i18n/navigation';

const Page = () => {
  const t = useTranslations('NewsPage');
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname) || 'vi';

  const params = {
    language: locale,
    category_id: ENV.VIA_PRIVE_ID,
    page_size: 1,
  };

  const { exhibitions, isLoading, isError } = ExhibitionsList(1, params, 0);
  const VIAName = Name.VIA_PRIVE;

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
        <p className="text-red-main">Oops! Failed to load news.</p>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title="VIA Atelier"
        description="VIA brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main className="min-h-screen flex items-stretch">
        <Container className="flex flex-col md:flex-row gap-4 w-full">
          <aside className="order-1 md:order-none w-full md:basis-1/5 md:min-w-[150px] md:max-w-[200px] flex flex-col justify-end">
            <div className="ml-8">
              <CategoryCard />
            </div>
          </aside>
          <section className="order-2 md:order-none w-full md:flex-1 flex flex-col">
            {exhibitions?.length === 0 ? (
              <NoResultsFound />
            ) : (
              <div className="container mx-auto px-4 py-8">
                <div className="relative w-full h-96 md:h-[500px] mb-8  overflow-hidden">
                  <CustomImage
                    src={exhibitions[0].thumbnail.url}
                    alt={exhibitions[0].title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mx-auto">
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {exhibitions[0].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
                  <div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        {VIAName}
                      </h1>
                      <h2 className="text-4xl md:text-3xl font-bold text-gray-900">
                        {exhibitions[0].title}
                      </h2>

                      <div className="mt-16 flex justify-center">
                        <Link
                          href={{
                            pathname: '/via-prive/[slug]',
                            params: { slug: exhibitions[0].slug },
                          }}
                          className="w-48 h-14 text-lg rounded-none bg-gray-300 flex items-center justify-center gap-2 hover:bg-gray-400 "
                        >
                          <Icons.Eye className="w-5 h-5" />
                          {t('view')}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div>
                    <ExhibitionContactForm exhibition_id={exhibitions[0].id} />
                  </div>
                </div>
              </div>
            )}
          </section>
        </Container>
      </main>
    </>
  );
};

export default Page;
