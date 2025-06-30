// components/Loading.tsx
import { Loader2 } from 'lucide-react';
import type { AdminLoadingProps } from '@/types';
import Container from '../wrappers/container';

export const LoadingSpin: React.FC<AdminLoadingProps> = ({
  size = 32,
  message = 'Loading...',
  className = '',
}) => {
  return (
    <Container
      className={`min-h-screen flex flex-col items-center justify-center gap-2 p-4 ${className}`}
    >
      <Loader2 className="animate-spin text-blue-500" size={size} />
      <span className="text-sm text-gray-500">{message}</span>
    </Container>
  );
};
