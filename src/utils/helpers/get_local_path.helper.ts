export function getLocaleFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/(vi|en)(\/|$)/);
  if (!match) return null;

  const locale = match[1];
  return locale === 'vi' ? 'vn' : locale;
}
