'use client';

import { Container } from '@/components';
import CategoryCard from '@/components/common/cards/category.card';
import SEO from '@/components/core/SEO';

const Page = () => {
  return (
    <>
      <SEO
        title="VIA Atelier"
        description="VIA brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main className="h-full min-h-screen flex items-stretch">
        <Container className="flex flex-col md:flex-row gap-4 w-full">
          <aside className="order-1 md:order-none w-full md:basis-1/5 md:min-w-[150px] md:max-w-[200px] flex flex-col justify-end">
            <div className="ml-8">
              <CategoryCard />
            </div>
          </aside>
          <section className="order-2 md:order-none w-full md:flex-1 flex flex-col">
            {/* Detail */}
          </section>
        </Container>
      </main>
    </>
  );
};

export default Page;
