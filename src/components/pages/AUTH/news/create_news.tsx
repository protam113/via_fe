'use client';

import { useEffect, useState } from 'react';
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

  // ✅ Fetch categories
  const { newsCategories, isLoading, isError } = NewsCategoryList(
    1,
    { limit: 20 },
    0
  );

  // ✅ Form
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

  // ✅ Mutation
  const { mutate: createNews } = useCreateNews();

  const handleCreate = (values: z.infer<typeof newsFormSchema>) => {
    setIsSubmitting(true);

    const payload: CreateNewsData = {
      title: values.title,
      url: values.url,
      url_type: values.url_type,
      type: values.type,
      category_id: values.category_id,
    };

    createNews(payload, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        setIsSubmitting(false); // 🔥 Fix stuck loading
        onSuccess?.();
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

  // ✅ Reset form when dialog is closed
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
          <DialogTitle>Create New News</DialogTitle>
          <DialogDescription>
            Fill in the details for the new news item.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreate)}
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
                    <Input
                      placeholder="Enter news title"
                      {...field}
                      className="rounded-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter URL"
                      {...field}
                      className="rounded-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              {/* URL Type */}
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="url_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Type</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Select URL type"
                              className="rounded-none"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          <SelectItem value="fb" className="rounded-none">
                            Facebook
                          </SelectItem>
                          <SelectItem value="link" className="rounded-none">
                            Website
                          </SelectItem>
                          <SelectItem value="ig" className="rounded-none">
                            Instagram
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Type */}
              <div className="w-1/2">
                {/* Category */}
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
                        <SelectContent className="max-h-[120px] overflow-y-auto">
                          {isLoading ? (
                            <SelectItem value="" disabled>
                              Loading...
                            </SelectItem>
                          ) : isError ? (
                            <SelectItem value="" disabled>
                              Error loading categories
                            </SelectItem>
                          ) : (
                            newsCategories?.map((cat: any) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.title}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
            {/* Submit */}
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
