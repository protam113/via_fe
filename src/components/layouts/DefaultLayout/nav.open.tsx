'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Via Art Fair', href: '/via-art-fair' },
  { label: 'Via Atelier', href: '/via-atelier' },
  { label: "Via Prive'", href: '/via-prive' },
  { label: 'Contact', href: '/contact' },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-40 p-2 text-black hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="Open menu"
      >
        <span className="block w-6 h-0.5 bg-black mb-1.5"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

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
          className="absolute top-8 right-8 p-2 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Close menu"
        >
          <X size={24} />
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
              <h3 className="text-gray-400 mb-2 text-sm">Contact</h3>
              <p className="mb-1">tomuraleevn@gmail.com</p>
              <p className="mb-1">+84 123 4567889</p>
              <p className="mb-1">Address 24, Street No. 1, An Khanh</p>
              <p>Thu Duc, Ho Chi Minh</p>
            </div>

            <div className="text-right">
              <h3 className="text-gray-400 mb-2 text-sm">Socials</h3>
              <div className="space-y-1">
                {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                  <div key={social}>
                    <Link
                      href={`https://${social.toLowerCase()}.com`}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
