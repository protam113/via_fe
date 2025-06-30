'use client';

import { useEffect, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Input,
  Label,
} from '@/components';
import { format } from 'date-fns';
import { format as formatTz, toZonedTime } from 'date-fns-tz';

type DateRange = {
  start_date: string;
  end_date: string;
};

interface Props {
  label?: string;
  value: DateRange;
  onChange: (val: DateRange) => void;
}

export default function DateRangePicker({
  label = 'Date Range',
  value,
  onChange,
}: Props) {
  const [localValue, setLocalValue] = useState<DateRange>(value);

  useEffect(() => {
    setLocalValue(value); // Sync external changes
  }, [value]);

  const handleSelect = (range?: { from?: Date; to?: Date }) => {
    const newVal: DateRange = {
      start_date: range?.from
        ? formatTz(
            toZonedTime(range.from, 'Asia/Ho_Chi_Minh'),
            "yyyy-MM-dd'T'00:00:00xxx"
          )
        : '',
      end_date: range?.to
        ? formatTz(
            toZonedTime(range.to, 'Asia/Ho_Chi_Minh'),
            "yyyy-MM-dd'T'00:00:00xxx"
          )
        : '',
    };
    setLocalValue(newVal);
    onChange(newVal);
  };

  const handleInputChange = (field: keyof DateRange, dateStr: string) => {
    const date = new Date(dateStr);
    const zoned = toZonedTime(date, 'Asia/Ho_Chi_Minh');
    const isoDate = formatTz(zoned, "yyyy-MM-dd'T'00:00:00xxx");

    const newVal: DateRange = {
      ...localValue,
      [field]: isoDate,
    };
    setLocalValue(newVal);
    onChange(newVal);
  };
  return (
    <div className="space-y-2">
      <Label className="text-lg font-semibold">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal rounded-none"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {localValue.start_date
              ? localValue.end_date
                ? `${format(
                    new Date(localValue.start_date),
                    'dd/MM/yyyy'
                  )} - ${format(new Date(localValue.end_date), 'dd/MM/yyyy')}`
                : format(new Date(localValue.start_date), 'dd/MM/yyyy')
              : 'Select date range'}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-4 space-y-4 absolute !left-1/2 !-translate-x-1/2 z-50 rounded-none"
          side="bottom"
          sideOffset={8}
        >
          <Calendar
            mode="range"
            selected={{
              from: localValue.start_date
                ? new Date(localValue.start_date)
                : undefined,
              to: localValue.end_date
                ? new Date(localValue.end_date)
                : undefined,
            }}
            onSelect={handleSelect}
            required={false}
            initialFocus
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={localValue.start_date?.split('T')[0] || ''}
                onChange={(e) =>
                  handleInputChange('start_date', e.target.value)
                }
                className="rounded-none"
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={localValue.end_date?.split('T')[0] || ''}
                onChange={(e) => handleInputChange('end_date', e.target.value)}
                className="rounded-none"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
