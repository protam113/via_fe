'use client';

import ContactForm from '@/components/container/contact.container';
import Container from '@/components/container/container';
import EnhancedHeroBanner from '@/components/container/enhanced-hero-banner';
import SEO from '@/components/core/SEO';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('ContactPage');

  return (
    <>
      <SEO
        title="Contact us"
        description="Hust4L brings cutting-edge web design and development services. Fast, sleek, and built for the future!"
      />
      <main>
        <EnhancedHeroBanner
          heading={t('title')}
          backgroundImage="/img/hero4.png"
        />
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-500">info@hanhsocial.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-gray-500">+84 (800) 123-4567</p>
                <p className="text-sm text-gray-500">+84 (800) 987-6543</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-gray-500">
                  Ho Chi Minh City, VietNam, 90001
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Business Hours</p>
                <div className="grid grid-cols-2 text-sm text-gray-500">
                  <p>Monday to Friday</p>
                  <p>9:00 AM – 6:00 PM</p>
                  <p>Saturday</p>
                  <p>10:00 AM – 4:00 PM</p>
                  <p>Sunday</p>
                  <p>Closed</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </Container>
      </main>
    </>
  );
};

export default Page;
