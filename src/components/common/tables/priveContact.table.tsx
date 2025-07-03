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
  NoResultsFound,
} from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
// Hooks & Utils
import { toast } from 'sonner';
// Types
import type { ApprovedContact } from '@/types';
import { ContactColumns } from '@/types';
import { ArrowIcons, Icons } from '@/assets/icons/icons';
import { useUpdateContact } from '@/hooks';

// Zod & React Hook Form
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactError, ContactWarning, StatusLog } from '@/constants';
import { contactFormSchema } from '@/utils';
import { ConfirmDialog } from '../design/ConfirmDialog';
import { ContactList } from '@/lib';
import { CustomPagination } from '../design/pagination';

export const PriveContactTable = ({
  exhibition_id,
}: {
  exhibition_id: string;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'APPROVE' | 'REJECT' | null;
    open: boolean;
  }>({ type: null, open: false });

  const params = {
    exhibition_id: exhibition_id,
  };

  const { contacts, isLoading, isError, pagination } = ContactList(
    currentPage,
    params,
    refreshKey
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      status: '',
      ids: [],
    },
  });

  const { mutate: updateContactList } = useUpdateContact();

  const handleUpdateContact = (values: z.infer<typeof contactFormSchema>) => {
    const selectedContacts = contacts.filter((c) => values.ids.includes(c.id));

    const hasPending = selectedContacts.some(
      (c) => c.status === StatusLog.PENDING
    );

    if (!hasPending) {
      toast.warning(ContactWarning.WARNING_UPDATE_CONTACT);
      return;
    }

    setIsSubmitting(true);

    const newsData: ApprovedContact = {
      status: values.status,
      ids: values.ids,
    };

    updateContactList(newsData, {
      onSuccess: () => {
        setSelectedIds([]);
        form.reset();
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        form.setError('root', {
          type: 'manual',
          message: error.message || ContactError.FAILED_UPDATE,
        });
        setIsSubmitting(false);
      },
    });
  };

  const toggleRowExpansion = (contactId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [contactId]: !prev[contactId],
    }));
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
        <p className="text-red-main">Oops! Failed to load news.</p>
      </AdminContainer>
    );
  }

  return (
    <>
      <div className=" border">
        {selectedIds.length > 0 && (
          <div className="flex justify-end items-center gap-3 p-4">
            <span className="text-sm text-muted-foreground">
              {selectedIds.length} selected
            </span>

            <Button
              variant="destructive"
              onClick={() => setConfirmAction({ type: 'REJECT', open: true })}
              disabled={isSubmitting}
              className="rounded-none"
            >
              Reject
            </Button>

            <Button
              variant="default"
              onClick={() => setConfirmAction({ type: 'APPROVE', open: true })}
              disabled={isSubmitting}
              className="rounded-none"
            >
              Approve
            </Button>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-300">
              {ContactColumns.map((col) => (
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
                          selectedIds.length < contacts.length;
                      }
                    }}
                    checked={
                      contacts.length > 0 &&
                      contacts.every((c) => selectedIds.includes(c.id))
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedIds(contacts.map((c) => c.id));
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
                  colSpan={ContactColumns.length + 1}
                  className="text-center"
                >
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {ContactColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Skeleton className="h-4 w-4 rounded" />
                  </TableCell>
                </TableRow>
              ))
            ) : contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <React.Fragment key={contact.id}>
                  <TableRow className="border-b transition-all duration-200">
                    {ContactColumns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        {col.key === 'number' && index + 1}
                        {col.key === 'detail' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleRowExpansion(contact.id)}
                            className="h-8 w-8"
                          >
                            {expandedRows[contact.id] ? (
                              <ArrowIcons.ArrowLeft className="h-4 w-4" />
                            ) : (
                              <ArrowIcons.ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        {col.key === 'name' && contact.name}
                        {col.key === 'email' && contact.email}
                        {col.key === 'phone_number' && contact.phone_number}
                        {col.key === 'status' && (
                          <span
                            className={`px-2 py-1 rounded-none text-2xs font-medium
      ${
        contact.status === StatusLog.PENDING
          ? 'bg-yellow-100 text-yellow-800'
          : contact.status === StatusLog.APPROVED
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }
    `}
                          >
                            {contact.status === StatusLog.PENDING
                              ? 'Pending'
                              : contact.status === StatusLog.APPROVED
                              ? 'Approved'
                              : 'Rejected'}
                          </span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      {contact.status === StatusLog.PENDING ? (
                        <Checkbox
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-gray-600 text-white"
                          checked={selectedIds.includes(contact.id)}
                          onCheckedChange={(checked) => {
                            setSelectedIds((prev) =>
                              checked
                                ? [...prev, contact.id]
                                : prev.filter((id) => id !== contact.id)
                            );
                          }}
                        />
                      ) : null}
                    </TableCell>
                  </TableRow>

                  {expandedRows[contact.id] && (
                    <TableRow className="bg-muted/50">
                      <TableCell
                        colSpan={ContactColumns.length + 1}
                        className="p-0"
                      >
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">
                                Contact Details
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium">Name:</span>{' '}
                                  {contact.name}
                                </div>
                                <div>
                                  <span className="font-medium">Email:</span>{' '}
                                  {contact.email}
                                </div>
                                <div>
                                  <span className="font-medium">Tel:</span>{' '}
                                  {contact.phone_number}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div>
                                <span className="font-medium">Location:</span>{' '}
                                {contact.location}
                              </div>
                              <h4 className="text-sm font-medium mb-2">
                                Message
                              </h4>
                              <div className="p-3 bg-muted rounded-md text-sm">
                                {contact.message || (
                                  <span className="text-muted-foreground italic">
                                    No message provided
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={ContactColumns.length + 1}
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

      <ConfirmDialog
        open={confirmAction.open}
        setOpen={(open) => setConfirmAction((prev) => ({ ...prev, open }))}
        title={
          confirmAction.type === 'APPROVE'
            ? 'Approve selected contacts?'
            : 'Reject selected contacts?'
        }
        description="This action cannot be undone. Are you sure?"
        confirmText={confirmAction.type === 'APPROVE' ? 'Approve' : 'Reject'}
        onConfirm={() => {
          form.setValue(
            'status',
            confirmAction.type === 'APPROVE'
              ? StatusLog.APPROVED
              : StatusLog.REJECTED
          );
          form.setValue('ids', selectedIds);
          form.handleSubmit(handleUpdateContact)();
        }}
      />
    </>
  );
};
