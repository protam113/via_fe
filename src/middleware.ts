import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const basePath = pathname.replace(/^\/(vi|en)/, ''); // dùng cho i18n routes

  const isAuthenticated =
    request.cookies.get('isAuthenticated')?.value === 'true';

  // Bypass login page
  if (basePath === '/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Bảo vệ admin route
  if (basePath.startsWith('/admin') && !isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(pathname)}`, request.url)
    );
  }

  // Apply i18n cho các route còn lại
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match tất cả trừ static files/api nhưng VẪN GIỮ /admin
    '/((?!api|_next|_vercel|.*\\..*|admin|login).*)',
  ],
};
