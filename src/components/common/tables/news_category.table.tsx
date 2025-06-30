'use client';

import React, { useState } from 'react';
// UI Components
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Checkbox,
} from '@/components';

import { Skeleton } from '@/components/ui/skeleton';
import NoResultsFound from '@/components/common/design/NoResultsFound';
// Hooks & Utils
// Types
import { NewsCategoryColumns } from '@/types';
import type { NewsCategoryTableProps } from '@/types/news/news_category.prob';
import { newsCategoryDeleteFormSchema } from '@/utils';

// Zod & React Hook Form
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDeleteNewsCategory } from '@/hooks';
import type { DeleteNewsCategoryData } from '@/types';
import { NewsCategoryError } from '@/constants/log/error.log';
import { ConfirmDialog } from '../design/ConfirmDialog';
import UpdateNewsCategoryDialog from '@/components/pages/AUTH/news/uppdate_news_category';
import { Icons } from '@/assets/icons/icons';

export const NewsCategoryTable: React.FC<NewsCategoryTableProps> = ({
  news,
  isLoading,
  isError,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    (typeof news)[0] | null
  >(null);

  const { mutate: updateDeleteNewsCategory } = useDeleteNewsCategory();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof newsCategoryDeleteFormSchema>>({
    resolver: zodResolver(newsCategoryDeleteFormSchema),
    defaultValues: {
      ids: [],
    },
  });

  const handleDeleteNewsCategory = (
    values: z.infer<typeof newsCategoryDeleteFormSchema>
  ) => {
    setIsSubmitting(true);

    const newsData: DeleteNewsCategoryData = {
      ids: values.ids,
    };

    updateDeleteNewsCategory(newsData, {
      onSuccess: () => {
        setSelectedIds([]);
        form.reset();
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        form.setError('root', {
          type: 'manual',
          message:
            error.message || NewsCategoryError.FAILED_DELETE_NEWS_CATEGORY,
        });
        setIsSubmitting(false);
      },
    });
  };

  return (
    <>
      <div className=" border">
        {selectedIds.length > 0 && (
          <div className="flex justify-end items-center gap-3 p-4">
            <span className="text-sm text-muted-foreground">
              {selectedIds.length} selected
            </span>

            <Button
              variant="destructive"
              onClick={() => setConfirmOpen(true)}
              disabled={isSubmitting}
              className="rounded-none"
            >
              Delete
            </Button>
          </div>
        )}

        <Table className="table-fixed w-full">
          <TableHeader className="bg-gray-100">
            <TableRow>
              {NewsCategoryColumns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
              <TableHead>Action</TableHead>

              <TableHead>
                <div className="flex items-center gap-2">
                  <p className="mr-2">Select All</p>
                  <Checkbox
                    ref={(el) => {
                      if (el && 'indeterminate' in el) {
                        el.indeterminate =
                          selectedIds.length > 0 &&
                          selectedIds.length < news.length;
                      }
                    }}
                    checked={
                      news.length > 0 &&
                      news.every((c) => selectedIds.includes(c.id))
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedIds(news.map((c) => c.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={NewsCategoryColumns.length + 1}
                  className="text-center"
                >
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {NewsCategoryColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Skeleton className="h-4 w-4 rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : news?.length > 0 ? (
              news.map((news, index) => (
                <React.Fragment key={news.id}>
                  <TableRow className="border-b transition-all duration-200">
                    {NewsCategoryColumns.map((col) => (
                      <TableCell
                        key={`${col.key}-${index}`}
                        className={col.className}
                      >
                        {col.key === 'number' && index + 1}
                        {col.key === 'title' && news.title}
                      </TableCell>
                    ))}
                    <TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => {
                            setEditingCategory(news); // truyền đúng dòng đang chỉnh
                            setIsUpdateDialogOpen(true);
                          }}
                        >
                          <Icons.Pencil className="h-4 w-4 text-white" />
                        </Button>
                      </TableCell>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(news.id)}
                        onCheckedChange={(checked) => {
                          setSelectedIds((prev) =>
                            checked
                              ? [...prev, news.id]
                              : prev.filter((id) => id !== news.id)
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={NewsCategoryColumns.length + 1}
                  className="text-center"
                >
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {editingCategory && (
        <UpdateNewsCategoryDialog
          news_category={editingCategory}
          open={isUpdateDialogOpen}
          setOpen={(open) => {
            setIsUpdateDialogOpen(open);
            if (!open) setEditingCategory(null); // reset khi đóng dialog
          }}
          onSuccess={() => {
            // optional: gọi refetch hoặc cập nhật local state
            setIsUpdateDialogOpen(false);
            setEditingCategory(null);
          }}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title="Delete selected categories?"
        description="This action cannot be undone. Are you sure you want to delete the selected news categories?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          form.setValue('ids', selectedIds);
          form.handleSubmit(handleDeleteNewsCategory)();
        }}
      />
    </>
  );
};
