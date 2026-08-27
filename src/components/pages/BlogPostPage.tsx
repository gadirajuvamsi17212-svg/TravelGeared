import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getBlogArticleBySlug,
  getRelatedBlogArticles,
} from '../../data/blogArticles';
import { PRODUCTS } from '../../data/products';
import { SITE_CONFIG } from '../../data/siteConfig';
import { SEOHead } from '../seo/SEOHead';
import { Product } from '../../types';

interface BlogPostPageProps {
  onSelectProduct?: (product: Product) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onSelectProduct }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = slug ? getBlogArticleBySlug(slug) : undefined;
  const relatedArticles = article
    ? getRelatedBlogArticles(article.slug, article.category, 3)
    : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!article) {
    return (
      <div className="w-full bg-[#faf9fc] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <SEOHead
          title="Article Not Found | TravelGeared"
          description="The requested travel gear article could not be found."
          canonicalUrl={`${SITE_CONFIG.url}/blog`}
        />
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-2xl border border-[#ccc3d7] shadow-xs">
          <span className="material-symbols-outlined text-5xl text-[#8E55FD] mb-4">
            menu_book
          </span>
          <h1 className="font-headline-lg font-bold text-2xl text-[#1a1c1e] mb-3">
            Article Not Found
          </h1>
          <p className="font-body-md text-sm text-[#4a4455] mb-6 leading-relaxed">
            The article you are looking for may have been moved, updated, or is not yet published.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#8E55FD] text-white font-title-md text-sm font-semibold rounded hover:bg-[#7232E7] transition-all shadow-xs cursor-pointer"
          >
            &larr; Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `${SITE_CONFIG.url}/blog/${article.slug}`;
  const featuredProductsList = (article.featuredProducts || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  // Dynamic BlogPosting JSON-LD structured data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: [article.featuredImage || article.image],
    datePublished: article.publishedDate ? `${article.publishedDate}T08:00:00+00:00` : undefined,
    dateModified: article.publishedDate ? `${article.publishedDate}T08:00:00+00:00` : undefined,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}${SITE_CONFIG.headerLogoUrl}`,
      },
    },
    articleSection: article.category,
    wordCount: article.content.split(/\s+/).length,
  };

  // Helper to render markdown content with headings, lists, bolding, and paragraphs
  const renderFormattedContent = (contentStr: string) => {
    const blocks = contentStr.trim().split('\n\n');
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Heading 3
      if (trimmed.startsWith('### ')) {
        const headingText = trimmed.replace(/^###\s+/, '');
        return (
          <h3
            key={idx}
            className="font-headline-lg font-bold text-xl sm:text-2xl text-[#1a1c1e] mt-8 mb-3 pt-2 leading-snug"
          >
            {headingText}
          </h3>
        );
      }

      // Heading 2
      if (trimmed.startsWith('## ')) {
        const headingText = trimmed.replace(/^##\s+/, '');
        return (
          <h2
            key={idx}
            className="font-headline-lg font-bold text-2xl sm:text-3xl text-[#8E55FD] mt-10 mb-4 pt-2 border-b border-[#eeedf0] pb-2 leading-tight"
          >
            {headingText}
          </h2>
        );
      }

      // Unordered or Ordered List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
        const lines = trimmed.split('\n');
        return (
          <ul key={idx} className="my-4 space-y-2 pl-5 list-disc text-[#4a4455]">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^[-*]\s+|\d+\.\s+/, '').trim();
              return (
                <li key={lIdx} className="font-body-md text-base leading-relaxed pl-1">
                  {renderInlineFormatting(cleanLine)}
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard Paragraph
      return (
        <p
          key={idx}
          className="font-body-md text-base sm:text-lg text-[#4a4455] leading-relaxed mb-4"
        >
          {renderInlineFormatting(trimmed)}
        </p>
      );
    });
  };

  // Helper for inline bolding (**text**)
  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-bold text-[#1a1c1e]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-[#faf9fc] min-h-screen text-[#1a1c1e]">
      {/* SEO Metadata & JSON-LD Structured Data */}
      <SEOHead
        title={article.seoTitle || `${article.title} | TravelGeared`}
        description={article.metaDescription || article.excerpt}
        canonicalUrl={canonicalUrl}
        ogImage={article.featuredImage || article.image}
        ogType="article"
        publishedTime={article.publishedDate ? `${article.publishedDate}T08:00:00+00:00` : undefined}
        modifiedTime={article.publishedDate ? `${article.publishedDate}T08:00:00+00:00` : undefined}
        authorName={article.author.name}
        jsonLd={jsonLdData}
      />

      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-label-mono text-[#7b7486] flex-wrap">
          <Link
            to="/"
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/blog"
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#1a1c1e] font-semibold truncate max-w-[200px] sm:max-w-xs">
            {article.title}
          </span>
        </nav>
      </div>

      {/* Main Article Container */}
      <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
        {/* Article Header */}
        <header className="mb-8 md:mb-10 text-left">
          {/* Category Badge */}
          <div className="mb-4">
            <Link
              to={`/blog?category=${encodeURIComponent(article.category)}`}
              className="inline-block px-3 py-1 bg-[#eaddff] text-[#8E55FD] font-label-mono text-xs font-bold uppercase tracking-wider rounded shadow-2xs hover:bg-[#8E55FD] hover:text-white transition-colors"
            >
              {article.category}
            </Link>
          </div>

          {/* H1 Article Title */}
          <h1 className="font-headline-lg font-bold text-3xl sm:text-4xl md:text-[42px] leading-tight md:leading-[1.15] text-[#1a1c1e] mb-5 tracking-[-0.02em]">
            {article.title}
          </h1>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#ccc3d7]/60 text-xs sm:text-sm font-label-mono text-[#7b7486]">
            <div className="flex items-center gap-3">
              {article.author.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#ccc3d7]"
                  loading="lazy"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#eaddff] text-[#8E55FD] font-bold flex items-center justify-center text-sm">
                  {article.author.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-title-md font-bold text-[#1a1c1e] text-sm">
                  {article.author.name}
                </div>
                <div className="text-xs text-[#7b7486] font-body-md">
                  {article.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs font-label-mono text-[#7b7486]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                {article.publishedDate || article.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {article.readingTime || article.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Main Article Image */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-10 shadow-md border border-[#ccc3d7] bg-black">
          <img
            src={article.featuredImage || article.image}
            alt={article.title}
            className="w-full h-auto max-h-[500px] object-cover"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Lead Excerpt Callout */}
        <div className="bg-white rounded-xl border-l-4 border-[#8E55FD] border-y border-r border-[#ccc3d7] p-5 sm:p-6 mb-8 shadow-xs">
          <p className="font-body-lg text-lg sm:text-xl text-[#1a1c1e] italic font-medium leading-relaxed">
            &ldquo;{article.excerpt}&rdquo;
          </p>
        </div>

        {/* Article Body Content */}
        <div className="article-body bg-white rounded-2xl border border-[#ccc3d7] p-6 sm:p-8 md:p-10 shadow-xs mb-12">
          <div className="prose max-w-none text-[#4a4455]">
            {renderFormattedContent(article.content)}
          </div>

          {/* Internal Navigation Links & Recommendation Callout */}
          <div className="mt-10 pt-8 border-t border-[#eeedf0] bg-[#faf9fc] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 md:-mx-10 md:-mb-10 p-6 sm:p-8 rounded-b-2xl">
            <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8E55FD]">travel_explore</span>
              Continue Exploring TravelGeared
            </h3>
            <p className="font-body-md text-sm text-[#4a4455] mb-4">
              Explore our curated hardware collections and lab-tested recommendations to complement your transit setup:
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                to="/category/travel-backpacks"
                className="px-3.5 py-1.5 bg-white border border-[#ccc3d7] rounded font-title-md text-xs font-semibold text-[#1a1c1e] hover:border-[#8E55FD] hover:text-[#8E55FD] transition-colors"
              >
                Travel Backpacks Collection &rarr;
              </Link>
              <Link
                to="/category/luggage-carry-ons"
                className="px-3.5 py-1.5 bg-white border border-[#ccc3d7] rounded font-title-md text-xs font-semibold text-[#1a1c1e] hover:border-[#8E55FD] hover:text-[#8E55FD] transition-colors"
              >
                Carry-On Luggage &rarr;
              </Link>
              <Link
                to="/category/travel-organizers"
                className="px-3.5 py-1.5 bg-white border border-[#ccc3d7] rounded font-title-md text-xs font-semibold text-[#1a1c1e] hover:border-[#8E55FD] hover:text-[#8E55FD] transition-colors"
              >
                Packing Cubes & Organizers &rarr;
              </Link>
              <Link
                to="/category/travel-tech-gadgets"
                className="px-3.5 py-1.5 bg-white border border-[#ccc3d7] rounded font-title-md text-xs font-semibold text-[#1a1c1e] hover:border-[#8E55FD] hover:text-[#8E55FD] transition-colors"
              >
                Travel Tech & Gadgets &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Equipment Mentioned */}
        {featuredProductsList.length > 0 && (
          <section className="mb-14 bg-white rounded-2xl border border-[#ccc3d7] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#eeedf0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8E55FD]">verified</span>
                <h3 className="font-headline-lg font-bold text-xl text-[#1a1c1e]">
                  Featured Gear Mentioned in this Guide
                </h3>
              </div>
              <span className="text-xs font-label-mono text-[#7b7486]">
                Tested by TravelGeared
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProductsList.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#eeedf0] hover:border-[#8E55FD] bg-[#faf9fc] hover:bg-white transition-all group shadow-2xs"
                >
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-[#eeedf0] shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-label-mono text-[#7b7486] uppercase block">
                      {product.categoryName}
                    </span>
                    <h4 className="font-title-md font-bold text-sm sm:text-base text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#4a4455] line-clamp-1 mt-0.5">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-title-md font-bold text-sm text-[#1a1c1e]">
                        ${product.price}
                      </span>
                      {onSelectProduct ? (
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="text-xs font-title-md font-semibold text-[#8E55FD] hover:text-[#7232E7] cursor-pointer"
                        >
                          Quick Specs &rarr;
                        </button>
                      ) : (
                        <Link
                          to={`/category/${product.categoryId.replace('cat-', '')}`}
                          className="text-xs font-title-md font-semibold text-[#8E55FD] hover:text-[#7232E7]"
                        >
                          View Gear &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles Section (Exact existing card design preserved) */}
        {relatedArticles.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-lg font-bold text-2xl text-[#1a1c1e]">
                Related Guides &amp; Articles
              </h3>
              <Link
                to="/blog"
                className="font-label-mono text-xs font-bold uppercase tracking-wider text-[#8E55FD] hover:text-[#7232E7] inline-flex items-center gap-1"
              >
                All Articles
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="group bg-white rounded-xl border border-[#ccc3d7] overflow-hidden hover:border-[#8E55FD] hover-lift transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xs"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={rel.featuredImage || rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="font-label-mono text-[11px] font-bold uppercase bg-white/90 backdrop-blur-xs text-[#8E55FD] px-2.5 py-0.5 rounded shadow-2xs">
                        {rel.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-label-mono text-[#7b7486] mb-2">
                        <span>{rel.publishedDate || rel.publishDate}</span>
                        <span>•</span>
                        <span>{rel.readingTime || rel.readTime}</span>
                      </div>
                      <h4 className="font-title-md font-bold text-base text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors mb-2 leading-snug line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="font-body-md text-xs text-[#4a4455] leading-relaxed line-clamp-2 mb-4">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 font-label-mono text-xs font-bold uppercase tracking-wider text-[#8E55FD] group-hover:text-[#7232E7] transition-colors pt-2 border-t border-[#eeedf0]">
                      READ GUIDE
                      <span className="material-symbols-outlined text-sm icon-slide-right">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog CTA */}
        <div className="text-center pt-6 pb-8 border-t border-[#ccc3d7]/60">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#ccc3d7] hover:border-[#8E55FD] hover:text-[#8E55FD] text-[#1a1c1e] font-title-md text-sm font-semibold rounded-lg transition-all shadow-2xs"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to All Travel Insights &amp; Guides
          </Link>
        </div>
      </article>
    </div>
  );
};
