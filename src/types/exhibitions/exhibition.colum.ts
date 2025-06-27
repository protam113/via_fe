export const ExhibitionColumns = [
  {
    key: 'id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground w-[60px]',
  },
  {
    key: 'thumbnail',
    label: 'Thumbnail',
    className: 'font-medium w-[160px]', // tăng lên nếu cần
  },
  { key: 'title', label: 'Title', className: 'font-medium w-[120px]' },
  {
    key: 'start_date',
    label: 'Start',
    className: 'text-right w-[80px] text-xs text-muted-foreground',
  },
  {
    key: 'end_date',
    label: 'End',
    className: 'text-right w-[80px] text-xs text-muted-foreground',
  },
  {
    key: 'status',
    label: 'Status',
    className: 'text-right w-[80px] text-xs text-muted-foreground',
  },
  {
    key: 'actions',
    label: '',
    className: 'text-right w-[80px] text-xs text-muted-foreground',
  },
];
