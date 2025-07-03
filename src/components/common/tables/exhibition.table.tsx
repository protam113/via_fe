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
import { Skeleton } from '@/components/ui/skeleton';

import type { ExhibitionTableProps } from '@/types';
import { ExhibitionColumns } from '@/types';
import { Icons } from '@/assets/icons/icons';
import { truncateText } from '@/utils/helpers/truncate_text.helper';
import ImageViewer from '@/components/features/image_viewer';
import { useState } from 'react';
import UpdateCategoryDialog from '@/components/pages/AUTH/form/category_update.form';
import { formatSmartDate } from '@/utils';
import { ExhibitionStatusLog } from '@/constants';
import { useRouter } from 'next/navigation';
import { useDeleteExhibition } from '@/hooks';
import { ConfirmDialog } from '../design/ConfirmDialog';

export const ExhibitionTable: React.FC<ExhibitionTableProps> = ({
  exhibitions,
  isLoading,
  isError,
  type,
}) => {
  const router = useRouter();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [editingCategory, setEditingCAtegory] = useState<
    (typeof exhibitions)[0] | null
  >(null);

  const { mutate: deletePost } = useDeleteExhibition();

  const handleOpenConfirm = (id: string) => {
    setSelectedPostId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedPostId) return;
    deletePost(selectedPostId, {
      onSuccess: () => {
        setConfirmOpen(false);
        setSelectedPostId(null);
      },
      onError: () => {},
    });
  };

  return (
    <>
      <div className="border max-h-[500px] overflow-auto">
        <Table className="w-full border-separate border-spacing-0">
          <TableHeader className="sticky top-0 z-10 bg-gray-200">
            <TableRow>
              {ExhibitionColumns.map((col) => (
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
                  colSpan={ExhibitionColumns.length + 1}
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
                  {ExhibitionColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : exhibitions && exhibitions.length > 0 ? (
              exhibitions.map((exhibition) => (
                <TableRow key={exhibition.id}>
                  {ExhibitionColumns.map((col) => {
                    return (
                      <TableCell key={col.key} className={col.className}>
                        {col.key === 'id' ? truncateText(exhibition.id, 8) : ''}

                        {col.key === 'thumbnail' ? (
                          <div className="max-w-[384px] w-full h-auto flex items-center justify-center overflow-hidden">
                            <ImageViewer
                              src={exhibition.thumbnail?.url || '/logo.svg'}
                              alt="Sample Image 1"
                              width={384}
                              height={256}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        ) : null}

                        {/* Thay bang title */}
                        {col.key === 'title' ? (
                          <div className="truncate max-w-[160px]">
                            {exhibition.description}
                          </div>
                        ) : null}
                        {col.key === 'start_date'
                          ? formatSmartDate(exhibition.start_date)
                          : ''}

                        {col.key === 'end_date'
                          ? formatSmartDate(exhibition.end_date)
                          : ''}

                        {col.key === 'status' && (
                          <span
                            className={`px-2 py-1 rounded-none text-2xs font-medium
                              ${
                                exhibition.status ===
                                ExhibitionStatusLog.Upcoming
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : exhibition.status ===
                                    ExhibitionStatusLog.Finished
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }
                            `}
                          >
                            {exhibition.status === ExhibitionStatusLog.Upcoming
                              ? 'Upcoming'
                              : exhibition.status ===
                                ExhibitionStatusLog.Finished
                              ? 'Finished'
                              : 'OnGoing'}
                          </span>
                        )}

                        {col.key === 'actions' ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                // redirect hoặc mở dialog tùy type
                                if (type === 'via-art-fair') {
                                  router.push(
                                    `/admin/via-art-fair/${exhibition.id}`
                                  );
                                } else if (type === 'via-atelier') {
                                  router.push(
                                    `/admin/via-atelier/${exhibition.id}`
                                  );
                                } else {
                                  router.push(
                                    `/admin/via-prive/${exhibition.id}`
                                  );
                                }
                              }}
                            >
                              <Icons.Eye className="h-4 w-4" />
                              <span className="sr-only">Detail</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                // redirect hoặc mở dialog tùy type
                                if (type === 'via-art-fair') {
                                  router.push(
                                    `/admin/via-art-fair/edit-via-art-fair/${exhibition.id}`
                                  );
                                } else if (type === 'via-atelier') {
                                  router.push(
                                    `/admin/via-atelier/${exhibition.id}`
                                  );
                                } else {
                                  router.push(
                                    `/admin/via-prive/${exhibition.id}`
                                  );
                                }
                              }}
                            >
                              <Icons.Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="bg-red-main hover:bg-red-main"
                              onClick={() => handleOpenConfirm(exhibition.id)}
                            >
                              <Icons.Trash className="h-4 w-4 text-white" />
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
                  colSpan={ExhibitionColumns.length + 1}
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

      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title="Delete selected exhibition?"
        description="This action cannot be undone. Are you sure you want to delete the selected exhibition?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
