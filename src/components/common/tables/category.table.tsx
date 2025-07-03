'use client';

import type React from 'react';
//UI components

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  NoResultsFound,
} from '@/components';

import type { CategoryTableProps } from '@/types';
import { CategoryColumns } from '@/types';
import { Icons } from '@/assets/icons/icons';
import { truncateText } from '@/utils/helpers/truncate_text.helper';
import { Skeleton } from '@/components/ui/skeleton';
import ImageViewer from '@/components/features/image_viewer';
import { useState } from 'react';
import UpdateCategoryDialog from '@/components/pages/AUTH/form/category_update.form';

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  isLoading,
  isError,
}) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [editingCategory, setEditingCAtegory] = useState<
    (typeof categories)[0] | null
  >(null);

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
                    return (
                      <TableCell key={col.key} className={col.className}>
                        {col.key === 'id' ? truncateText(category.id, 8) : ''}

                        {col.key === 'thumbnail' ? (
                          <div>
                            <ImageViewer
                              src={category.thumbnail?.url || '/logo.svg'}
                              alt="Sample Image 1"
                              width={600}
                              height={400}
                              className=""
                            />
                          </div>
                        ) : null}

                        {col.key === 'title' ? category.title : ''}
                        {col.key === 'actions' ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingCAtegory(category);
                                setIsUpdateDialogOpen(true);
                              }}
                            >
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
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editingCategory && (
        <UpdateCategoryDialog
          category={editingCategory}
          open={isUpdateDialogOpen}
          setOpen={(open) => {
            setIsUpdateDialogOpen(open);
            if (!open) setEditingCAtegory(null);
          }}
          onSuccess={() => {
            setIsUpdateDialogOpen(false);
            setEditingCAtegory(null);
          }}
        />
      )}
    </>
  );
};
