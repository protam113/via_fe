import { AdminContainer, PushButton, Heading } from '@/components';
import { EventForm } from '@/components/pages/AUTH/form/exhibiton_create.form';
import { ENV } from '@/lib';
import React from 'react';

const Page = () => {
  const categoryId = ENV.VIA_ART_FAIR_ID;
  return (
    <AdminContainer>
      <div>
        <PushButton href="/admin/via-art-fair" label="Back" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <Heading name="Via art fair Page" desc="Manage your categories here" />
      </div>
      <section>
        <EventForm category={categoryId} />
      </section>
    </AdminContainer>
  );
};

export default Page;
