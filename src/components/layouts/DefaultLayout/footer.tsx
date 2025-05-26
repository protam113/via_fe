import Link from 'next/link';
import Image from 'next/image';
import MainButton from '@/components/button/main.button';

const socialLinks = [
  { id: 1, label: 'Instagram', href: 'https://instagram.com' }, // Fixed placeholder URL
  { id: 2, label: 'Instagram', href: 'https://instagram.com' },
  { id: 3, label: 'Twitter', href: 'https://twitter.com' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <div className="ml-2 col ">
                <h2 className="text-xl font-bold">
                  Vietnam International ArtFair
                </h2>
              </div>
            </div>
            <p className="max-w-md">
              VIA specializes in modern architecture and real estate development
              that seamlessly integrates functionality, aesthetics, and
              sustainability. The studio brings a unique global perspective to
              every project. With a commitment to crafting timeless designs.
            </p>
          </div>

          {/* Main Pages */}
          <div className="space-y-6 flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold">Compoany</h3>
            <Link href="#" className="hover:underline transition-colors">
              About Us
            </Link>
            <Link href="#" className="hover:underline transition-colors">
              Via Art Fair
            </Link>
            <Link href="#" className="hover:underline transition-colors">
              Via Atelier
            </Link>
            <Link href="#" className="hover:underline transition-colors">
              Via Prieve'
            </Link>
          </div>

          <div className="space-y-6 flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold">Socials</h3>
            <div className="space-y-6">
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

          {/* Contact and Social */}
          <div className="space-y-6 ">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="mb-1">tomuraleevn@gmail.com</p>
            <p className="mb-1">+84 123 4567889</p>
            <p className="mb-1">Address 24, Street No. 1, An Khanh</p>
            <p>Thu Duc, Ho Chi Minh</p>
            <MainButton href="contact" title="Contact Us" />
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-800">
            Copyright {new Date().getFullYear()} © VIA
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              href="https://vietstrix.com"
              target="_blank"
              className="text-sm text-gray-200 bg-gray-700 px-3 py-1 rounded-full"
            >
              by Vietstrix
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
