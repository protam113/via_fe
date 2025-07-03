import { AdminContainer, Heading } from '@/components';
import BackButton from '@/components/common/button/back-admin.button';
import { EventForm } from '@/components/pages/AUTH/form/exhibiton_create.form';
import { ENV, ROUTES } from '@/lib';
import React from 'react';

const Page = () => {
  const categoryId = ENV.VIA_ATELIER_ID;
  return (
    <AdminContainer>
      <div className="flex items-center justify-between mb-4">
        <Heading name="Via Atelier Page" desc="Manage your categories here" />
        <BackButton />
      </div>
      <section>
        <EventForm category={categoryId} href={ROUTES.ADMIN_VIA_ATELIER.ROOT} />
      </section>
    </AdminContainer>
  );
};

export default Page;
