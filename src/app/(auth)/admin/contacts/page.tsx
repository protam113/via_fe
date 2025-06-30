'use client';

import { useState } from 'react';
//UI components
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components';

// Data fetching
import { ContactList } from '@/lib';

// Design components
import { RefreshButton } from '@/components/common/button/refresh.button';
import { CustomPagination } from '@/components/common/design/pagination';
import Heading from '@/components/common/design/Heading';
import AdminContainer from '@/components/wrappers/admin.container';
import { SelectStatus } from '@/components/pages/AUTH/contact/selectStatus';
import { ContactTable } from '@/components/common/tables/contact.table';

export default function ContactManager() {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    limit: pageSize,
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

  return (
    <>
      <AdminContainer>
        <Heading
          name="Contact Management"
          desc="Manage your list of contacts here for quick and easy access."
        />

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
