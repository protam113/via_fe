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
  AdminContainer,
  Input,
  RefreshButton,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  NoResultsFound,
} from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
// Types
import type { DeleterRegisterData } from '@/types';
import { RegisterColumns } from '@/types';

import { Icons } from '@/assets/icons/icons';
import { useDeleteRegister } from '@/hooks';

// Zod & React Hook Form
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteRegisterFormSchema } from '@/utils';
import { ConfirmDialog } from '../design/ConfirmDialog';
import { RegisterList } from '@/lib';
import { CustomPagination } from '../design/pagination';

export const AtelierRegisterTable = () => {
  const { mutate: updateDeleteRegister } = useDeleteRegister();

  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Search name
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [actualSearchQuery, setActualSearchQuery] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const params = {
    name: actualSearchQuery.name || undefined,
    phone_number: actualSearchQuery.phone || undefined,
    email: actualSearchQuery.email || undefined,
    page_size: pageSize,
  };

  const { registers, isLoading, isError, pagination } = RegisterList(
    currentPage,
    params,
    refreshKey
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const form = useForm<z.infer<typeof deleteRegisterFormSchema>>({
    resolver: zodResolver(deleteRegisterFormSchema),
    defaultValues: {
      ids: [],
    },
  });

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Handle search on Enter key press
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setActualSearchQuery({
        name: searchQuery.name.trim(),
        phone: searchQuery.phone.trim(),
        email: searchQuery.email.trim(),
      });
      setCurrentPage(1);
    }
  };

  // Clear search function
  const handleClearSearch = () => {
    setSearchQuery({ name: '', phone: '', email: '' });
    setActualSearchQuery({ name: '', phone: '', email: '' });
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteRegierter = (
    values: z.infer<typeof deleteRegisterFormSchema>
  ) => {
    setIsSubmitting(true);

    const newsData: DeleterRegisterData = {
      ids: values.ids,
    };

    updateDeleteRegister(newsData, {
      onSuccess: () => {
        setSelectedIds([]);
        form.reset();
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        form.setError('root', {
          type: 'manual',
          message:
            error.message || 'NewsCategoryError.FAILED_DELETE_NEWS_CATEGORY',
        });
        setIsSubmitting(false);
      },
    });
  };

  if (isLoading) {
    return (
      <AdminContainer>
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-700">
          <Icons.Loader2 className="animate-spin h-8 w-8 mb-4 text-gray-500" />
          <p className="text-lg font-medium">
            Loading the latest news for you...
          </p>
          <p className="text-sm text-gray-500 mt-2">Please wait a moment </p>
        </div>
      </AdminContainer>
    );
  }

  if (isError) {
    return (
      <AdminContainer>
        <NoResultsFound />
      </AdminContainer>
    );
  }

  return (
    <>
      <div className="gap-4 space-x-6 ">
        {/* Filters */}
        <div className="flex flex-col md:flex-row  mb-6 gap-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['name', 'phone', 'email'].map((field) => (
              <div key={field} className="relative w-full">
                <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={`Search ${field} (Enter)`}
                  className="pl-10 pr-8"
                  value={searchQuery[field as keyof typeof searchQuery]}
                  onChange={(e) =>
                    setSearchQuery((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  onKeyDown={handleSearchKeyDown}
                />
                {searchQuery[field as keyof typeof searchQuery] && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

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

          <Table>
            <TableHeader>
              <TableRow className="bg-gray-300">
                {RegisterColumns.map((col) => (
                  <TableHead key={col.key} className={col.className}>
                    {col.label}
                  </TableHead>
                ))}
                <TableHead>
                  <div className="flex items-center gap-2">
                    <p className="mr-2">Select All</p>
                    <Checkbox
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-gray-600 text-white"
                      ref={(el) => {
                        if (el && 'indeterminate' in el) {
                          el.indeterminate =
                            selectedIds.length > 0 &&
                            selectedIds.length < registers.length;
                        }
                      }}
                      checked={
                        registers.length > 0 &&
                        registers.every((c) => selectedIds.includes(c.id))
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds(registers.map((c) => c.id));
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
                    colSpan={RegisterColumns.length + 1}
                    className="text-center"
                  >
                    <NoResultsFound />
                  </TableCell>
                </TableRow>
              ) : isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {RegisterColumns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Skeleton className="h-4 w-4 rounded" />
                    </TableCell>
                  </TableRow>
                ))
              ) : registers.length > 0 ? (
                registers.map((contact, index) => (
                  <React.Fragment key={contact.id}>
                    <TableRow className="border-b transition-all duration-200">
                      {RegisterColumns.map((col) => (
                        <TableCell key={col.key} className={col.className}>
                          {col.key === 'number' && index + 1}

                          {col.key === 'name' && contact.name}
                          {col.key === 'email' && contact.email}
                          {col.key === 'phone_number' && contact.phone_number}
                        </TableCell>
                      ))}
                      <TableCell>
                        {' '}
                        <Checkbox
                          checked={selectedIds.includes(contact.id)}
                          onCheckedChange={(checked) => {
                            setSelectedIds((prev) =>
                              checked
                                ? [...prev, contact.id]
                                : prev.filter((id) => id !== contact.id)
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
                    colSpan={RegisterColumns.length + 1}
                    className="text-center"
                  >
                    <NoResultsFound />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <CustomPagination
            currentPage={currentPage}
            totalPage={pagination.total_page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title="Delete selected register?"
        description="This action cannot be undone. Are you sure you want to delete the selected register list?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          form.setValue('ids', selectedIds);
          form.handleSubmit(handleDeleteRegierter)();
        }}
      />
    </>
  );
};
