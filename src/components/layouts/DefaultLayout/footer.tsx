import { SocialMedia } from '@/lib/data';
import { SocialMediaIcon } from '@/assets/icons/icons';
import CustomImage from '@/components/common/design/image.component';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white flex flex-col items-center py-4 mt-auto">
      <div className="flex gap-6 text-xl">
        <a href="#" aria-label="Facebook" className="hover:text-gray-400">
          <SocialMediaIcon.Facebook />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-gray-400">
          <SocialMediaIcon.Instagram />
        </a>
        <a href="#" aria-label="TikTok" className="hover:text-gray-400">
          <CustomImage
            src="/icons/tiktok.svg"
            alt="TikTok"
            width={24}
            height={24}
          />
        </a>
      </div>
      <p className="text-sm text-gray-400 mt-2">Copyright 2025 © VIA</p>
    </footer>
  );
}
