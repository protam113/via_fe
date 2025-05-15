import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import LangButton from '@/components/button/language.button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'ABOUT', href: '/about' },
  { name: 'VIA ART FAIR', href: '/art-fair' },
  { name: 'VIA ATELIER', href: '/atelier' },
  { name: "VIA PRIVE'", href: '/prive' },
];

const HomeNav = () => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {isMobile && (
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white/80 backdrop-blur-sm"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Left Side - Sidebar Navigation */}
      <div
        className={cn(
          'bg-white w-full md:w-[30%] lg:w-[25%] flex flex-col justify-between border-r border-gray-200',
          isMobile
            ? 'fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out'
            : '',
          isMobile && !isMobileMenuOpen ? '-translate-x-full' : '',
          isMobile && isMobileMenuOpen ? 'translate-x-0' : ''
        )}
      >
        {/* Navigation Links */}
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

        {/* Footer Area */}
        <div className="p-8 border-t border-gray-200">
          {/* Contact + Language Selector */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <Button className="min-w-[200px] w-full md:w-auto bg-primary text-white hover:bg-gray-800">
              Contact now
            </Button>

            <LangButton />
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} VietStrix. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeNav;
