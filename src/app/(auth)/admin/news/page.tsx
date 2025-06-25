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
} from '@/components/ui/select';
import Heading from '@/components/common/design/Heading';
import AdminContainer from '@/components/wrappers/admin.container';
import { NewsList } from '@/lib';
import { NewsTable } from '@/components/common/tables/news.table';
import NewsCategory from '@/components/pages/AUTH/news/news_category';
import NewsCategoryCard from '@/components/pages/AUTH/news/news_category_card';
import CreateNewsDialog from '@/components/pages/AUTH/news/create_news';
import { Button } from '@/components/ui/button';
import { Icons } from '@/assets/icons/icons';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const params = {
    category_id: selectedCategory ?? undefined,
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
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
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
