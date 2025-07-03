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
  Textarea,
} from '@/components';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddTranslationExhibiton } from '@/hooks';
import type { AddTranslationData, AddTranslationDialogProps } from '@/types';
import { exhibitionAddTranslationFormSchema } from '@/utils';
import { Spinner } from '@/components/loading/spinner';
import { NewsCategoryError } from '@/constants';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';
import { debounce } from './translationFields.table';

export default function AddTranslationDialog({
  open,
  language,
  postId,
  setOpen,
  onSuccess,
}: AddTranslationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof exhibitionAddTranslationFormSchema>>({
    resolver: zodResolver(exhibitionAddTranslationFormSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      price: '',
      location: '',
      language: language,
      exhibition_id: postId,
    },
  });

  const { mutate: addTranslation } = useAddTranslationExhibiton();

  const handleSubmit = (
    values: z.infer<typeof exhibitionAddTranslationFormSchema>
  ) => {
    setIsSubmitting(true);

    const data: AddTranslationData = {
      title: values.title,
      description: values.description,
      content: values.content,
      price: parseFloat(values.price),
      language: values.language,
      exhibition_id: values.exhibition_id,
      location: values.location,
    };

    addTranslation(
      { addTranslation: data },
      {
        onSuccess: () => {
          onSuccess?.();
          setOpen(false);
          form.reset();
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-6xl rounded-none bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Translation</DialogTitle>
          <DialogDescription>
            Fill in all required fields to translate this exhibition.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              {/* Price field */}
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price (e.g. 100.000 VND)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location field */}
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      initialContent={field.value}
                      onChange={(val) => field.onChange(val.html)}
                      className="w-full rounded-none cursor-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}

            {/* Price */}

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Spinner size={4} />}
                {isSubmitting ? 'Submitting...' : 'Submit Translation'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
