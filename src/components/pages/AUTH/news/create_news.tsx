'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Icons } from '@/assets/icons/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateNews } from '@/hooks';
import { CreateNewsCategoryDialogProps, CreateNewsData } from '@/types';
import { NewsCategoryList } from '@/lib';

// Form Schema
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().min(1, 'URL is required'),
  url_type: z.string().min(1, 'URL type is required'),
  type: z.string().min(1, 'Type is required'),
  category_id: z.string().min(1, 'Category is required'),
});

export default function CreateNewsDialog({
  open,
  setOpen,
  onSuccess,
}: CreateNewsCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   news category
  const { newsCategories, isLoading, isError } = NewsCategoryList(
    1,
    { limit: 20 },
    0
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { mutate: createNews } = useCreateNews();

  const handleCreateCategory = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Data value
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
          message:
            error.message ||
            'Failed to create news category. Please try again.',
        });
        setIsSubmitting(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-none">
          <Icons.Plus className="mr-2 h-4 w-4" />
          Create New Category
        </Button>
      </DialogTrigger>
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
                      <SelectItem value="global">Web</SelectItem>
                      <SelectItem value="ig">Instagram</SelectItem>
                      <SelectItem value="tiktok">Tiktok</SelectItem>
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
                      <SelectItem value="normal">Normal</SelectItem>
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
