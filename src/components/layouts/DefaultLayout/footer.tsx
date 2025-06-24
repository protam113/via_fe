'use client';

import { SocialMediaIcon } from '@/assets/icons/icons';
import { WebsiteList } from '@/lib';

export default function Footer() {
  const { website, isLoading, isError } = WebsiteList(0);

  // Xử lý fallback link
  const facebookUrl = website?.facebook?.trim() || '#';
  const instagramUrl = website?.instagram?.trim() || '#';
  const tiktokUrl = website?.tiktok?.trim() || '#';

  // Có thể cho loading hoặc fallback UI nếu muốn
  if (isLoading || isError) return null;

  return (
    <footer className="w-full bg-black text-white flex flex-col items-center py-4 mt-auto">
      <div className="flex gap-6 text-xl lg:text-4xl md:text-2xl">
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-gray-400 transition"
        >
          <SocialMediaIcon.FaFacebookF />
        </a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-gray-400 transition"
        >
          <SocialMediaIcon.FaInstagram />
        </a>
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="hover:text-gray-400 transition"
        >
          <SocialMediaIcon.FaTiktok />
        </a>
      </div>
      <p className="text-sm text-gray-400 mt-2">Copyright 2025 © VIA</p>
    </footer>
  );
}
