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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateNews } from '@/hooks';
import { UpdateNewsData, UpdateNewsDialogProps } from '@/types';
import { NewsCategoryError } from '@/constants';
import { updateNewsFormSchema } from '@/utils';
import { NewsCategoryList } from '@/lib';

export default function UpdateNewsDialog({
  news,
  open,
  setOpen,
  onSuccess,
}: UpdateNewsDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { newsCategories, isLoading, isError } = NewsCategoryList(
    1,
    { limit: 20 },
    0
  );
  const form = useForm<z.infer<typeof updateNewsFormSchema>>({
    resolver: zodResolver(updateNewsFormSchema),
    defaultValues: {
      title: news.title || '',
      url: news.url || '',
      url_type: news.url_type || '',
      type: news.type || '',
      category_id: news.category.id || '',
    },
  });
  const isDirty = form.formState.isDirty;

  useEffect(() => {
    if (news) {
      form.reset({
        title: news.title || '',
        url: news.url || '',
        url_type: news.url_type || '',
        type: news.type || '',
        category_id: news.category.id || '',
      });
    }
  }, [news, form]);

  const { mutate: updateNews } = useUpdateNews();

  const handleUpdateNews = (values: z.infer<typeof updateNewsFormSchema>) => {
    setIsSubmitting(true);

    const newsData: UpdateNewsData = {
      title: values.title,
      url: values.url,
      url_type: values.url_type,
      type: values.type,
      category_id: values.category_id,
    };

    updateNews(
      { updateNews: newsData, postId: news.id },
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
          <form onSubmit={form.handleSubmit(handleUpdateNews)}>
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
                  <FormLabel>URL </FormLabel>
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
                        <SelectValue placeholder="Select url type" />
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
                    disabled={isLoading || isError} // disable khi loading hoặc lỗi
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category type" />
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
                  {isSubmitting ? 'Updating...' : 'Update News'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
