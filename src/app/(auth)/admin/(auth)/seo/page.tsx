import { Heading, AdminContainer } from '@/components';
import { SeoSettingsForm } from '@/components/pages/AUTH/seo/updateSeoForm';

const Page = () => {
  return (
    <AdminContainer>
      <Heading
        name="SEO Page"
        desc="Manage and update your website's SEO information below"
      />

      <SeoSettingsForm />
    </AdminContainer>
  );
};

export default Page;
