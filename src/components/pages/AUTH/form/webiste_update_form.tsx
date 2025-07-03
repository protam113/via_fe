'use client';

import React, { useEffect } from 'react';
import {
  Input,
  Label,
  Textarea,
  Card,
  CardContent,
  CardFooter,
  Button,
  AdminLoading,
  NoResultsFound,
} from '@/components';

// Hooks data
import { useUpdateWebsite } from '@/hooks';
import { WebsiteList } from '@/lib';

// Form
import { updateWebsiteFormSchema } from '@/utils';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export function WebsiteUpdateForm() {
  const { website, isLoading, isError } = WebsiteList(0);
  const { mutate: updateWebsite } = useUpdateWebsite();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof updateWebsiteFormSchema>>({
    resolver: zodResolver(updateWebsiteFormSchema),
    defaultValues: {
      facebook: '',
      phone_number: '',
      messenger: '',
      instagram: '',
      tiktok: '',
    },
  });
  useEffect(() => {
    if (website) {
      reset({
        facebook: website.facebook || '',
        messenger: website.messenger || '',
        instagram: website.instagram || '',
        tiktok: website.tiktok || '',
        phone_number: website.phone_number || '',
      });
    }
  }, [website, reset]);

  // Cập nhật form khi website data thay đổi

  const onSubmit = (values: z.infer<typeof updateWebsiteFormSchema>) => {
    updateWebsite(
      { updateWebsite: values },
      {
        onSuccess: () => {
          clearErrors();
        },
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

  if (isError) return <NoResultsFound />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full rounded-none">
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Site Information</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  {...register('facebook')}
                  className="rounded-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="messenger">Messenger</Label>
                <Input
                  id="messenger"
                  {...register('messenger')}
                  className="rounded-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok</Label>
              <Textarea
                id="tiktok"
                rows={3}
                {...register('tiktok')}
                className="rounded-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Textarea
                id="instagram"
                rows={3}
                {...register('instagram')}
                className="rounded-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Textarea
                id="phone_number"
                rows={3}
                {...register('phone_number')}
                className="rounded-none"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="ml-auto bg-blue-500 hover:bg-blue-700 rounded-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
