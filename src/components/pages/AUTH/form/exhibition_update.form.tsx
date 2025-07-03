'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Button,
} from '@/components';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { exhibitionUpdateHeadSchema, logDebug } from '@/utils';
import { useUpdateExhibiton } from '@/hooks';
import { ExhibitionError } from '@/constants';
import ImageUploadPreview from '@/components/features/image_upload';
import ThumbnailUploadPreview from '@/components/features/thumbnail.upload';
import CompanyManager from '@/components/common/options/CompanyInputGroup.option';
import type {
  UpdateExhibitionData,
  UpdateExhibitionDialogProps,
} from '@/types';
import DateRangeUpdatePicker from '@/components/common/options/DateRangePicker.update';
import CustomImage from '@/components/common/design/image.component';
import { Icons } from '@/assets/icons/icons';

export function UpdateEventHeadForm({
  category,
  exhibition,
  postId,
  href,
}: UpdateExhibitionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categoryId = category;
  const errorRef = useRef<HTMLDivElement>(null);

  const [uploadThumnailKey, setUploadThumbnailKey] = useState(0);
  const [uploadBannerKey, setUploadBannerKey] = useState(0);

  // Lưu URL của ảnh mới được upload
  const [newBannerUrl, setNewBannerUrl] = useState<string>('');
  const [newThumbnailUrl, setNewThumbnailUrl] = useState<string>('');

  const { mutate: createEvent } = useUpdateExhibiton();

  const form = useForm<z.infer<typeof exhibitionUpdateHeadSchema>>({
    mode: 'onSubmit',
    defaultValues: {
      start_date: '',
      end_date: '',
      banner_id: '',
      thumbnail_id: '',
      status: '',
      category_id: categoryId,
      companies: [],
    },
  });

  useEffect(() => {
    if (exhibition) {
      form.reset({
        start_date: exhibition.start_date || '',
        end_date: exhibition.end_date || '',
        banner_id: exhibition.banner?.id || '',
        thumbnail_id: exhibition.thumbnail?.id || '',
        status: exhibition.status || '',
        category_id: categoryId,
        companies: exhibition.companies || [],
      });
    }
  }, [exhibition, form.reset, categoryId]);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedValues = watch();

  const handleThumbnailUploaded = (imageUrl: string, imageId: string) => {
    logDebug('THUMBNAIL uploaded:', { imageUrl, imageId });
    setValue('thumbnail_id', imageId);
    setNewThumbnailUrl(imageUrl);
    setUploadThumbnailKey((prev) => prev + 1);
  };

  const handleBannerUploaded = (imageUrl: string, imageId: string) => {
    logDebug('BANNER uploaded:', { imageUrl, imageId });
    setValue('banner_id', imageId);
    setNewBannerUrl(imageUrl);
    setUploadBannerKey((prev) => prev + 1);
  };

  const displayBannerUrl = (() => {
    if (
      watchedValues.banner_id &&
      watchedValues.banner_id !== exhibition?.banner?.id
    ) {
      return newBannerUrl || '/default-banner.jpg';
    }
    return exhibition?.banner?.url || '/default-banner.jpg';
  })();

  const displayThumbnailUrl = (() => {
    if (
      watchedValues.thumbnail_id &&
      watchedValues.thumbnail_id !== exhibition?.thumbnail?.id
    ) {
      return newThumbnailUrl || '/default-thumbnail.jpg';
    }
    return exhibition?.thumbnail?.url || '/default-thumbnail.jpg';
  })();

  const hasNewBanner =
    watchedValues.banner_id &&
    watchedValues.banner_id !== exhibition?.banner?.id;
  const hasNewThumbnail =
    watchedValues.thumbnail_id &&
    watchedValues.thumbnail_id !== exhibition?.thumbnail?.id;

  const onSubmit = (values: z.infer<typeof exhibitionUpdateHeadSchema>) => {
    setIsSubmitting(true);

    form.clearErrors();

    const errorsFound = [];

    if (
      (values.start_date && !values.end_date) ||
      (!values.start_date && values.end_date)
    ) {
      errorsFound.push(
        'Both start date and end date are required if you want to update dates'
      );
    }

    // Validate start_date < end_date nếu cả hai đều có
    if (values.start_date && values.end_date) {
      const startDate = new Date(values.start_date);
      const endDate = new Date(values.end_date);
      if (startDate >= endDate) {
        errorsFound.push('Start date must be before end date');
      }
    }

    if (errorsFound.length > 0) {
      form.setError('root', {
        type: 'manual',
        message: errorsFound.join(' | '),
      });
      setIsSubmitting(false);
      return;
    }

    // Chỉ gửi những trường có thay đổi so với giá trị gốc
    const exhibitionData: Partial<UpdateExhibitionData> = {};

    // So sánh với giá trị gốc và chỉ gửi những field có thay đổi
    if (values.start_date && values.start_date !== exhibition?.start_date) {
      exhibitionData.start_date = values.start_date;
    }
    if (values.end_date && values.end_date !== exhibition?.end_date) {
      exhibitionData.end_date = values.end_date;
    }
    if (
      values.thumbnail_id &&
      values.thumbnail_id !== exhibition?.thumbnail?.id
    ) {
      exhibitionData.thumbnail_id = values.thumbnail_id;
    }
    if (values.banner_id && values.banner_id !== exhibition?.banner?.id) {
      exhibitionData.banner_id = values.banner_id;
    }
    if (values.status && values.status !== exhibition?.status) {
      exhibitionData.status = values.status;
    }

    const currentCompanies = JSON.stringify(exhibition?.companies || []);
    const newCompanies = JSON.stringify(values.companies || []);
    if (currentCompanies !== newCompanies) {
      exhibitionData.companies = values.companies || [];
    }

    if (Object.keys(exhibitionData).length === 0) {
      form.setError('root', {
        type: 'manual',
        message: 'No changes detected. Please modify at least one field.',
      });
      setIsSubmitting(false);
      return;
    }

    createEvent(
      { updatePost: exhibitionData as UpdateExhibitionData, postId: postId },
      {
        onSuccess: () => {
          setIsSubmitting(false);
        },
        onError: (error) => {
          setIsSubmitting(false);
          form.setError('root', {
            type: 'manual',
            message: error.message || ExhibitionError.FAILED_CREATED,
          });
        },
      }
    );
  };

  useEffect(() => {
    if (errors.root) {
      setTimeout(() => {
        errorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50);
    }
  }, [errors.root]);

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Update Exhibition</CardTitle>
          <CardDescription>
            Update exhibition details - only fill in the fields you want to
            change
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              return handleSubmit(onSubmit)(e);
            }}
            className="space-y-6"
          >
            {/* Error Display */}
            {errors.root && (
              <div
                ref={errorRef}
                className="bg-red-50 border border-red-200 rounded-md p-4 scroll-mt-28"
              >
                <p className="text-red-800 text-sm font-medium">
                  {errors.root.message}
                </p>
              </div>
            )}

            <Card className="rounded-none">
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Date + Status */}
                  <div className="md:col-span-1 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 min-w-[220px]">
                      <DateRangeUpdatePicker
                        value={{
                          start_date: watchedValues.start_date || '',
                          end_date: watchedValues.end_date || '',
                        }}
                        onChange={(range) => {
                          console.log('Date range changed:', range);
                          setValue('start_date', range.start_date);
                          setValue('end_date', range.end_date);
                        }}
                      />
                      {(errors.start_date || errors.end_date) && (
                        <p className="text-red-500 text-sm mt-1">
                          {[
                            errors.start_date?.message,
                            errors.end_date?.message,
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Manager chiếm 2/3 */}
                  <div className="md:col-span-2">
                    <CompanyManager form={form} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner" className="text-lg font-semibold">
                    Banner (optional)
                  </Label>
                  <div className="relative">
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                      {displayBannerUrl ? (
                        <CustomImage
                          src={displayBannerUrl}
                          alt="Banner Image"
                          width={500}
                          height={250}
                          className="w-full h-60 object-cover"
                        />
                      ) : (
                        <div className="w-full h-60 flex items-center justify-center text-gray-400 bg-gray-50">
                          <div className="text-center">
                            <Icons.Upload className="h-12 w-12 mx-auto mb-2" />
                            <p>No banner image available</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* New image indicator */}
                    {hasNewBanner && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <Icons.Check className="h-3 w-3" />
                        New Image
                      </div>
                    )}
                  </div>
                  <ImageUploadPreview
                    key={uploadBannerKey}
                    type="banner"
                    onImageUploaded={handleBannerUploaded}
                  />
                  {errors.banner_id && (
                    <p className="text-red-500 text-sm">
                      {errors.banner_id.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Media IDs */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="text-lg font-semibold">
                  Thumbnail (optional)
                </Label>
                <div className="relative">
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    {displayThumbnailUrl ? (
                      <CustomImage
                        src={displayThumbnailUrl}
                        alt="Thumbnail Image"
                        width={500}
                        height={250}
                        className="w-full h-60 object-cover"
                      />
                    ) : (
                      <div className="w-full h-60 flex items-center justify-center text-gray-400 bg-gray-50">
                        <div className="text-center">
                          <Icons.Upload className="h-12 w-12 mx-auto mb-2" />
                          <p>No thumbnail image available</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* New image indicator */}
                  {hasNewThumbnail && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                      <Icons.Check className="h-3 w-3" />
                      New Image
                    </div>
                  )}
                </div>
                <ThumbnailUploadPreview
                  key={uploadThumnailKey}
                  type="thumbnail"
                  onImageUploaded={handleThumbnailUploaded}
                />
                {errors.thumbnail_id && (
                  <p className="text-red-500 text-sm">
                    {errors.thumbnail_id.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
