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
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar or Topbar (CategoryCard) */}
          <div className="order-1 md:order-none w-full md:basis-1/5 md:min-w-[150px] md:max-w-[200px] flex flex-col justify-between">
            {/* Optional: top content */}
            <div>{/* Sidebar Top Area */}</div>
            <div className="ml-8">
              <CategoryCard />
            </div>
          </div>

          {/* Main content */}
          <div className="order-2 md:order-none w-full md:flex-1">
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
}
