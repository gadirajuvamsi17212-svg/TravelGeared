import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authorName,
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Document Title
    const originalTitle = document.title;
    if (title) {
      document.title = title;
    }

    // Helper to set or update a meta tag by name
    const setMetaName = (name: string, content: string | undefined): () => void => {
      if (!content) return () => {};
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      let created = false;
      let prevContent = '';

      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
        created = true;
      } else {
        prevContent = el.content;
      }
      el.content = content;

      return () => {
        if (created && el && el.parentNode) {
          el.parentNode.removeChild(el);
        } else if (el) {
          el.content = prevContent;
        }
      };
    };

    // Helper to set or update a meta tag by property (Open Graph)
    const setMetaProperty = (property: string, content: string | undefined): () => void => {
      if (!content) return () => {};
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      let created = false;
      let prevContent = '';

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
        created = true;
      } else {
        prevContent = el.content;
      }
      el.content = content;

      return () => {
        if (created && el && el.parentNode) {
          el.parentNode.removeChild(el);
        } else if (el) {
          el.content = prevContent;
        }
      };
    };

    // Helper to set or update canonical link
    const setCanonical = (href: string | undefined): () => void => {
      if (!href) return () => {};
      let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      let created = false;
      let prevHref = '';

      if (!el) {
        el = document.createElement('link');
        el.rel = 'canonical';
        document.head.appendChild(el);
        created = true;
      } else {
        prevHref = el.href;
      }
      el.href = href;

      return () => {
        if (created && el && el.parentNode) {
          el.parentNode.removeChild(el);
        } else if (el) {
          el.href = prevHref;
        }
      };
    };

    // Helper to set JSON-LD script
    const setJsonLdScript = (data: Record<string, any> | Array<Record<string, any>> | undefined): () => void => {
      if (!data) return () => {};
      const scriptId = 'dynamic-page-jsonld';
      let el = document.getElementById(scriptId) as HTMLScriptElement | null;
      let created = false;

      if (!el) {
        el = document.createElement('script');
        el.id = scriptId;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
        created = true;
      }

      el.textContent = JSON.stringify(data);

      return () => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      };
    };

    const cleanupFns: Array<() => void> = [];

    const effectiveDesc = description || SITE_CONFIG.subTagline;
    const effectiveImage = ogImage || SITE_CONFIG.heroBgUrl;
    const effectiveUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.url);

    cleanupFns.push(setMetaName('description', effectiveDesc));
    cleanupFns.push(setCanonical(canonicalUrl));

    // Open Graph
    cleanupFns.push(setMetaProperty('og:title', title));
    cleanupFns.push(setMetaProperty('og:description', effectiveDesc));
    cleanupFns.push(setMetaProperty('og:image', effectiveImage));
    cleanupFns.push(setMetaProperty('og:url', effectiveUrl));
    cleanupFns.push(setMetaProperty('og:type', ogType));

    if (publishedTime) {
      cleanupFns.push(setMetaProperty('article:published_time', publishedTime));
    }
    if (modifiedTime) {
      cleanupFns.push(setMetaProperty('article:modified_time', modifiedTime));
    }
    if (authorName) {
      cleanupFns.push(setMetaProperty('article:author', authorName));
    }

    // Twitter Cards
    cleanupFns.push(setMetaName('twitter:title', title));
    cleanupFns.push(setMetaName('twitter:description', effectiveDesc));
    cleanupFns.push(setMetaName('twitter:image', effectiveImage));
    cleanupFns.push(setMetaName('twitter:url', effectiveUrl));

    // JSON-LD
    if (jsonLd) {
      cleanupFns.push(setJsonLdScript(jsonLd));
    }

    return () => {
      document.title = originalTitle;
      cleanupFns.forEach((fn) => fn());
    };
  }, [
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    publishedTime,
    modifiedTime,
    authorName,
    jsonLd,
  ]);

  return null;
};
