'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LangButton from '@/components/button/language.button';

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling when sidebar is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeSidebar]);

  // Focus trap inside the sidebar
  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    const focusableElements = sidebar.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'ABOUT', href: '/about' },
    { name: 'VIA ART FAIR', href: '/art-fair' },
    { name: 'VIA ATELIER', href: '/atelier' },
    { name: "VIA PRIVE'", href: '/prive' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        id="sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-full flex-col justify-between bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out md:w-1/3',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={closeSidebar}
            aria-label="Close navigation menu"
            className="p-2 text-black transition-transform duration-200 hover:scale-110 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col pt-16 md:pt-24">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-8 py-4 text-lg font-medium text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-100 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto space-y-6 text-center">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <Button className="min-w-[200px] w-full md:w-auto bg-primary text-white hover:bg-gray-800">
              Contact now
            </Button>

            <LangButton />
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Vietnam International Artfair. All
            rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
