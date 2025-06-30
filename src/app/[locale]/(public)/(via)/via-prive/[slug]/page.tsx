'use client';

import { useExhibitionDetail } from '@/hooks/exhibition/useExhibition';
import { Name } from '@/lib';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { formatDateOnly } from '@/utils';
import { useState } from 'react';
import type { ExhibitionCode, ExibitionDetailResponse } from '@/types';
import { getLocaleFromPath } from '@/utils/helpers/get_local_path.helper';
import CustomImage from '@/components/common/design/image.component';
import LoadingSpin from '@/components/loading/loading';

import {
  Container,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@/components';

export default function Page() {
  const router = useRouter();

  const { slug } = useParams();
  const pathname = usePathname();
  const exhibitionSlug = Array.isArray(slug) ? slug[0] : slug || '';
  const locale = getLocaleFromPath(pathname) || 'vi';

  // Dialog state
  const [open, setOpen] = useState(true);
  const [code, setCode] = useState('');

  //   Data response
  const [exhibitionDetailData, setExhibitionDetailData] =
    useState<ExibitionDetailResponse | null>(null);

  // Loading & Error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const VIAName = Name.VIA_ART_FAIR;

  const { mutate: exhibitionDetail } = useExhibitionDetail(exhibitionSlug);

  const fetchExhibitionDetail = async (inputCode: string) => {
    setIsLoading(true);
    setError(null);

    const exhibitionData: ExhibitionCode = { code: inputCode };
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
          setOpen(false);
        },
        onError: (error: any) => {
          setError(
            error?.message ||
              (locale === 'vi'
                ? 'Mã truy cập không hợp lệ hoặc không tìm thấy triển lãm.'
                : 'Invalid code or exhibition not found.')
          );
          setIsLoading(false);
        },
      }
    );
  };

  // UI - Loading
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

  // UI - Khi chưa có data (vẫn show dialog chờ nhập mã)
  if (!exhibitionDetailData) {
    return (
      <>
        <Dialog
          open={open}
          onOpenChange={(newOpen) => {
            if (exhibitionDetailData) {
              setOpen(newOpen);
            }
          }}
        >
          <DialogContent
            className="sm:max-w-md p-6 rounded-none shadow-none border border-gray-300"
            hideCloseButton
          >
            <DialogHeader>
              <DialogTitle>
                {locale === 'vi' ? 'Nhập mã truy cập' : 'Enter Access Code'}
              </DialogTitle>
              <DialogDescription>
                {locale === 'vi'
                  ? 'Vui lòng nhập mã để xem thông tin triển lãm.'
                  : 'Please enter the code to view exhibition details.'}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <Input
                placeholder={
                  locale === 'vi'
                    ? 'Nhập mã truy cập...'
                    : 'Enter access code...'
                }
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="rounded-none"
              />
              {error && (
                <p className="text-sm text-red-600 mt-2">
                  {locale === 'vi'
                    ? 'Mã truy cập không đúng'
                    : 'Invalid access code'}
                </p>
              )}
            </div>

            <DialogFooter className="mt-4 mx-auto flex justify-center gap-4">
              <Button
                variant="secondary"
                className="px-6 py-2 rounded-none min-w-[120px]"
                onClick={() => router.back()}
              >
                {locale === 'vi' ? 'Quay lại' : 'Go back'}
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="px-6 py-2 rounded-none min-w-[180px]"
                disabled={isLoading}
                onClick={() => {
                  if (!code.trim()) {
                    setError(
                      locale === 'vi'
                        ? 'Vui lòng nhập mã truy cập.'
                        : 'Please enter the access code.'
                    );
                    return;
                  }
                  fetchExhibitionDetail(code.trim());
                }}
              >
                {locale === 'vi' ? 'Xác nhận' : 'Submit'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
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
            onClick={() => fetchExhibitionDetail(code.trim())}
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
    <Container className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
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

        <div className="relative w-full h-96 md:h-[500px] mb-8 overflow-hidden">
          <CustomImage
            src={exhibitionDetailData.banner.url}
            alt={exhibitionDetailData.title}
            fill
            className="object-cover"
          />
        </div>

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
