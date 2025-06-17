import { NextIntlClientProvider } from 'next-intl';
import { Tektur } from 'next/font/google';
import DelayedLoading from '@/components/loading/DelayedLoading';
import { Toaster } from 'sonner';
import Script from 'next/script';
import ReactQueryProvider from '../../provider/ReactQueryProvider';
import {
  metadata as siteMetadata,
  viewport as siteViewport,
} from '@/constants';
import '../../assets/styles/globals.css';
import CheckLocale from '@/components/core/CheckLocale';

const tektur = Tektur({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-tektur',
});
export const metadata = siteMetadata;
export const viewport = siteViewport;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <DelayedLoading duration={3000} />
      <CheckLocale locale={locale} />
      <html lang={locale} className="mdl-js">
        <body className="antialiased scroll-smooth">
          <div className={`${tektur.className} font-serif`}>
            <NextIntlClientProvider locale={locale}>
              <ReactQueryProvider>
                {children}
                <Toaster position="top-right" richColors />
              </ReactQueryProvider>
            </NextIntlClientProvider>
          </div>
          <Script id="add-mdl-class" strategy="afterInteractive">
            {`document.documentElement.classList.add('mdl-js');`}
          </Script>
        </body>
      </html>
    </>
  );
}
