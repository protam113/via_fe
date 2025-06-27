import { AdminContainer } from '@/components';
import BackButton from '@/components/common/button/back-admin.button';
import Heading from '@/components/common/design/Heading';
import EventForm from '@/components/pages/AUTH/form/exhibiton_create.form';
import { ENV } from '@/lib';
import React from 'react';

const Page = () => {
  const categoryId = ENV.VIA_ART_FAIR_ID;
  return (
    <AdminContainer>
      <div className="flex items-center justify-between mb-4">
        <Heading name="Via art fair Page" desc="Manage your categories here" />
        <BackButton />
      </div>
      <section>
        <EventForm category={categoryId} />
      </section>
    </AdminContainer>
  );
};

export default Page;
