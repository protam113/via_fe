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
import { Loader2 } from 'lucide-react';
import { Icons } from '@/assets/icons/icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateNewsCategory } from '@/hooks';
import { CreateNewsCategoryData, UpdateNewsCategoryDialogProps } from '@/types';
import { NewsCategoryError } from '@/constants';
import { newsCategoryFormSchema } from '@/utils';

export default function UpdateNewsCategoryDialog({
  news_category,
  open,
  setOpen,
  onSuccess,
}: UpdateNewsCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof newsCategoryFormSchema>>({
    resolver: zodResolver(newsCategoryFormSchema),
    defaultValues: {
      title: news_category.title || '',
    },
  });
  const isDirty = form.formState.isDirty;

  useEffect(() => {
    if (news_category) {
      form.reset({
        title: news_category.title || '',
      });
    }
  }, [news_category, form]);

  const { mutate: updateNewsCategory } = useUpdateNewsCategory();

  const handleUpdateCategory = (
    values: z.infer<typeof newsCategoryFormSchema>
  ) => {
    setIsSubmitting(true);

    const categoryData: CreateNewsCategoryData = {
      title: values.title,
    };

    updateNewsCategory(
      { updateNewsCategory: categoryData, postId: news_category.id },
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
      <DialogContent className="sm:max-w-[425px] rounded-none bg-white">
        <DialogHeader>
          <DialogTitle>Update News Category</DialogTitle>
          <DialogDescription>
            Fill in the details for the news category.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateCategory)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter news category title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex mt-6 gap-4">
                <Button type="submit" disabled={isSubmitting || !isDirty}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? 'Saving...' : 'Save changes'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
