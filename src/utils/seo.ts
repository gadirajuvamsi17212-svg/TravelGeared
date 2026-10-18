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
  '/blog/7-best-portable-bluetooth-speakers-for-travel-2026',
  '/blog/best-travel-tips-for-2026',
  '/blog/forex-card-guide-2026',
  '/blog/how-to-make-money-while-traveling-2026',
];

export function isApprovedIndexablePath(pathname: string): boolean {
  if (!pathname) return false;
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  return APPROVED_INDEXABLE_PATHS.includes(cleanPath);
}

export function setRobotsMeta(directive: 'index, follow' | 'noindex, follow') {
  if (typeof document === 'undefined') return;
  let metaTag = document.querySelector('meta[name="robots"]');
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'robots');
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute('content', directive);
}
