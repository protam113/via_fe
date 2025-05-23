'use client';

import Link from 'next/link';
import NavigationMenu from './nav.open';
import { usePathname } from 'next/navigation';

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-8 md:p-12 bg-white/5 backdrop-blur-sm">
      <div className="flex-1">
        {/* Desktop logo */}
        <Link href="/" className="text-xl font-medium hidden md:inline">
          Vietnam International Artfair
        </Link>

        {/* Mobile logo */}
        <Link href="/" className="text-xl font-medium md:hidden">
          VIA
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex space-x-2">
            <li>
              <Link
                href="/"
                className="relative text-sm font-medium transition-colors hover:text-black/70 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/about"
                className="relative text-sm font-medium transition-colors hover:text-black/70 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                About
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/contact"
                className="relative text-sm font-medium transition-colors hover:text-black/70 after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <NavigationMenu />
      </div>
    </header>
  );
}
