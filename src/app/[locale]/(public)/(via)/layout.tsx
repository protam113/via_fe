'use client';

import { Container } from '@/components';
import CategoryCard from '@/components/common/cards/category.card';

export default function ViaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex items-start">
      <Container className="flex flex-col md:flex-row gap-4 w-full">
        {/* Sidebar */}
        <aside className="order-1 md:order-none w-full md:basis-1/5 md:min-w-[150px] md:max-w-[200px] flex flex-col justify-end">
          {/* Optional: top content */}
          <div className="ml-8">
            <CategoryCard />
          </div>
        </aside>

        {/* Main content */}
        <section className="order-2 md:order-none w-full md:flex-1">
          {children}
        </section>
      </Container>
    </main>
  );
}
