'use client';

import type React from 'react';
import { useState } from 'react';

//Components
import { RefreshButton } from '@/components/button/RefreshButton';
import { CustomPagination } from '@/components/design/pagination';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

import { CategoryList } from '@/lib/responses/categoriesLib';
import Heading from '@/components/design/Heading';
import AdminContainer from '@/components/container/admin.container';
import { CategoryTable } from '@/components/tables/CategoryTable';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CategoryManager() {
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedType, setSelectedType] = useState<string>();
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [actualSearchQuery, setActualSearchQuery] = useState('');

  const params = {
    ...(selectedType !== 'all' && { type: selectedType }),
    title: actualSearchQuery || undefined,
    limit: pageSize,
  };

  const { categories, isLoading, isError, pagination } = CategoryList(
    currentPage,
    params,
    refreshKey
  );
  console.log(categories);
  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  // State for the form
  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setRefreshKey((prev) => prev + 1);
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

  // Handle search on Enter key press
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setActualSearchQuery(searchQuery.trim());
      setCurrentPage(1); // Reset to first page when searching
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
        <Heading name="Categories Page" desc="Manage your categories here" />

        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
            <RefreshButton onClick={handleRefresh} />
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Show:</span>
              <Select
                onValueChange={handlePageSizeChange}
                defaultValue={String(pageSize)}
              >
                <SelectTrigger className="w-[80px] rounded-none">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="5" className="rounded-none">
                    5
                  </SelectItem>
                  <SelectItem value="10" className="rounded-none">
                    10
                  </SelectItem>
                  <SelectItem value="20" className="rounded-none">
                    20
                  </SelectItem>
                  <SelectItem value="50" className="rounded-none">
                    50
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Language :</span>
              <Select onValueChange={handleTypeChange}>
                <SelectTrigger className="w-[120px] rounded-none ">
                  <SelectValue placeholder="all" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="all" className="rounded-none">
                    All
                  </SelectItem>
                  <SelectItem value="en" className="rounded-none">
                    English
                  </SelectItem>
                  <SelectItem value="vi" className="rounded-none">
                    Vietnamese
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="rounded-md min-w-0">
          <CategoryTable
            categories={categories}
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
