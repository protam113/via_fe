'use client';

import { SeoList } from '@/lib';
import React, { useEffect, useState } from 'react';
import {
  Input,
  Label,
  Textarea,
  Badge,
  Card,
  CardContent,
  CardFooter,
  Button,
} from '@/components';
import type { UpdateSeo } from '@/types';
import { useUpdateSeo } from '@/hooks';
import { AdminLoading } from '@/components/loading/loading.components';
import { Icons } from '@/assets/icons/icons';

// Form validation schema
import { SEOFormSchema } from '@/utils';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export function SeoSettingsForm() {
  const { seo, isLoading, isError } = SeoList(0);
  const { mutate: updateSeo } = useUpdateSeo();
  const [newKeyword, setNewKeyword] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof SEOFormSchema>>({
    resolver: zodResolver(SEOFormSchema),
    defaultValues: {
      site_title: '',
      site_description: '',
      domain: '',
      keywords: [],
      google_analytics_id: '',
      gtm_id: '',
      facebook_pixel_id: '',
      search_console_verification: '',
    },
  });

  const keywords = watch('keywords');

  useEffect(() => {
    if (seo) {
      const safeSeo = seo as UpdateSeo;
      reset({
        site_title: safeSeo.site_title || '',
        site_description: safeSeo.site_description || '',
        domain: safeSeo.domain || '',
        keywords: safeSeo.keywords || [],
        google_analytics_id: safeSeo.google_analytics_id || '',
        gtm_id: safeSeo.gtm_id || '',
        facebook_pixel_id: safeSeo.facebook_pixel_id || '',
        search_console_verification: safeSeo.search_console_verification || '',
      });
    }
  }, [seo, reset]);

  const addKeyword = () => {
    const trimmed = newKeyword.trim();
    if (!trimmed || keywords.includes(trimmed)) return;
    setValue('keywords', [...keywords, trimmed]);
    setNewKeyword('');
  };

  const removeKeyword = (keywordToRemove: string) => {
    setValue(
      'keywords',
      keywords.filter((k) => k !== keywordToRemove)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const onSubmit = (values: z.infer<typeof SEOFormSchema>) => {
    updateSeo(
      { updateSeo: values },
      {
        onSuccess: () => clearErrors(),
        onError: (error: any) => {
          setError('root', {
            type: 'manual',
            message: error.message || 'Update failed',
          });
        },
      }
    );
  };

  if (isLoading) return <AdminLoading message="Loading.." />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load SEO settings.
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full rounded-none">
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Site Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="site_title">Site Title</Label>
                <Input
                  id="site_title"
                  {...register('site_title')}
                  className="rounded-none"
                />
                {errors.site_title && (
                  <p className="text-red-500 text-sm">
                    {errors.site_title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  {...register('domain')}
                  className="rounded-none"
                />
                {errors.domain && (
                  <p className="text-red-500 text-sm">
                    {errors.domain.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea
                id="site_description"
                {...register('site_description')}
                rows={3}
                className="rounded-none"
              />
              {errors.site_description && (
                <p className="text-red-500 text-sm">
                  {errors.site_description.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Keywords</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {keywords?.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-1 rounded-full hover:bg-muted"
                    aria-label={`Remove ${keyword}`}
                  >
                    <Icons.X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="new-keyword"
                placeholder="Add a keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-none"
              />
              <Button
                type="button"
                onClick={addKeyword}
                variant="outline"
                size="icon"
                aria-label="Add keyword"
              >
                <Icons.PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            {errors.keywords && (
              <p className="text-red-500 text-sm">{errors.keywords.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tracking IDs</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  {...register('google_analytics_id')}
                  className="rounded-none"
                />
                {errors.google_analytics_id && (
                  <p className="text-red-500 text-sm">
                    {errors.google_analytics_id.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gtm_id">Google Tag Manager ID</Label>
                <Input
                  id="gtm_id"
                  {...register('gtm_id')}
                  className="rounded-none"
                />
                {errors.gtm_id && (
                  <p className="text-red-500 text-sm">
                    {errors.gtm_id.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                <Input
                  id="facebook_pixel_id"
                  {...register('facebook_pixel_id')}
                  className="rounded-none"
                />
                {errors.facebook_pixel_id && (
                  <p className="text-red-500 text-sm">
                    {errors.facebook_pixel_id.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="search_console_verification">
                  Search Console Verification
                </Label>
                <Input
                  id="search_console_verification"
                  {...register('search_console_verification')}
                  className="rounded-none"
                />
                {errors.search_console_verification && (
                  <p className="text-red-500 text-sm">
                    {errors.search_console_verification.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="ml-auto bg-blue-500 hover:bg-blue-700 rounded-none"
          >
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
