import { ContainerProps } from '@/types';

export default function AdminContainer({
  children,
  className,
}: ContainerProps) {
  return (
    <main className={`w-full mx-auto container py-4  ${className}`}>
      {children}
    </main>
  );
}
