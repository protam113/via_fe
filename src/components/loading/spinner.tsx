// components/common/ui/spinner.tsx

import { Icons } from '@/assets/icons/icons';

export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center w-full py-8">
      <Icons.Loader2 className={`animate-spin text-gray-500`} size={size} />
    </div>
  );
}
