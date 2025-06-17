'use client';

import { Container } from '@/components';
import CategoryCard from '@/components/common/cards/category.card';

export default function ViaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Container>
        <div className="flex gap-4">
          <div className="basis-1/8 min-w-[150px] max-w-[200px] flex flex-col justify-between h-[80vh]">
            <div>{/* Có thể thêm phần trên của sidebar ở đây, nếu cần */}</div>
            <CategoryCard /> {/* Nằm dưới cùng */}
          </div>
          <div className="basis-7/8 flex-1">{children}</div>
        </div>
      </Container>
    </main>
  );
}
