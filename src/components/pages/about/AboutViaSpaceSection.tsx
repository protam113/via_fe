'use client';
import Image from 'next/image';
import MainButton from '@/components/button/main.button';
import Header from '@/components/design/header';
import Container from '@/components/container/container';
import { useTranslations } from 'next-intl';

export default function AboutViaSpaceSection() {
  const t = useTranslations('AboutPage');

  return (
    <Container className="mx-auto py-16 px-4 md:px-6">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center ">
        <div className="mb-12 lg:mb-0">
          <Header title={t('title')} />
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('content')}
          </p>

          <div className="mt-8">
            <MainButton href="contact" title="Contact Us" />
          </div>
        </div>
        <div className="relative group">
          <div className="relative overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/img/via_home.jpg"
              alt="Team meeting"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent mix-blend-overlay" />
          </div>
        </div>
      </div>
    </Container>
  );
}
