import { SocialMediaIcon } from '@/assets/icons/icons';
import { JSX } from 'react';

export type UrlType = 'fb' | 'global' | 'ig' | 'tiktok';

export const iconMap: Record<UrlType, JSX.Element> = {
  fb: <SocialMediaIcon.FaFacebookF />,
  global: <SocialMediaIcon.TbWorld />,
  ig: <SocialMediaIcon.FaInstagram />,
  tiktok: <SocialMediaIcon.FaTiktok />,
};

export const isValidUrlType = (type: string): type is UrlType =>
  ['fb', 'global', 'ig', 'tiktok'].includes(type);
