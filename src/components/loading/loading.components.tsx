// components/Loading.tsx
import { Loader2 } from 'lucide-react';
import { AdminLoadingProps } from '@/types';

const AdminLoading: React.FC<AdminLoadingProps> = ({
  size = 32,
  message = 'Loading...',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-4 ${className}`}
    >
      <Loader2 className="animate-spin text-blue-500" size={size} />
      <span className="text-sm text-gray-500">{message}</span>
    </div>
  );
};

export default AdminLoading;
