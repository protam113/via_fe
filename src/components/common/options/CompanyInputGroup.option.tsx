'use client';

import { Input, Button, Label } from '@/components';
import type { Companies } from '@/types';
import { useFieldArray } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { Icons } from '@/assets/icons/icons';

export default function CompanyManager({ form }: { form: UseFormReturn<any> }) {
  const [newCompany, setNewCompany] = useState<Companies>({
    name: '',
    url: '',
    image: '',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'companies',
  });

  const companyFields = fields as (Companies & { id: string })[];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCompany();
    }
  };

  const addCompany = () => {
    if (!newCompany.name.trim()) return;
    append({ ...newCompany });
    setNewCompany({ name: '', url: '', image: '' });
  };

  return (
    <>
      <Label className="text-lg font-semibold">Companies</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Company name"
          value={newCompany.name}
          onChange={(e) =>
            setNewCompany((prev) => ({ ...prev, name: e.target.value }))
          }
          onKeyPress={handleKeyPress}
          className="rounded-none bg-gray-200"
        />
        <Input
          placeholder="Company URL"
          value={newCompany.url}
          onChange={(e) =>
            setNewCompany((prev) => ({ ...prev, url: e.target.value }))
          }
          onKeyPress={handleKeyPress}
          className="rounded-none bg-gray-200"
        />
        <div className="flex gap-2">
          <Input
            placeholder="Image URL"
            value={newCompany.image}
            onChange={(e) =>
              setNewCompany((prev) => ({ ...prev, image: e.target.value }))
            }
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-none bg-gray-200"
          />
          <Button
            type="button"
            onClick={addCompany}
            size="icon"
            className="rounded-none"
          >
            <Icons.Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {companyFields.length > 0 && (
        <div className="pt-6">
          <Label className="text-sm font-semibold text-muted-foreground mb-2 block">
            Added Companies
          </Label>

          {companyFields.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No companies added yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {companyFields.map((company, index) =>
                company.name.trim() ? (
                  <div
                    key={company.id}
                    className="relative rounded-xl overflow-hidden border bg-white shadow-sm"
                  >
                    {/* Hình ảnh công ty */}
                    <div className="w-full h-[80px] relative flex justify-center items-center overflow-hidden rounded-xl">
                      <img
                        src={company.image}
                        alt={company.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Tên + nút xoá */}
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm font-medium truncate">
                        {company.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0 rounded-none hover:bg-gray-100"
                        onClick={() => remove(index)}
                      >
                        <Icons.X className="h-3 w-3 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
