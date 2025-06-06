import { Toaster } from 'sonner';
import Script from 'next/script';
import ReactQueryProvider from '../../provider/ReactQueryProvider';
import '../../assets/styles/globals.css';
import { adminMetadata, adminViewport } from '@/constants';

export const metadata = adminMetadata;
export const viewport = adminViewport;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className="mdl-js">
        <body className="antialiased scroll-smooth">
          <div>
            <ReactQueryProvider>
              {children}
              <Toaster position="top-right" richColors />
            </ReactQueryProvider>
          </div>
          <Script id="add-mdl-class" strategy="afterInteractive">
            {`document.documentElement.classList.add('mdl-js');`}
          </Script>
        </body>
      </html>
    </>
  );
}
