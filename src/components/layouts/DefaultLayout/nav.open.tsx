'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Via Art Fair', href: '/via-art-fair' },
  { label: 'Via Atelier', href: '/via-atelier' },
  { label: "Via Prive'", href: '/via-prive' },
  { label: 'Contact', href: '/contact-us' },
];

const socialLinks = [
  { id: 1, label: 'Instagram', href: 'cialLinks' },
  { id: 2, label: 'Instagram', href: 'URL_ADDRESS.instagram.com' },
  { id: 3, label: 'Twitter', href: 'URL_ADDRESS.twitter.com' },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Trigger Button */}
      <div className="fixed top-4 z-50 px-4 lg:px-8 w-full flex justify-center">
        <div className=" max-w-8xl w-full mx-auto px-6 py-2 flex items-center justify-between">
          {/* Logo bên trái */}
          <Link href="/" className="flex items-center gap-2">
            {/* <Image src="/logo.svg" alt="Logo" width={50} height={50} /> */}

            {/*   <div className="font-semibold">
 Hiển thị 1 dòng trên md trở lên */}
            {/* <span className="hidden md:block text-xl leading-none">
              Vietnam International Artfair
            </span> */}

            <span
              className={`text-xl leading-none ${
                pathname.startsWith('/via-atelier') ||
                pathname.startsWith('/via-prive')
                  ? 'text-white'
                  : 'text-black'
              }`}
            >
              Vietnam International Artfair
            </span>

            {/* Hiển thị 2 dòng khi nhỏ hơn md */}
            {/* <span className="block md:hidden text-xl leading-none">
                Vietnam
                <br />
                International Artfair
              </span> 
            </div>*/}
          </Link>

          {/* Menu hoặc nút mở menu bên phải */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-black hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Open menu"
          >
            <span
              className={cn(
                'block w-6 h-1 mb-1.5 ',
                pathname === '/via-atelier' || pathname === '/via-prive'
                  ? 'bg-white'
                  : 'bg-black'
              )}
            ></span>
            <span
              className={cn(
                'block w-6 h-1',
                pathname === '/via-atelier' || pathname === '/via-prive'
                  ? 'bg-white'
                  : 'bg-black'
              )}
            ></span>
          </button>
        </div>
      </div>

      {/* Overlay Background */}
      <div
        className={cn(
          'fixed inset-0 bg-black/30 z-40 transition-opacity duration-400',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Full Screen Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-50 transition-transform duration-400 ease-in-out flex flex-col',
          isOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute font-bold top-8 right-8 p-2 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Close menu"
        >
          <X size={30} />
        </button>

        <div className="flex flex-col md:flex-row h-full w-full p-8 md:p-12">
          {/* Main Navigation */}
          <div className="flex-1 flex flex-col justify-center md:justify-start md:pt-16">
            <nav className="space-y-6">
              {menuItems.map(({ label, href }) => (
                <div key={label} className="overflow-hidden">
                  <Link
                    href={href}
                    className="block text-4xl md:text-5xl font-medium text-black hover:underline transform transition-transform duration-300 hover:translate-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Contact and Social */}
          <div className="mt-auto md:mt-0 md:self-end flex flex-col items-start md:items-end space-y-8">
            <div className="text-right">
              <h3 className="text-gray-800 mb-2 text-sm">Contact</h3>
              <p className="mb-1">tomuraleevn@gmail.com</p>
              <p className="mb-1">+84 123 4567889</p>
              <p className="mb-1">Address 24, Street No. 1, An Khanh</p>
              <p>Thu Duc, Ho Chi Minh</p>
            </div>

            <div className="text-right">
              <h3 className="text-gray-400 mb-2 text-sm">Socials</h3>
              <div className="space-y-1">
                {socialLinks.map((social) => (
                  <div key={social.id}>
                    <Link
                      href={social.href}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <footer className="text-center text-sm text-gray-500 py-4">
              © {new Date().getFullYear()} All rights reserved. — by{' '}
              <Link
                href="https://vietstrix.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vietstrix
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
