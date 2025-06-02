import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

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
