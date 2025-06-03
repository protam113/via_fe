import AdminContainer from '@/components/container/admin.container';
import Heading from '@/components/common/design/Heading';
import { SeoSettingsForm } from '@/components/pages/AUTH/seo/updateSeoForm';

const Page = () => {
  return (
    <AdminContainer>
      <Heading name="SEO Page" desc="Manage your seo website here" />

      <SeoSettingsForm />
    </AdminContainer>
  );
};

export default Page;
