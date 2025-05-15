'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSidebar } from '@/hooks/use-sidebar';
import LangButton from '@/components/button/language.button';

export function Nav() {
  const { toggleSidebar } = useSidebar();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between">
      {/* Left - Logo */}
      <div className="flex items-center flex-shrink-0">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
          className="p-2 transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Center */}
      <div className="flex-1 flex justify-center">
        {/* Bỏ gì đó vào đây sau cũng được, giờ để trống */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg?height=40&width=40"
            alt="VIA Logo"
            width={60}
            height={60}
            className="rounded  p-1"
          />
        </Link>
      </div>

      {/* Right - Lang + Burger */}
      <div className="flex items-center space-x-6 flex-shrink-0">
        <LangButton />
      </div>
    </div>
  );
}
