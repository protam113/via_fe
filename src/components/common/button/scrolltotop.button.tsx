'use client';

import { ArrowIcons, Icons, SocialMediaIcon } from '@/assets/icons/icons';
import { SocialMedia, WebsiteList } from '@/lib';
import { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { website, isLoading, isError } = WebsiteList(0);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading || isError) return null;

  const facebookUrl = website.facebook?.trim()
    ? website.facebook
    : SocialMedia.FB.url;

  const phoneNumber = website.phone_number?.trim()
    ? `tel:${website.phone_number.trim()}`
    : '#';

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-social-mess text-white rounded-full shadow-md hover:bg-gray-700 flex items-center justify-center transition duration-300 animate-glow"
        aria-label="Facebook Messenger"
      >
        <SocialMediaIcon.FaFacebookMessenger size={20} />
      </a>

      <a
        href={phoneNumber}
        className="w-12 h-12 bg-social-phone text-white rounded-full shadow-md hover:bg-gray-700 flex items-center justify-center transition duration-300 animate-glow"
        aria-label="Gọi ngay"
      >
        <Icons.PhoneCall size={20} />
      </a>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-gray-800 text-white rounded-full shadow-md hover:bg-main-700 flex items-center justify-center transition duration-300"
          aria-label="Scroll to top"
        >
          <ArrowIcons.ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
