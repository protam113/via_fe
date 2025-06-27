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
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
} from '@/components';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { format } from 'date-fns';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { exhibitionFormSchema } from '@/utils';
import { Companies, CreateExhibitionData } from '@/types';
import { useCreateExhibition } from '@/hooks/exhibition/useExhibition';
import { ExhibitionError } from '@/constants';
import ImageUploadPreview from '@/components/features/image_upload';
import ThumbnailUploadPreview from '@/components/features/thumbnail.upload';

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

  const [newCompany, setNewCompany] = useState<Companies>({
    name: '',
    url: '',
    image: '',
  });

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

  const {
    fields: companyFields,
    append: appendCompany,
    remove: removeCompany,
  } = useFieldArray({
    control: form.control,
    name: 'companies',
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

  const addCompany = () => {
    if (newCompany.name.trim()) {
      appendCompany({ ...newCompany });
      setNewCompany({ name: '', url: '', image: '' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCompany();
    }
  };

  const handleThumbnailUploaded = (imageUrl: string, imageId: string) => {
    setValue('thumbnail_id', imageId);
  };

  const handleBannerUploaded = (imageUrl: string, imageId: string) => {
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
      onSuccess: (data) => {
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
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>
            Fill in the event details with multilingual support
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

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchedValues.start_date
                        ? watchedValues.end_date
                          ? `${format(
                              new Date(watchedValues.start_date),
                              'dd/MM/yyyy'
                            )} - ${format(
                              new Date(watchedValues.end_date),
                              'dd/MM/yyyy'
                            )}`
                          : format(
                              new Date(watchedValues.start_date),
                              'dd/MM/yyyy'
                            )
                        : 'Select date range'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={{
                        from: watchedValues.start_date
                          ? new Date(watchedValues.start_date)
                          : undefined,
                        to: watchedValues.end_date
                          ? new Date(watchedValues.end_date)
                          : undefined,
                      }}
                      onSelect={(range) => {
                        console.log('Date range selected:', range);
                        setValue(
                          'start_date',
                          range?.from?.toISOString() || ''
                        );
                        setValue('end_date', range?.to?.toISOString() || '');
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

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
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

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

            {/* Translations */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Event Details</Label>
              <p className="text-sm text-gray-600">
                * At least one language title is required
              </p>
              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-400">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="vn">Vietnamese</TabsTrigger>
                </TabsList>

                <TabsContent value="en" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title (English)</Label>
                      <Input
                        value={getTranslationValue('en', 'title')}
                        onChange={(e) =>
                          updateTranslation('en', 'title', e.target.value)
                        }
                        placeholder="Enter English title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location (English)</Label>
                      <Input
                        value={getTranslationValue('en', 'location')}
                        onChange={(e) =>
                          updateTranslation('en', 'location', e.target.value)
                        }
                        placeholder="Enter location"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description (English)</Label>
                    <Textarea
                      value={getTranslationValue('en', 'description')}
                      onChange={(e) =>
                        updateTranslation('en', 'description', e.target.value)
                      }
                      placeholder="Enter English description"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content (English)</Label>
                    <Textarea
                      value={getTranslationValue('en', 'content')}
                      onChange={(e) =>
                        updateTranslation('en', 'content', e.target.value)
                      }
                      placeholder="Enter English content"
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={getTranslationValue('en', 'price')}
                      onChange={(e) =>
                        updateTranslation(
                          'en',
                          'price',
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Enter price"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="vn" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title (Vietnamese)</Label>
                      <Input
                        value={getTranslationValue('vn', 'title')}
                        onChange={(e) =>
                          updateTranslation('vn', 'title', e.target.value)
                        }
                        placeholder="Enter Vietnamese title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location (Vietnamese)</Label>
                      <Input
                        value={getTranslationValue('vn', 'location')}
                        onChange={(e) =>
                          updateTranslation('vn', 'location', e.target.value)
                        }
                        placeholder="Enter location"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description (Vietnamese)</Label>
                    <Textarea
                      value={getTranslationValue('vn', 'description')}
                      onChange={(e) =>
                        updateTranslation('vn', 'description', e.target.value)
                      }
                      placeholder="Enter Vietnamese description"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content (Vietnamese)</Label>
                    <Textarea
                      value={getTranslationValue('vn', 'content')}
                      onChange={(e) =>
                        updateTranslation('vn', 'content', e.target.value)
                      }
                      placeholder="Enter Vietnamese content"
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={getTranslationValue('vn', 'price')}
                      onChange={(e) =>
                        updateTranslation(
                          'vn',
                          'price',
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Enter price"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Companies Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Companies</Label>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Add Company</CardTitle>
                  <CardDescription>
                    Press Enter to add or click the plus button
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Company name"
                      value={newCompany.name}
                      onChange={(e) =>
                        setNewCompany((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      onKeyPress={handleKeyPress}
                    />
                    <Input
                      placeholder="Company URL"
                      value={newCompany.url}
                      onChange={(e) =>
                        setNewCompany((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                      onKeyPress={handleKeyPress}
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="Image URL"
                        value={newCompany.image}
                        onChange={(e) =>
                          setNewCompany((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addCompany} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {companyFields.filter((company) => company.name.trim()).length >
                0 && (
                <div className="space-y-2">
                  <Label>Added Companies</Label>
                  <div className="flex flex-wrap gap-2">
                    {companyFields.map((company, index) =>
                      company.name.trim() ? (
                        <Badge
                          key={company.id}
                          variant="secondary"
                          className="flex items-center gap-2 px-3 py-1"
                        >
                          <span>{company.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeCompany(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ) : null
                    )}
                  </div>
                </div>
              )}
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
