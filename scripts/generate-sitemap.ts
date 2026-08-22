import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES } from '../src/data/categories';
import { ARTICLES } from '../src/data/articles';
import { BLOG_ARTICLES } from '../src/data/blogArticles';
import { SITE_CONFIG } from '../src/data/siteConfig';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

interface SitemapEntry {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) {
    return new Date().toISOString().split('T')[0];
  }
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }
  return new Date().toISOString().split('T')[0];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml(): string {
  const baseUrl = (SITE_CONFIG.url || 'https://travelgeared.com').replace(/\/+$/, '');
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemapEntries: SitemapEntry[] = [];

  // 1. Core Primary Pages
  sitemapEntries.push({
    path: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: currentDate,
  });

  sitemapEntries.push({
    path: '/about',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: currentDate,
  });

  sitemapEntries.push({
    path: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: currentDate,
  });

  sitemapEntries.push({
    path: '/blog',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: currentDate,
  });

  sitemapEntries.push({
    path: '/buying-guides',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: currentDate,
  });

  sitemapEntries.push({
    path: '/reviews',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: currentDate,
  });

  sitemapEntries.push({
    path: '/privacy-policy',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: '2026-08-01',
  });

  sitemapEntries.push({
    path: '/terms-of-service',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: '2026-08-01',
  });

  // 2. Category Pages (from CATEGORIES source of truth)
  if (Array.isArray(CATEGORIES)) {
    for (const cat of CATEGORIES) {
      if (cat.slug && cat.slug.trim()) {
        sitemapEntries.push({
          path: `/category/${cat.slug.trim()}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: currentDate,
        });
      }
    }
  }

  // 3. Guides & In-depth Review Articles (from ARTICLES source of truth)
  if (Array.isArray(ARTICLES)) {
    for (const article of ARTICLES) {
      if (article.slug && article.slug.trim()) {
        sitemapEntries.push({
          path: `/guides/${article.slug.trim()}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: formatDate(article.publishDate),
        });
      }
    }
  }

  // 4. Blog Articles (from BLOG_ARTICLES source of truth)
  if (Array.isArray(BLOG_ARTICLES)) {
    for (const article of BLOG_ARTICLES) {
      if (article.slug && article.slug.trim()) {
        sitemapEntries.push({
          path: `/blog/${article.slug.trim()}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: formatDate(article.publishDate),
        });
      }
    }
  }

  // Deduplicate entries by normalized URL
  const uniqueUrls = new Map<string, SitemapEntry>();
  for (const entry of sitemapEntries) {
    const normalizedPath = entry.path.startsWith('/') ? entry.path : `/${entry.path}`;
    const fullUrl = normalizedPath === '/' ? `${baseUrl}/` : `${baseUrl}${normalizedPath}`;
    if (!uniqueUrls.has(fullUrl)) {
      uniqueUrls.set(fullUrl, entry);
    }
  }

  // Build XML
  const xmlLines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const [fullUrl, entry] of uniqueUrls) {
    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>${escapeXml(fullUrl)}</loc>`);
    if (entry.lastmod) {
      xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    }
    xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    xmlLines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
    xmlLines.push('  </url>');
  }

  xmlLines.push('</urlset>');
  xmlLines.push(''); // trailing newline

  return xmlLines.join('\n');
}

export function writeSitemap(): void {
  const xmlContent = generateSitemapXml();

  const publicDir = path.resolve(rootDir, 'public');
  const distDir = path.resolve(rootDir, 'dist');

  // Ensure public directory exists and write sitemap.xml
  if (fs.existsSync(publicDir)) {
    const publicSitemapPath = path.resolve(publicDir, 'sitemap.xml');
    fs.writeFileSync(publicSitemapPath, xmlContent, 'utf-8');
    console.log(`[Sitemap] Generated ${publicSitemapPath}`);
  }

  // Ensure dist directory exists (if built) and write sitemap.xml
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.resolve(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xmlContent, 'utf-8');
    console.log(`[Sitemap] Generated ${distSitemapPath}`);
  }

  // Ensure robots.txt in public
  const robotsTxtContent = `User-agent: *
Allow: /

Sitemap: https://travelgeared.com/sitemap.xml
`;

  if (fs.existsSync(publicDir)) {
    const publicRobotsPath = path.resolve(publicDir, 'robots.txt');
    fs.writeFileSync(publicRobotsPath, robotsTxtContent, 'utf-8');
  }

  if (fs.existsSync(distDir)) {
    const distRobotsPath = path.resolve(distDir, 'robots.txt');
    fs.writeFileSync(distRobotsPath, robotsTxtContent, 'utf-8');
  }
}

// If executed directly via node / tsx / bun
if (process.argv[1] && process.argv[1].includes('generate-sitemap')) {
  try {
    writeSitemap();
    console.log('[Sitemap] Successfully built sitemap.xml');
  } catch (error) {
    console.error('[Sitemap] Failed to generate sitemap:', error);
    process.exit(1);
  }
}
