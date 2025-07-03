'use client';

import React, { useState } from 'react';

// UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  AdminContainer,
  Heading,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  AdminLoading,
} from '@/components';
import { CustomPagination } from '@/components/common/design/pagination';
import { ConfirmDialog } from '@/components/common/design/ConfirmDialog';
import SearchFilterBar from '@/components/pages/AUTH/user/search_filter.user';
import { Icons } from '@/assets/icons/icons';

// Hooks data
import { UserList, RoleList } from '@/lib';
import { useDeleteUser } from '@/hooks';

const Page = () => {
  // State for pagination, filtering, and data refresh
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [actualSearchQuery, setActualSearchQuery] = useState('');

  // State for dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectManager, setSelectManager] = useState<string>();

  //   Roles Data
  const {
    roles,
    isLoading: isRoleLoading,
    isError: isRoleError,
  } = RoleList(1, { page_size: 10 }, refreshKey);

  //   Users Data
  const { users, isLoading, isError, pagination } = UserList(
    currentPage,
    {
      page_size: 10,
      role: selectedRole,
      name: actualSearchQuery || undefined,
    },
    refreshKey
  );

  const { mutate: deleteManager } = useDeleteUser();

  const handleDeleteClick = (id: string) => {
    setSelectManager(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectManager) {
      deleteManager(selectManager);
      setSelectManager(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
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
        {/* Stats Overview */}
        <Heading
          name="User Management"
          desc="Manage all users in the system: view user list, update details, assign roles. Stay in control of your user base efficiently and securely."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Clients */}
          <Card className="rounded-none">
            <CardContent className="p-4">
              <div className="justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {pagination?.total || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Members */}
          <Card className="rounded-none">
            <CardContent className="p-4">
              <div className="justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pages</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {pagination?.total_page || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <Card className="mb-6 rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Users</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Bar - Fixed with proper spacing */}
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchEnter={handleSearchKeyDown}
              onClearSearch={handleClearSearch}
              selectedRole={selectedRole}
              onRoleChange={(value) => {
                setSelectedRole(value);
                setCurrentPage(1); // Reset về trang 1 khi filter
              }}
              roles={roles}
              isRoleLoading={isRoleLoading}
              isRoleError={isRoleError}
              onRefresh={handleRefresh}
            />

            {/* Table Section - Added min-height to prevent jumping */}
            <div className="border overflow-hidden min-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-64">
                        <div className="flex justify-center items-center h-full">
                          <AdminLoading />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-gray-500"
                      >
                        <Icons.AlertCircle className="h-5 w-5 inline-block text-red-500" />
                        Error loading user data.
                      </TableCell>
                    </TableRow>
                  ) : users && users.length > 0 ? (
                    users.map((employee) => {
                      const isProtectedRole = ['admin'].includes(
                        employee.role?.toLowerCase()
                      );

                      return (
                        <TableRow
                          key={employee.id}
                          className="hover:bg-gray-50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                                {employee.name?.substring(0, 2) ||
                                  employee.username?.substring(0, 2) ||
                                  'U'}
                              </div>
                              <div>
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-sm text-gray-500">
                                  {employee.username}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-500 font-mono">
                              {employee.id?.substring(0, 8)}...
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {employee.role?.toLowerCase() === 'manager' && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="bg-red-main hover:bg-red-main"
                                  onClick={() => handleDeleteClick(employee.id)}
                                >
                                  <Icons.Trash className="h-4 w-4 text-white" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-gray-500 py-8"
                      >
                        No user found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {users?.length || 0} user of {pagination?.page || 0}{' '}
                pages
              </p>
              <CustomPagination
                currentPage={currentPage}
                totalPage={pagination?.total_page || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </CardContent>
        </Card>
      </AdminContainer>

      <ConfirmDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the manager."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Page;
