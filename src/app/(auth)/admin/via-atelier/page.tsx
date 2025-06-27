'use client';

import type React from 'react';
import { useState } from 'react';

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
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ENV, ExhibitionsList } from '@/lib';
import { ExhibitionTable } from '@/components/common/tables/exhibition.table';
import { PushButton } from '@/components';

export default function ExhibitionManager() {
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [actualSearchQuery, setActualSearchQuery] = useState('');

  const params = {
    language: selectedLanguage,
    category_id: ENV.VIA_ATELIER_ID,
    title: actualSearchQuery || undefined,
    limit: pageSize,
  };

  const { exhibitions, isLoading, isError, pagination } = ExhibitionsList(
    currentPage,
    params,
    refreshKey
  );
  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // State for the form
  const handleTypeChange = (value: string) => {
    setSelectedLanguage(value);
    setRefreshKey((prev) => prev + 1);
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
        <div className="flex items-center justify-between mb-4">
          <Heading name="Via Atelier Page" desc="Manage your categories here" />

          <PushButton
            href="/admin/via-atelier/create-via-atelier"
            label="Create VIA Art Fair"
          />
        </div>

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
              <span className="text-16 font-semibold">Language:</span>
              <Select
                onValueChange={handleTypeChange}
                defaultValue={String(selectedLanguage)}
              >
                <SelectTrigger className="w-[120px] rounded-none">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="en" className="rounded-none">
                    English
                  </SelectItem>
                  <SelectItem value="vn" className="rounded-none">
                    Vietnamese
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="rounded-md min-w-0">
          <ExhibitionTable
            exhibitions={exhibitions}
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
