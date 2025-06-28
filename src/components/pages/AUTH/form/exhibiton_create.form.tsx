'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { exhibitionFormSchema } from '@/utils';
import { CreateExhibitionData } from '@/types';
import { useCreateExhibition } from '@/hooks/exhibition/useExhibition';
import { ExhibitionError } from '@/constants';
import ImageUploadPreview from '@/components/features/image_upload';
import ThumbnailUploadPreview from '@/components/features/thumbnail.upload';
import { TranslationFields } from '@/components/common/tables/translationFields.table';
import DateRangePicker from '@/components/common/options/DateRangePicker.option';
import CompanyManager from '@/components/common/options/CompanyInputGroup.option';

const statusOptions = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function EventForm({ category }: { category: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categoryId = category;

  const [uploadThumnailKey, setUploadThumbnailKey] = useState(0);
  const [uploadBannerKey, setUploadBannerKey] = useState(0);

  const { mutate: createEvent } = useCreateExhibition();

  const form = useForm<z.infer<typeof exhibitionFormSchema>>({
    resolver: zodResolver(exhibitionFormSchema),
    defaultValues: {
      start_date: '',
      end_date: '',
      banner_id: '',
      thumbnail_id: '',
      status: '',
      category_id: categoryId,
      companies: [],
      translations: [
        {
          language: 'en',
          title: '',
          description: '',
          content: '',
          location: '',
          price: 0,
        },
        {
          language: 'vn',
          title: '',
          description: '',
          content: '',
          location: '',
          price: 0,
        },
      ],
    },
  });

  const { fields: translationFields } = useFieldArray({
    control: form.control,
    name: 'translations',
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = form;
  const watchedValues = watch();

  const updateTranslation = (
    language: string,
    field: string,
    value: string | number
  ) => {
    const translationIndex = translationFields.findIndex(
      (t) => t.language === language
    );
    if (translationIndex !== -1) {
      setValue(`translations.${translationIndex}.${field}` as any, value);
    }
  };

  const handleThumbnailUploaded = (imageUrl: string, imageId: string) => {
    console.log('THUMBNAIL uploaded:', { imageUrl, imageId });
    setValue('thumbnail_id', imageId);
  };

  const handleBannerUploaded = (imageUrl: string, imageId: string) => {
    console.log('BANNER uploaded:', { imageUrl, imageId });
    setValue('banner_id', imageId);
  };

  const onSubmit = (values: z.infer<typeof exhibitionFormSchema>) => {
    console.log('=== FORM SUBMIT STARTED ===');
    console.log('Submit values:', values);

    setIsSubmitting(true);

    // Validation checks with logging
    if (!values.thumbnail_id) {
      form.setError('thumbnail_id', {
        type: 'manual',
        message: 'Thumbnail is required',
      });
      setIsSubmitting(false);
      return;
    }

    if (!values.banner_id) {
      form.setError('banner_id', {
        type: 'manual',
        message: 'Banner is required',
      });
      setIsSubmitting(false);
      return;
    }

    const enTranslation = values.translations.find((t) => t.language === 'en');
    const vnTranslation = values.translations.find((t) => t.language === 'vn');

    const hasEnTitle = enTranslation?.title?.trim();
    const hasVnTitle = vnTranslation?.title?.trim();

    if (!hasEnTitle && !hasVnTitle) {
      form.setError('root', {
        type: 'manual',
        message: 'Title is required in at least one language',
      });
      setIsSubmitting(false);
      return;
    }

    if (!values.start_date || !values.end_date) {
      form.setError('root', {
        type: 'manual',
        message: 'Start date and end date are required',
      });
      setIsSubmitting(false);
      return;
    }

    if (!values.status) {
      form.setError('root', {
        type: 'manual',
        message: 'Status is required',
      });
      setIsSubmitting(false);
      return;
    }

    const validTranslations = values.translations.filter(
      (translation) => translation.title && translation.title.trim() !== ''
    );

    const exhibitionData: CreateExhibitionData = {
      start_date: values.start_date,
      end_date: values.end_date,
      thumbnail_id: values.thumbnail_id,
      banner_id: values.banner_id,
      status: values.status,
      category_id: values.category_id,
      companies: values.companies ?? [],
      translations: validTranslations,
    };

    createEvent(exhibitionData, {
      onSuccess: () => {
        setIsSubmitting(false);
        form.reset();
        setUploadThumbnailKey((prev) => prev + 1);
        setUploadBannerKey((prev) => prev + 1);
        alert('Event created successfully!');
      },
      onError: (error) => {
        setIsSubmitting(false);
        form.setError('root', {
          type: 'manual',
          message: error.message || ExhibitionError.FAILED_CREATED,
        });
      },
    });
  };

  const getTranslationValue = (language: string, field: string) => {
    const translation = watchedValues.translations?.find(
      (t) => t.language === language
    );
    return translation?.[field as keyof typeof translation] || '';
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Create Exhibition</CardTitle>
          <CardDescription>
            Fill in the exhibition details with multilingual support
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
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800 text-sm">{errors.root.message}</p>
              </div>
            )}
            <Card className="rounded-none">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 space-y-6">
                  {/* Date + Status */}
                  <div className="md:col-span-1 space-y-4">
                    <DateRangePicker
                      value={{
                        start_date: watchedValues.start_date,
                        end_date: watchedValues.end_date,
                      }}
                      onChange={(range) => {
                        setValue('start_date', range.start_date);
                        setValue('end_date', range.end_date);
                      }}
                    />

                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={watchedValues.status}
                        onValueChange={(value) => {
                          console.log('Status selected:', value);
                          setValue('status', value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          {statusOptions.map((status) => (
                            <SelectItem
                              key={status.value}
                              value={status.value}
                              className="rounded-none"
                            >
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Company Manager chiếm 2/3 */}
                  <div className="md:col-span-2">
                    <CompanyManager form={form} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media IDs */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
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

              <div className="space-y-2">
                <Label htmlFor="banner">Banner</Label>
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
            </div>
            {/* Thêm richtext từ probfile */}
            {/* Translations */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Event Details</Label>

              <Tabs defaultValue="en" className="w-full rounded-none">
                <TabsList className="grid w-full grid-cols-2 bg-gray-400 rounded-none">
                  <TabsTrigger value="en" className="rounded-none">
                    English
                  </TabsTrigger>
                  <TabsTrigger value="vn" className="rounded-none">
                    Vietnamese
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="en">
                  <TranslationFields
                    lang="en"
                    getTranslationValue={getTranslationValue}
                    updateTranslation={updateTranslation}
                  />
                </TabsContent>

                <TabsContent value="vn">
                  <TranslationFields
                    lang="vn"
                    getTranslationValue={getTranslationValue}
                    updateTranslation={updateTranslation}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={isSubmitting}
                onClick={() => console.log('Submit button clicked!')}
              >
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
