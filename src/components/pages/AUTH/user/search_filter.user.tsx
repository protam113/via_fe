'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  PushButton,
  RefreshButton,
} from '@/components';
import { ROUTES } from '@/lib';
import { AdminUserProps } from '@/types';
import { Icons } from '@/assets/icons/icons';

const SearchFilterBar: React.FC<AdminUserProps> = ({
  searchQuery,
  onSearchChange,
  onSearchEnter,
  onClearSearch,
  selectedRole,
  onRoleChange,
  roles,
  isRoleLoading,
  isRoleError,
  onRefresh,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 relative z-10">
      {/* Search */}
      <div className="relative w-full md:w-64">
        <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search name (Press Enter)"
          className="pl-10 pr-8 rounded-none"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={onSearchEnter}
        />
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter & Refresh */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <RefreshButton onClick={onRefresh} />

        <div className="relative">
          <Select
            onValueChange={(value) =>
              onRoleChange(value === 'all' ? undefined : value)
            }
            value={selectedRole || 'all'}
          >
            <SelectTrigger className="w-40 relative z-20 rounded-none">
              <div className="flex items-center gap-2 rounded-none">
                <Icons.Filter className="h-4 w-4" />
                <SelectValue placeholder="All Roles" />
              </div>
            </SelectTrigger>

            <SelectContent
              className="z-50 min-w-[160px] rounded-none"
              position="popper"
              side="bottom"
              align="start"
              sideOffset={4}
            >
              <SelectItem value="all" className="rounded-none">
                All Roles
              </SelectItem>

              {isRoleLoading && (
                <div className="px-4 py-2 text-sm">Loading...</div>
              )}
              {isRoleError && (
                <div className="px-4 py-2 text-sm text-red-500">
                  Failed to load roles
                </div>
              )}

              {roles?.map((role) => (
                <SelectItem
                  key={role.id}
                  value={role.id}
                  className="rounded-none"
                >
                  {role.title.charAt(0).toUpperCase() + role.title.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <PushButton
          label="Create Manager"
          href={ROUTES.ADMIN_USERS.CREATE_USER}
        />
      </div>
    </div>
  );
};

export default SearchFilterBar;
