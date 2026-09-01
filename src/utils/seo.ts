/**
 * SEO Utility for TravelGeared
 * Manages indexable URLs and robots meta tag directives.
 */

export const APPROVED_INDEXABLE_PATHS = [
  '/',
  '/about',
  '/contact',
  '/blog',
  '/blog/best-backpacks-for-2026',
];

export function isApprovedIndexablePath(pathname: string): boolean {
  if (!pathname) return false;
  // Normalize path by removing trailing slash (except root) and lowercase
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  return APPROVED_INDEXABLE_PATHS.includes(cleanPath);
}

export function setRobotsMeta(directive: 'index, follow' | 'noindex, follow') {
  if (typeof document === 'undefined') return;

  let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'robots');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', directive);
}
