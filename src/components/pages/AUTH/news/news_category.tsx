'use client';

import type React from 'react';
import { useState } from 'react';
//UI components
import { CustomPagination } from '@/components/common/design/pagination';
import {
  Button,
  RefreshButton,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormField,
  FormItem,
  FormLabel,
  Input,
  FormControl,
  FormMessage,
  Form,
} from '@/components';
import { ArrowIcons, Icons } from '@/assets/icons/icons';

//Components
import Heading from '@/components/common/design/Heading';

import { useDeleteContact } from '@/hooks/contact/useContact';
import AdminContainer from '@/components/wrappers/admin.container';
import { NewsCategoryTable } from '@/components/common/tables/news_category.table';
import { NewsCategoryList } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useCreateNewsCategory } from '@/hooks';
import { CreateNewsCategoryData } from '@/types';
import { Loader2 } from 'lucide-react';
import CreateNewsCategoryDialog from './create_news_category';

const formSchema = z.object({
  title: z.string().min(1, 'title is required'),
});

export default function NewsCategory() {
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedContact, setSelectedContact] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { mutate: deleteContact } = useDeleteContact();
  const { mutate: createNewsCategory } = useCreateNewsCategory();

  const handleDeleteClick = (id: string) => {
    setSelectedContact(id); // Chọn contact cần xóa
    setDeleteDialogOpen(true); // Mở dialog xác nhận xóa
  };

  const handleDeleteConfirm = () => {
    if (selectedContact) {
      deleteContact(selectedContact);
      setSelectedContact(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const params = {
    limit: pageSize,
  };

  const { newsCategories, isLoading, isError, pagination } = NewsCategoryList(
    currentPage,
    params,
    refreshKey
  );

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  const handleCreateCategory = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Create a blog item object matching the CreateBlogItem type
      const categoryData: CreateNewsCategoryData = {
        title: values.title,
      };

      createNewsCategory(categoryData, {
        onSuccess: () => {
          setRefreshKey((prev) => prev + 1);
        },
        onError: (error: any) => {
          console.error('Error creating news category:', error);
          form.setError('root', {
            type: 'manual',
            message:
              error.message ||
              'Failed to create news category. Please try again.',
          });
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <AdminContainer>
        <div className="flex items-center justify-between mb-4">
          <Heading
            name="News Category Management"
            desc="Create, update, and organize news categories easily for better content management"
          />
          <CreateNewsCategoryDialog
            open={isCreateDialogOpen}
            setOpen={setIsCreateDialogOpen}
            onSuccess={() => setRefreshKey((prev) => prev + 1)}
          />
        </div>
        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <RefreshButton onClick={handleRefresh} />
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Show:</span>
              <Select
                onValueChange={handlePageSizeChange}
                defaultValue={String(pageSize)}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <NewsCategoryTable
            news={newsCategories}
            isLoading={isLoading}
            isError={isError}
            onDelete={handleDeleteClick}
          />
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </AdminContainer>
    </>
  );
}
