import type { ContainerProps } from '@/types';
import { cn } from '@/utils';

export function AdminContainer({ children, className }: ContainerProps) {
  return (
    <main
      className={cn(
        'w-full max-w-[1440px] mx-auto px-4 py-6',
        'overflow-x-hidden',
        'relative',
        'flex flex-col',
        className
      )}
    >
      {children}
    </main>
  );
}
