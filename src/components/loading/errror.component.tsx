'use client';

import { FC } from 'react';
import Container from '@/components/wrappers/container';
import type { BannerErrorProps } from '@/types';

const BannerError: FC<BannerErrorProps> = ({
  locale = 'vi',
  onRetry,
  message,
}) => {
  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          {locale === 'vi' ? 'Lỗi' : 'Error'}
        </h2>
        <p className="text-base font-semibold text-red-600 mb-2">{message}</p>
        <p className="text-gray-600">
          {locale === 'vi'
            ? 'Không thể tải. Vui lòng thử lại.'
            : 'Failed to load. Please try again.'}
        </p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
        >
          {locale === 'vi' ? 'Thử lại' : 'Retry'}
        </button>
      </div>
    </Container>
  );
};

export default BannerError;
