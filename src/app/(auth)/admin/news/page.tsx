'use client';

import type React from 'react';
import { useState } from 'react';
//UI components

//Components
import { RefreshButton } from '@/components/common/button/refresh.button';
import { CustomPagination } from '@/components/common/design/pagination';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Heading,
  AdminContainer,
  Button,
  Input,
} from '@/components';

import { NewsList } from '@/lib';
import { NewsTable } from '@/components/common/tables/news.table';

import { Icons } from '@/assets/icons/icons';

import NewsCategory from '@/components/pages/AUTH/news/news_category';
import NewsCategoryCard from '@/components/pages/AUTH/news/news_category_card';
import CreateNewsDialog from '@/components/pages/AUTH/news/create_news';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [actualSearchQuery, setActualSearchQuery] = useState('');

  const params = {
    category_slug: selectedCategory ?? undefined,
    title: actualSearchQuery || undefined,
    limit: pageSize,
  };

  const { news, isLoading, isError, pagination } = NewsList(
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

  // Handle search on Enter key press
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setActualSearchQuery(searchQuery.trim());
      setCurrentPage(1);
    }
  };

  // Clear search function
  const handleClearSearch = () => {
    setSearchQuery('');
    setActualSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <>
      <AdminContainer>
        <NewsCategory />
        <div className="flex items-center justify-between mb-4">
          <Heading
            name="News Management"
            desc="Create, update, and organize news categories easily for better content management"
          />
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="rounded-none"
          >
            <Icons.Plus className="mr-2 h-4 w-4" />
            Create News
          </Button>
        </div>
        <NewsCategoryCard onCategorySelect={setSelectedCategory} />
        <div className="md:flex col flex-col-2 md:flex-row  items-center mb-6">
          <div className="relative w-full md:w-64">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search title (Press Enter)"
              className="pl-10 pr-8 rounded-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            {/* Clear search button */}
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
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
        <div className="table-container" style={{ width: '100%', minWidth: 0 }}>
          <NewsTable news={news} isLoading={isLoading} isError={isError} />
        </div>

        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </AdminContainer>

      <CreateNewsDialog
        open={isCreateDialogOpen}
        setOpen={setIsCreateDialogOpen}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />
    </>
  );
}
