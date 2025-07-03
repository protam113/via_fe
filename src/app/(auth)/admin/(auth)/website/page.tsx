import { Heading, AdminContainer } from '@/components';
import { WebsiteUpdateForm } from '@/components/pages/AUTH/form/webiste_update_form';

const Page = () => {
  return (
    <AdminContainer>
      <Heading
        name="Website Information Page"
        desc="Manage your website information here"
      />

      <WebsiteUpdateForm />
    </AdminContainer>
  );
};

export default Page;
