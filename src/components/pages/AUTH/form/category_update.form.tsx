'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { Loader2, Upload, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCategory } from '@/hooks';
import type { UpdateCategoryDialogProps, UpdateThumbnail } from '@/types';
import { NewsCategoryError } from '@/constants';
import { categoryFormSchema } from '@/utils';
import ImageUploadPreview from '@/components/features/image_upload';
import CustomImage from '@/components/common/design/image.component';

export default function UpdateCategoryDialog({
  category,
  open,
  setOpen,
  onSuccess,
}: UpdateCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [hasNewImage, setHasNewImage] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);
  const [newThumbnailId, setNewThumbnailId] = useState<string | null>(null); // Add this state

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      thumbnail_id: category.thumbnail?.url || '',
    },
  });
  const isDirty = form.formState.isDirty;

  useEffect(() => {
    if (category) {
      form.reset({
        thumbnail_id: category.thumbnail?.url || '',
      });
      setHasNewImage(false);
      setNewImagePreview(null);
      setNewThumbnailId(null); // Reset new thumbnail ID
      setShowUploader(false);
      setUploadKey((prev) => prev + 1);
    }
  }, [category, form]);

  const { mutate: updateNewsCategory } = useUpdateCategory();

  const handleImageUploaded = (imageUrl: string, uploadId: string) => {
    setNewThumbnailId(uploadId);

    form.setValue('thumbnail_id', uploadId, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (imageUrl) {
      setNewImagePreview(imageUrl);
    }

    setHasNewImage(true);
    setShowUploader(false);
  };

  const handleChangeImage = () => {
    setShowUploader(true);
  };

  useEffect(() => {
    const handleFileSelection = (event: CustomEvent) => {
      if (event.detail && event.detail.previewUrl) {
        setNewImagePreview(event.detail.previewUrl);
      }
    };

    if (showUploader) {
      window.addEventListener(
        'imageFileSelected',
        handleFileSelection as EventListener
      );
      return () => {
        window.removeEventListener(
          'imageFileSelected',
          handleFileSelection as EventListener
        );
      };
    }
  }, [showUploader]);

  const handleCancelUpload = () => {
    setShowUploader(false);
    if (!hasNewImage) {
      // Reset to original if no new image was uploaded
      form.setValue('thumbnail_id', category.thumbnail?.url || '');
      setNewImagePreview(null);
      setNewThumbnailId(null);
    }
    setUploadKey((prev) => prev + 1); // Reset upload component
  };

  const handleUpdateCategory = (values: z.infer<typeof categoryFormSchema>) => {
    setIsSubmitting(true);

    const categoryData: UpdateThumbnail = {
      thumbnail_id: values.thumbnail_id,
    };

    updateNewsCategory(
      { updateCategory: categoryData, id: category.id },
      {
        onSuccess: () => {
          onSuccess?.();
          setOpen(false);
          form.reset();
          setIsSubmitting(false);
          setHasNewImage(false);
          setNewImagePreview(null);
          setNewThumbnailId(null);
          setShowUploader(false);
        },
        onError: (error: any) => {
          form.setError('root', {
            type: 'manual',
            message:
              error.message || NewsCategoryError.FAILED_UPDATE_NEWS_CATEGORY,
          });
          setIsSubmitting(false);
        },
      }
    );
  };

  // Improved logic for displaying image
  const displayImageUrl = (() => {
    if (newImagePreview) {
      return newImagePreview;
    }
    if (hasNewImage && newThumbnailId) {
      return category.thumbnail?.url || '/logo.svg';
    }
    return category.thumbnail?.url || '/logo.svg';
  })();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] rounded-none bg-white">
        <DialogHeader>
          <DialogTitle>Update Category Thumbnail</DialogTitle>
          <DialogDescription>
            Change the thumbnail image for this category.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateCategory)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="thumbnail_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Thumbnail</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {/* Current/New image preview */}
                      <div className="relative">
                        <div className="w-full h-[250px] border rounded-lg overflow-hidden bg-gray-50">
                          {displayImageUrl ? (
                            <CustomImage
                              src={displayImageUrl}
                              alt="Category Thumbnail"
                              width={500}
                              height={250}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <div className="text-center">
                                <Upload className="h-12 w-12 mx-auto mb-2" />
                                <p>No image available</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* New image indicator */}
                        {hasNewImage && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            New Image
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      {!showUploader ? (
                        <div className="flex justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleChangeImage}
                            disabled={isSubmitting}
                            className="flex items-center gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            {hasNewImage
                              ? 'Change Image Again'
                              : 'Change Image'}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Upload component */}
                          <ImageUploadPreview
                            key={uploadKey}
                            type="thumbnail"
                            onImageUploaded={handleImageUploaded}
                          />

                          {/* Upload actions */}
                          <div className="flex justify-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleCancelUpload}
                            >
                              Cancel Upload
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Hidden input to store thumbnail_id */}
                      <Input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error message */}
            {form.formState.errors.root && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {form.formState.errors.root.message}
              </div>
            )}

            <DialogFooter>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="min-w-[120px]"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
