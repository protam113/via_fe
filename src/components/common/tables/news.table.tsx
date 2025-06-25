'use client';

import React, { useState } from 'react';
// UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Checkbox,
  Button,
} from '@/components';

import { Skeleton } from '@/components/ui/skeleton';
import NoResultsFound from '@/components/common/design/NoResultsFound';
// Types
import { NewsColumns, NewsTableProps } from '@/types';
import { Icons } from '@/assets/icons/icons';

import { useDeleteNews } from '@/hooks';
import { ConfirmDialog } from '../design/ConfirmDialog';
import UpdateNewsDialog from '@/components/pages/AUTH/news/update_news';
import Link from 'next/link';

export const NewsTable: React.FC<NewsTableProps> = ({
  news,
  isLoading,
  isError,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<(typeof news)[0] | null>(null);

  const { mutate: deleteNews } = useDeleteNews();

  const handleOpenConfirm = (id: string) => {
    setSelectedNewsId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedNewsId) return;
    deleteNews(selectedNewsId, {
      onSuccess: () => {
        setConfirmOpen(false);
        setSelectedNewsId(null);
      },
      onError: () => {},
    });
  };
  return (
    <>
      <div className="border">
        <Table className="table-auto">
          <TableHeader className="bg-gray-200">
            <TableRow>
              {NewsColumns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={NewsColumns.length + 1}
                  className="text-center"
                >
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {NewsColumns.map((col) => (
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
                    {NewsColumns.map((col) => (
                      <TableCell
                        key={`${col.key}-${index}`}
                        className={col.className}
                      >
                        {col.key === 'number' && index + 1}
                        {col.key === 'title' && news.title}
                        {col.key === 'url' && (
                          <Link
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="text-blue-600 underline hover:text-blue-800">
                              {news.url}
                            </span>
                          </Link>
                        )}
                        {col.key === 'url_type' && news.url_type}
                        {col.key === 'type' && news.type}
                        {col.key === 'category' && news.category.title}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => {
                            setEditingNews(news);
                            setIsUpdateDialogOpen(true);
                          }}
                        >
                          <Icons.Pencil className="h-4 w-4 text-white" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-red-main hover:bg-red-main"
                          onClick={() => handleOpenConfirm(news.id)}
                        >
                          <Icons.Trash className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={NewsColumns.length + 1}
                  className="text-center"
                >
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editingNews && (
        <UpdateNewsDialog
          news={editingNews}
          open={isUpdateDialogOpen}
          setOpen={(open) => {
            setIsUpdateDialogOpen(open);
            if (!open) setEditingNews(null);
          }}
          onSuccess={() => {
            setIsUpdateDialogOpen(false);
            setEditingNews(null);
          }}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title="Delete selected news?"
        description="This action cannot be undone. Are you sure you want to delete the selected news?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
