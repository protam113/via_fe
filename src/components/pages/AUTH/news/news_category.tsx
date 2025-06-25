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
} from '@/components';

//Components
import Heading from '@/components/common/design/Heading';

import AdminContainer from '@/components/wrappers/admin.container';
import { NewsCategoryTable } from '@/components/common/tables/news_category.table';
import { NewsCategoryList } from '@/lib';

import CreateNewsCategoryDialog from './create_news_category';

export default function NewsCategory() {
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
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
