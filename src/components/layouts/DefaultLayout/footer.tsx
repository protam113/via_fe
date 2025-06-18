import { SocialMedia } from '@/lib/data';
import { SocialMediaIcon } from '@/assets/icons/icons';
import CustomImage from '@/components/common/design/image.component';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white flex flex-col items-center py-4 mt-auto">
      <div className="flex gap-6 text-xl lg:text-4xl md:text-2xl">
        <a href="#" aria-label="Facebook" className="hover:text-gray-400">
          <SocialMediaIcon.FaFacebookF />
        </a>
        <a href="#" aria-label="Instagram" className="hover:text-gray-400">
          <SocialMediaIcon.FaInstagram />
        </a>
        <a href="#" aria-label="TikTok" className="hover:text-gray-400">
          <SocialMediaIcon.FaTiktok />
        </a>
      </div>
      <p className="text-sm text-gray-400 mt-2">Copyright 2025 © VIA</p>
    </footer>
  );
}
