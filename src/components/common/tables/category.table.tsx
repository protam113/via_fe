'use client';

import type React from 'react';
//UI components
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

import { CategoryTableProps } from '@/types/props.type';
import { CategoryColumns } from '@/types/colums.type';
import CustomImage from '../design/image.component';
import { Icons } from '@/assets/icons/icons';

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  isLoading,
  isError,
}) => {
  return (
    <>
      <div className="border">
        <Table>
          <TableHeader>
            <TableRow>
              {CategoryColumns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={CategoryColumns.length + 1}
                  className="text-center"
                >
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-4 rounded" />
                  </TableCell>
                  {CategoryColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.id}>
                  {CategoryColumns.map((col) => {
                    if (col.key === 'thumbnail') {
                      console.log('thumbnail :', category.thumbnail?.url);
                    }
                    console.log('category :', category);

                    return (
                      <TableCell key={col.key} className={col.className}>
                        {col.key === 'id'
                          ? category.id.substring(0, 8) + '...'
                          : ''}
                        {col.key === 'thumbnail' ? (
                          <div>
                            <CustomImage
                              src={category.thumbnail?.url || '/logo.svg'}
                              alt={category.title}
                              width={128}
                              height={128}
                            />
                          </div>
                        ) : null}

                        {col.key === 'title' ? category.title : ''}
                        {col.key === 'description' ? category.description : ''}
                        {col.key === 'actions' ? (
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Icons.Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        ) : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={CategoryColumns.length + 1}
                  className="text-center text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
