import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface IGetStartedButtonProps {
  text: string;
  className?: string;
  url: string;
  isScrolling?: boolean;
}
export default function ContactButton({
  text = 'Get started',
  className,
  url,
  isScrolling,
}: IGetStartedButtonProps) {
  return (
    <Link href={url} className="min-h-12  w-48">
      <button
        className={cn(
          'group flex h-[75px] w-40 items-center justify-center gap- rounded-sm  p-2 font-bold transition-colors duration-100 ease-in-out hover:bg-main-800 bg-gray-400',
          className
        )}
      >
        <span
          className={cn(
            'text-black-600 transition-colors duration-100 ease-in-out  text-white  '
          )}
        >
          {text}
        </span>
      </button>
    </Link>
  );
}
