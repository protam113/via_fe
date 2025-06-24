'use client';

import React, { useState } from 'react';
// UI Components
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Skeleton } from '@/components/ui/skeleton';
import NoResultsFound from '@/components/common/design/NoResultsFound';
// Hooks & Utils
import { toast } from 'sonner';
// Types
import { NewsColumns, NewsTableProps } from '@/types';
import { Icons } from '@/assets/icons/icons';

export const NewsTable: React.FC<NewsTableProps> = ({
  news,
  isLoading,
  isError,
  onDelete,
}) => {
  console.log(news);
  return (
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
                      {col.key === 'url' && news.slug}
                      {col.key === 'url_type' && news.slug}
                      {col.key === 'type' && news.slug}
                      {col.key === 'category' && news.category.title}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(news.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Icons.Trash className="h-4 w-4 text-white" />
                    </Button>
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
  );
};
