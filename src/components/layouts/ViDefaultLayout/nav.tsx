import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CustomImage from '@/components/design/image.component';
import LangButton from '@/components/button/language.button';
import { X } from 'lucide-react';

const navItems = [
  { name: 'Giới Thiệu', path: '/vi/about' },
  { name: 'Via Art Fair', path: '/vi/via-art-fair' },
  { name: 'Via Atelier', path: '/vi/via-atelier' },
];

const navItemsMobile = [
  { name: 'Giới Thiệu', path: '/vi/about' },
  { name: 'Via Art Fair', path: '/vi/via-art-fair' },
  { name: 'Via Atelier', path: '/vi/via-atelier' },
  { name: "Via Prive'", path: '/vi/via-prive' },
];
const navItemsSec = [
  { name: "Via Prive'", path: '/via-prive' },
  { name: 'Liên Hệ', path: '/vi/contact-us' },
];

export function ViNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all  duration-300 font-serif ${
        isScrolling
          ? 'lg:bg-white bg-white shadow-lg lg:min-h-[120px] min-h-[80px]'
          : 'lg:bg-transparent lg:min-h-[120px] min-h-[80px]'
      }`}
    >
      <div className="max-w-7xl w-full mx-auto py-2 ">
        <div className="flex items-center w-full max-w-7xl justify-between min-h-[80px] lg:min-h-[120px] h-full">
          <div className="hidden md:hidden lg:flex items-center justify-center gap-2 mr-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`
   relative px-3 py-1 text-lg font-medium transition-all duration-300 ease-in-out text-black
   after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-black after:w-0 after:transition-all after:duration-300
   hover:after:w-full
   ${
     pathname === item.path
       ? 'font-semibold scale-105 after:w-full after:text-black'
       : 'hover:scale-105'
   }
   ${isScrolling ? 'text-black' : 'text-white '}
 `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden h-[75px] w-[100px] flex items-center justify-center gap-2
  `}
            onClick={toggleMobileMenu}
          >
            <span className="text-sm font-semibold text-black">MENU</span>
            <div className="flex flex-col justify-center gap-1">
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-4 h-0.5 bg-black"></span>
            </div>
          </button>

          {/* Logo */}
          <Link href="/vi" className="flex items-center">
            <div
              className={`relative  
                 ${
                   isScrolling
                     ? 'lg:w-[90px] lg:h-[90px]  w-[80px] h-[80px]  '
                     : 'lg:w-[120px] lg:h-[120px]  w-[100px] h-[100px] '
                 }

              `}
            >
              <CustomImage
                src="/icons/Logo_noTitle.svg"
                alt="Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Social Icons & Button */}
          <div className="hidden lg:flex items-center gap-2 mr-4">
            {navItemsSec.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`
relative px-3 py-1 text-lg font-medium transition-all duration-300 ease-in-out text-black
after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-black after:w-0 after:transition-all after:duration-300
hover:after:w-full
${
  pathname === item.path
    ? 'font-semibold scale-105 after:w-full after:text-black'
    : 'hover:scale-105'
}
${isScrolling ? 'text-black' : 'text-white '}
`}
              >
                {item.name}
              </Link>
            ))}

            <div className="ml-8">
              <LangButton />
            </div>
          </div>
          <div className="lg:hidden">
            <LangButton />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 md:hidden">
          <div className="flex justify-between items-center mb-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm leading-none font-semibold uppercase">
                  VIETNAM INTERNATIONAL ART FAIR
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              className="flex items-center text-sm font-medium"
              onClick={toggleMobileMenu}
            >
              CLOSE <X className="ml-1" size={18} />
            </button>
          </div>

          {/* Mobile navigation links */}
          <div className="flex flex-col space-y-6">
            <Link
              href="/about-us"
              className=" flex justify-center items-center gap-2"
            >
              About Us
            </Link>
            {navItemsMobile.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`
        py-2 px-4 text-sm font-medium w-full text-center
        ${
          pathname === item.path
            ? 'bg-gray-200 text-lg text-black'
            : 'hover:bg-gray-200'
        }
      `}
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile contact button */}
          <Link
            href="/contact-us"
            className="mt-12 flex justify-center items-center gap-2"
          >
            Liên Hệ
          </Link>
        </div>
      )}
    </nav>
  );
}

export default ViNavbar;
