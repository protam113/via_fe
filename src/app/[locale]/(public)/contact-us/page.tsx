'use client';

import ContactForm from '@/components/wrappers/contact.container';
import { Container } from '@/components';
import EnhancedHeroBanner from '@/components/wrappers/enhanced-hero-banner';
import SEO from '@/components/core/SEO';
import { useTranslations } from 'next-intl';
import { ComponentsIcons } from '@/assets/icons/icons';

const Page = () => {
  const t = useTranslations('ContactPage');

  return (
    <>
      <SEO
        title="Contact us"
        description="Hust4L brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main>
        <Container>
          <ContactForm />

          <div className="h-[450px] w-full overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.95923013567335!2d106.73027138947603!3d10.784660643747342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175250f3894da1d%3A0x73d02581cf89c552!2sTomuraLee%20Gallery!5e0!3m2!1sen!2s!4v1747469332976!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Page;
