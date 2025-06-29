'use client';

import { useExhibitionDetail } from '@/hooks/exhibition/useExhibition';
import { Name } from '@/lib';
import { useParams, usePathname } from 'next/navigation';
import { formatDateOnly } from '@/utils';
import { useEffect, useState } from 'react';
import { ExhibitionCode, ExibitionDetailResponse } from '@/types';
import { getLocaleFromPath } from '@/utils/helpers/get_local_path.helper';
import CustomImage from '@/components/common/design/image.component';
import { Container } from '@/components';
import LoadingSpin from '@/components/loading/loading';

export default function Page() {
  const { slug } = useParams();
  const pathname = usePathname();
  const exhibitionSlug = Array.isArray(slug) ? slug[0] : slug || '';
  const locale = getLocaleFromPath(pathname) || 'vi';

  //   Data response
  const [exhibitionDetailData, setExhibitionDetailData] =
    useState<ExibitionDetailResponse | null>(null);

  // Loading & Error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const VIAName = Name.VIA_ART_FAIR;

  const { mutate: exhibitionDetail } = useExhibitionDetail(exhibitionSlug);

  const fetchExhibitionDetail = async () => {
    setIsLoading(true);
    setError(null);

    const exhibitionData: ExhibitionCode = { code: '' };
    const params = { language: locale };

    exhibitionDetail(
      {
        exhibitionCode: exhibitionData,
        filters: params,
      },
      {
        onSuccess: (data: ExibitionDetailResponse) => {
          setExhibitionDetailData(data);
          setIsLoading(false);
        },
        onError: (error: any) => {
          setError(error.message || 'Không tìm thấy thông tin triển lãm');
          setIsLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (exhibitionSlug) {
      fetchExhibitionDetail();
    }
  }, [exhibitionSlug, locale]);

  if (isLoading) {
    return (
      <LoadingSpin
        message={
          locale === 'vi'
            ? 'Đang tải thông tin triển lãm...'
            : 'Loading exhibition information...'
        }
      />
    );
  }

  if (error) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            {locale === 'vi' ? 'Lỗi' : 'Error'}
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchExhibitionDetail}
            className="mt-4 px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700"
          >
            {locale === 'vi' ? 'Thử lại' : 'Retry'}
          </button>
        </div>
      </Container>
    );
  }

  if (!exhibitionDetailData) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">
            {locale === 'vi'
              ? 'Không tìm thấy thông tin triển lãm'
              : 'Exhibition information not found'}
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="min-h-screen ">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
          {/* Left Column */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {VIAName}
            </h1>
            <h2 className="text-4xl md:text-3xl font-bold text-gray-900">
              {exhibitionDetailData.title}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold text-gray-700 mb-1">
              {formatDateOnly(exhibitionDetailData.start_date)} -{' '}
              {formatDateOnly(exhibitionDetailData.end_date)}
            </p>

            <p className="text-base text-gray-600">
              {exhibitionDetailData.location}
            </p>
          </div>
        </div>

        {/* Main Banner */}
        <div className="relative w-full h-96 md:h-[500px] mb-8  overflow-hidden">
          <CustomImage
            src={exhibitionDetailData.banner.url}
            alt={exhibitionDetailData.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Description Section */}
        <div className="mx-auto">
          <p className="text-gray-700 leading-relaxed text-justify">
            {exhibitionDetailData.description}
          </p>
        </div>

        <div className="rich-text-content mx-auto">
          <div
            dangerouslySetInnerHTML={{ __html: exhibitionDetailData.content }}
          />
        </div>
      </div>
    </Container>
  );
}
