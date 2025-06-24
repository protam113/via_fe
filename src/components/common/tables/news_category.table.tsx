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
import { NewsCategoryColumns } from '@/types';
import { Icons } from '@/assets/icons/icons';
import { NewsCategoryTableProps } from '@/types/news/news_category.prob';

export const NewsCategoryTable: React.FC<NewsCategoryTableProps> = ({
  news,
  isLoading,
  isError,
  onDelete,
}) => {
  console.log(news);
  return (
    <div className=" border">
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow>
            {NewsCategoryColumns.map((col) => (
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
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(news.id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Icons.Pencil className="h-4 w-4 text-white" />
                    </Button>
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
  );
};
