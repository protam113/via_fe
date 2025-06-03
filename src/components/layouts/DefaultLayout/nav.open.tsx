'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LangButton from '@/components/common/button/language.button';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Via Art Fair', href: '/via-art-fair' },
  { label: 'Via Atelier', href: '/via-atelier' },
  { label: "Via Prive'", href: '/via-prive' },
  { label: 'Contact', href: '/contact-us' },
];

const socialLinks = [
  { id: 1, label: 'Instagram', href: 'https://instagram.com' }, // Fixed placeholder URL
  { id: 2, label: 'Instagram', href: 'https://instagram.com' },
  { id: 3, label: 'Twitter', href: 'https://twitter.com' },
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
        <div className="max-w-8xl w-full mx-auto px-6 py-2 flex items-center justify-between">
          {/* Logo on mobile, text on larger screens */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={50}
                height={50}
                className="block md:hidden"
              />
              <span
                className={`hidden md:block text-xl leading-none ${
                  pathname.startsWith('/via-atelier') ||
                  pathname.startsWith('/via-prive')
                    ? 'text-white'
                    : 'text-black'
                }`}
              >
                Vietnam International Artfair
              </span>
            </div>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-black hover:opacity-70 transition-opacity cursor-pointer z-50"
            aria-label="Open menu"
          >
            <span
              className={cn(
                'block w-6 h-1 mb-1.5',
                pathname.startsWith('/via-atelier') ||
                  pathname.startsWith('/via-prive')
                  ? 'bg-white'
                  : 'bg-black'
              )}
            ></span>

            <span
              className={cn(
                'block w-6 h-1',
                pathname.startsWith('/via-atelier') ||
                  pathname.startsWith('/via-prive')
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
          'fixed inset-0 bg-white z-50 transition-transform duration-400 ease-in-out flex flex-col overflow-y-auto',
          isOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 p-2 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Close menu"
        >
          <X size={30} />
        </button>

        {/* Menu Content */}
        <div className="flex flex-col md:flex-row h-full w-full p-8 md:p-12 max-h-screen">
          {/* Main Navigation */}
          <div className="flex-1 flex flex-col justify-center md:justify-start md:pt-16">
            <nav className="space-y-4 md:space-y-6">
              {menuItems.map(({ label, href }) => (
                <div key={label} className="overflow-hidden">
                  <Link
                    href={href}
                    className="block text-3xl md:text-5xl font-medium text-black hover:underline transition-transform duration-300 hover:translate-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </div>
              ))}
              <LangButton />
            </nav>
          </div>

          {/* Contact and Social */}
          <div className="mt-8 md:mt-0 md:self-end flex flex-col items-start md:items-end space-y-6">
            <div className="text-left md:text-right">
              <h3 className="text-gray-800 mb-2 text-sm">Contact</h3>
              <p className="mb-1">tomuraleevn@gmail.com</p>
              <p className="mb-1">+84 123 4567889</p>
              <p className="mb-1">Address 24, Street No. 1, An Khanh</p>
              <p>Thu Duc, Ho Chi Minh</p>
            </div>

            <div className="text-left md:text-right">
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
              © {new Date().getFullYear()} All/sony reserved. — by{' '}
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
