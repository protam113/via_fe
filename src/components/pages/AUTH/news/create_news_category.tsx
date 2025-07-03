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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateNewsCategory } from '@/hooks';
import type {
  CreateNewsCategoryData,
  CreateNewsCategoryDialogProps,
} from '@/types';
import { NewsCategoryError } from '@/constants';
import { newsCategoryFormSchema } from '@/utils';

export default function CreateNewsCategoryDialog({
  open,
  setOpen,
  onSuccess,
}: CreateNewsCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof newsCategoryFormSchema>>({
    resolver: zodResolver(newsCategoryFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const { mutate: createNewsCategory } = useCreateNewsCategory();

  const handleCreateCategory = (
    values: z.infer<typeof newsCategoryFormSchema>
  ) => {
    setIsSubmitting(true);

    const categoryData: CreateNewsCategoryData = {
      title: values.title,
    };

    createNewsCategory(categoryData, {
      onSuccess: () => {
        onSuccess?.();
        form.reset();
        setOpen(false);
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        form.setError('root', {
          type: 'manual',
          message:
            error.message || NewsCategoryError.FAILED_CREATE_NEWS_CATEGORY,
        });
        setIsSubmitting(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className="rounded-none" onClick={() => setOpen(true)}>
        <Icons.Plus className="mr-2 h-4 w-4" />
        Create New Category
      </Button>
      <DialogContent className="sm:max-w-[425px] rounded-none bg-white">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Fill in the details for the new category.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateCategory)}>
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? 'Creating...' : 'Create New'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
