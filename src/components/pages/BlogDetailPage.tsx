import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BLOG_ARTICLES } from '../../data/blogArticles';
import { ARTICLES } from '../../data/articles';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { useMetaRobots } from '../../hooks/useMetaRobots';

interface BlogDetailPageProps {
  onSelectProduct?: (product: Product) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ onSelectProduct }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article =
    BLOG_ARTICLES.find((a) => a.slug === slug || a.id === slug) ||
    ARTICLES.find((a) => a.slug === slug || a.id === slug);

  // Only /blog/best-backpacks-for-2026 is indexable; all temporary blog articles receive noindex, follow
  const isApprovedArticle =
    slug === 'best-backpacks-for-2026' ||
    article?.slug === 'best-backpacks-for-2026' ||
    article?.id === 'art-best-backpacks-2026' ||
    article?.id === 'blog-best-backpacks-2026';

  useMetaRobots(isApprovedArticle ? 'index, follow' : 'noindex, follow');

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex p-4 rounded-full bg-[#f5effb] text-[#8E55FD] mb-4">
          <span className="material-symbols-outlined text-4xl">article</span>
        </div>
        <h1 className="font-headline-lg text-3xl font-bold text-[#1a1c1e] mb-3">
          Article Not Found
        </h1>
        <p className="text-[#4a4455] font-body-md mb-8 max-w-md mx-auto">
          The blog article you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#8E55FD] hover:bg-[#7232E7] text-white font-title-md font-bold rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Blog
        </Link>
      </div>
    );
  }

  const relatedProducts = article.featuredProducts
    ? PRODUCTS.filter((p) => article.featuredProducts?.includes(p.id))
    : [];

  return (
    <article className="min-h-screen bg-[#faf9fc] pb-24 text-[#1a1c1e]">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#eeedf0] bg-white sticky top-16 z-20 backdrop-blur-md bg-white/90">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs sm:text-sm font-label-mono">
          <div className="flex items-center gap-2 text-[#7b7486] truncate">
            <Link to="/" className="hover:text-[#8E55FD] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#8E55FD] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#1a1c1e] font-medium truncate">{article.tag || 'Guide'}</span>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-1.5 text-[#8E55FD] hover:text-[#7232E7] font-semibold transition-colors cursor-pointer shrink-0 ml-4"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span className="hidden sm:inline">All Articles</span>
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <header className="relative w-full bg-[#141218] overflow-hidden">
        {article.image && (
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px]">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#141218] via-[#141218]/60 to-transparent" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 -mt-24 sm:-mt-32 relative z-10 text-white">
          <span className="inline-block px-3.5 py-1.5 bg-[#8E55FD] text-white font-label-mono text-xs font-bold rounded-md mb-4 uppercase tracking-wider shadow-sm">
            {article.tag || article.category}
          </span>
          <h1 className="font-headline-lg font-bold text-2xl sm:text-4xl md:text-5xl leading-tight text-white drop-shadow-sm mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#e3e2e5] font-label-mono pt-4 border-t border-white/15">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#8E55FD]">person</span>
              <span className="font-semibold text-white">{article.author.name}</span>
              <span className="text-[#a59eb2]">({article.author.role})</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#8E55FD]">calendar_today</span>
              <span>{article.publishDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#8E55FD]">schedule</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white rounded-2xl border border-[#ccc3d7] p-6 sm:p-10 md:p-12 shadow-xs space-y-8">
          {/* Excerpt Lead */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#f5effb] border-l-4 border-[#8E55FD] text-[#342e3d]">
            <p className="text-base sm:text-lg font-body-lg font-medium leading-relaxed italic">
              &ldquo;{article.excerpt}&rdquo;
            </p>
          </div>

          {/* Markdown Content */}
          <div className="prose max-w-none text-[#332f38] font-body-md text-sm sm:text-base leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-headline-lg font-bold text-2xl sm:text-3xl text-[#1a1c1e] mt-10 mb-4 border-b border-[#eeedf0] pb-3">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-headline-lg font-bold text-xl sm:text-2xl text-[#8E55FD] mt-10 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-headline-lg font-bold text-lg sm:text-xl text-[#1a1c1e] mt-8 mb-3">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="font-title-md font-bold text-base sm:text-lg text-[#8E55FD] mt-8 mb-2.5">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="font-body-md text-[#4a4455] leading-relaxed mb-5">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-[#1a1c1e]">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-6 text-[#4a4455] pl-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-6 text-[#4a4455] pl-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="font-body-md leading-relaxed">{children}</li>
                ),
                hr: () => <hr className="my-8 border-[#e8e4ee]" />,
                blockquote: ({ children }) => (
                  <blockquote className="p-5 my-6 rounded-xl bg-[#faf9fc] border-l-4 border-[#8E55FD] italic text-[#4a4455]">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8 rounded-xl border border-[#ccc3d7] shadow-xs">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[#f0e7ff] text-[#1a1c1e] font-title-md uppercase font-bold text-[11px] sm:text-xs">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3.5 border-b border-[#ccc3d7] font-bold text-[#4527a0]">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 border-b border-[#eeedf0] font-body-md text-[#332f38]">
                    {children}
                  </td>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-[#faf9fc] transition-colors">{children}</tr>
                ),
                img: ({ src, alt }) => (
                  <span className="block my-8 rounded-xl overflow-hidden border border-[#ccc3d7] shadow-sm">
                    <img
                      src={src}
                      alt={alt || ''}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[520px] object-cover block"
                    />
                    {alt && (
                      <span className="block text-center text-xs font-label-mono text-[#7b7486] py-2.5 bg-[#faf9fc]">
                        {alt}
                      </span>
                    )}
                  </span>
                ),
                a: ({ href, children }) => {
                  const isBuyButton =
                    typeof children === 'string' && children.toUpperCase().includes('BUY NOW');
                  if (isBuyButton) {
                    return (
                      <a
                        href={href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 my-3 bg-[#8E55FD] hover:bg-[#7232E7] text-white font-title-md text-xs sm:text-sm font-bold rounded-lg transition-all shadow-xs hover:shadow-md hover:scale-[1.02] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">shopping_cart</span>
                        {children}
                      </a>
                    );
                  }
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8E55FD] hover:text-[#7232E7] font-semibold underline underline-offset-2"
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Article Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#eeedf0] flex flex-wrap items-center gap-2.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 font-label-mono text-xs font-semibold rounded-md uppercase tracking-wider bg-[#f5effb] text-[#8E55FD] border border-[#e5d5fb] shadow-2xs hover:bg-[#ede3f9] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Featured Equipment Grid */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#eeedf0]">
              <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8E55FD]">verified</span>
                Featured Equipment in This Review
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3.5 p-4 rounded-xl border border-[#eeedf0] hover:border-[#8E55FD] bg-[#faf9fc] cursor-pointer transition-all shadow-2xs hover:shadow-xs"
                    onClick={() => {
                      if (onSelectProduct) onSelectProduct(p);
                    }}
                  >
                    <img
                      src={p.featuredImage}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-title-md text-sm font-semibold text-[#1a1c1e] truncate">
                        {p.name}
                      </h4>
                      <p className="font-label-mono text-xs text-[#8E55FD] font-bold mt-0.5">
                        ${p.price.toFixed(2)}
                      </p>
                      <span className="text-[11px] text-[#7b7486] font-body-sm line-clamp-1 mt-0.5">
                        {p.shortDescription}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-sm text-[#7b7486]">chevron_right</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Back Navigation */}
          <div className="pt-8 border-t border-[#eeedf0] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7b7486]">
            <span>Editorial Review by TravelGeared Research Lab • Updated 2026</span>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8E55FD] text-white font-title-md font-bold rounded-lg hover:bg-[#7232E7] transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
