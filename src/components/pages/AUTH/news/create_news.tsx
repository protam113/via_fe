'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';

import { Loader2 } from 'lucide-react';
import { useCreateNews } from '@/hooks';
import { NewsCategoryList } from '@/lib';
import { newsFormSchema } from '@/utils';
import { NewsError } from '@/constants';
import type { CreateNewsCategoryDialogProps, CreateNewsData } from '@/types';

export default function CreateNewsDialog({
  open,
  setOpen,
  onSuccess,
}: CreateNewsCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { newsCategories, isLoading, isError } = NewsCategoryList(
    1,
    { limit: 20 },
    0
  );

  const form = useForm<z.infer<typeof newsFormSchema>>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: '',
      url: '',
      url_type: '',
      type: '',
      category_id: '',
    },
  });

  const { mutate: createNews } = useCreateNews();

  const handleCreateCategory = (values: z.infer<typeof newsFormSchema>) => {
    setIsSubmitting(true);

    const newsData: CreateNewsData = {
      title: values.title,
      url: values.url,
      url_type: values.url_type,
      type: values.type,
      category_id: values.category_id,
    };

    createNews(newsData, {
      onSuccess: () => {
        onSuccess?.();
        setOpen(false);
        form.reset();
      },
      onError: (error: any) => {
        form.setError('root', {
          type: 'manual',
          message: error.message || NewsError.FAILED_CREATE_NEWS_FORM,
        });
        setIsSubmitting(false);
      },
    });
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      form.clearErrors();
      setIsSubmitting(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select URL type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fb">Facebook</SelectItem>
                      <SelectItem value="link">Web</SelectItem>
                      <SelectItem value="ig">Instagram</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">NEW</SelectItem>
                      <SelectItem value="hot">HOT</SelectItem>
                      <SelectItem value="popular">Popular</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading || isError}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="" disabled>
                          Loading...
                        </SelectItem>
                      ) : isError ? (
                        <SelectItem value="" disabled>
                          Data loading error
                        </SelectItem>
                      ) : (
                        newsCategories?.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
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
                  {isSubmitting ? 'Creating...' : 'Create News'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
