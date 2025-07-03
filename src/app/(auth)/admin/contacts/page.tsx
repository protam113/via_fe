'use client';

import { useState } from 'react';
//UI components
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Heading,
  AdminContainer,
  Input,
} from '@/components';

// Data fetching
import { ContactList } from '@/lib';

// Design components
import { RefreshButton } from '@/components/common/button/refresh.button';
import { CustomPagination } from '@/components/common/design/pagination';
import { SelectStatus } from '@/components/pages/AUTH/contact/selectStatus';
import { ContactTable } from '@/components/common/tables/contact.table';
import { Icons } from '@/assets/icons/icons';

export default function ContactManager() {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    page_size: pageSize,
    name: actualSearchQuery.name || undefined,
    phone_number: actualSearchQuery.phone || undefined,
    email: actualSearchQuery.email || undefined,
  };

  const { contacts, isLoading, isError, pagination } = ContactList(
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

  return (
    <>
      <AdminContainer>
        <Heading
          name="Contact Management"
          desc="Manage your list of contacts here for quick and easy access."
        />

        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Status:</span>

              <SelectStatus
                selectedStatus={selectedStatus}
                onStatusChange={(value) => setSelectedStatus(value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <ContactTable
            contacts={contacts}
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
