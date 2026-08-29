import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Article, Product } from '../../types';
import { PRODUCTS } from '../../data/products';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen || !article) return null;

  const relatedProducts = (article.featuredProducts || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col max-h-[92vh] text-[#1a1c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Header */}
        <div className="relative h-60 sm:h-72 md:h-84 bg-[#141218] shrink-0">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
            onError={(e) => {
              const target = e.currentTarget;
              if (article.id === 'art-tech-organizers') {
                target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTmIF9yEPMuZ8M4ReWgUABOYB5p4Ljz9pZdFHidgG5kmf3R-xtAMVxW5zW6tTJjhjhX07pZVt2tb_QJWWKBgNjgQfmfHWGNyBUZq4vHs3_sfEwkfB-E1_eChVq6WJfV9r2UoUSwRbyWXUozt7mBQccQzhY2AiR226vjuP-t1lwSbs-Co4DvoGcuscgCQB0ZJMy8xERO7UJNB_1kXowcjFP8hhVXRv6ISTBOTaYeJAU0NueJ8bbRZJKyw';
              } else if (article.id === 'art-one-bag-life') {
                target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm99hPX7pBgs3XKZjyyGD6AfjL0p0TXKUr-jC2bkFc8Iyp4K2I1UG_L_H1gVVT4ItAG5tJBjX07up-HOgt8l2cdbOhhuxh0LJaWVWPSfG2WPZjKH5LDE52wkWodoykxvvDs4P36nC8nJw5fm3_xKthYLau-qlcnoOyBtykWV1nBUF3VQ4cogKEHcC7ITJnU0-9GQn6sHmq9JRldDN6Gf9pEMkqXTCVJmKi6CJlDrJ3kAyak6WzCFNBqg';
              }
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#141218] via-[#141218]/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-all cursor-pointer shadow-md"
            aria-label="Close article"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>

          <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-8 right-5 sm:right-8 text-white">
            <span className="inline-block px-3 py-1 bg-[#8E55FD] text-white font-label-mono text-xs font-bold rounded mb-2.5 uppercase tracking-wider shadow-xs">
              {article.tag}
            </span>
            <h2 className="font-headline-lg font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight text-white drop-shadow-sm">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#e3e2e5] mt-2.5 font-label-mono">
              <span className="font-semibold text-white">By {article.author.name}</span>
              <span className="text-[#a59eb2]">({article.author.role})</span>
              <span>•</span>
              <span>{article.publishDate}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-6">
          {/* Excerpt Lead */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#f5effb] border-l-4 border-[#8E55FD] text-[#342e3d]">
            <p className="text-base sm:text-lg font-body-lg font-medium leading-relaxed italic">
              &ldquo;{article.excerpt}&rdquo;
            </p>
          </div>

          {/* Markdown Rendered Content */}
          <div className="prose max-w-none text-[#332f38] font-body-md text-sm sm:text-base leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-headline-lg font-bold text-2xl sm:text-3xl text-[#1a1c1e] mt-8 mb-4 border-b border-[#eeedf0] pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-headline-lg font-bold text-xl sm:text-2xl text-[#8E55FD] mt-8 mb-3.5">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-headline-lg font-bold text-lg sm:text-xl text-[#1a1c1e] mt-6 mb-3">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="font-title-md font-bold text-base sm:text-lg text-[#8E55FD] mt-6 mb-2">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="font-body-md text-[#4a4455] leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-[#1a1c1e]">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1.5 mb-5 text-[#4a4455] pl-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1.5 mb-5 text-[#4a4455] pl-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="font-body-md leading-relaxed">
                    {children}
                  </li>
                ),
                hr: () => (
                  <hr className="my-6 border-[#e8e4ee]" />
                ),
                blockquote: ({ children }) => (
                  <blockquote className="p-4 my-4 rounded-lg bg-[#faf9fc] border-l-4 border-[#8E55FD] italic text-[#4a4455]">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 rounded-xl border border-[#ccc3d7] shadow-2xs">
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
                  <th className="px-3.5 py-3 border-b border-[#ccc3d7] font-bold text-[#4527a0]">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3.5 py-2.5 border-b border-[#eeedf0] font-body-md text-[#332f38]">
                    {children}
                  </td>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-[#faf9fc] transition-colors">
                    {children}
                  </tr>
                ),
                img: ({ src, alt }) => (
                  <span className="block my-6 rounded-xl overflow-hidden border border-[#ccc3d7] shadow-sm">
                    <img
                      src={src}
                      alt={alt || ''}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[420px] object-cover block"
                    />
                    {alt && (
                      <span className="block text-center text-xs font-label-mono text-[#7b7486] py-2 bg-[#faf9fc]">
                        {alt}
                      </span>
                    )}
                  </span>
                ),
                a: ({ href, children }) => {
                  const isBuyButton = typeof children === 'string' && children.toUpperCase().includes('BUY NOW');
                  if (isBuyButton) {
                    return (
                      <a
                        href={href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 my-2 bg-[#8E55FD] hover:bg-[#7232E7] text-white font-title-md text-xs sm:text-sm font-bold rounded-lg transition-all shadow-xs hover:shadow hover:scale-[1.02] cursor-pointer"
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

          {/* Featured Gear In This Guide */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#eeedf0]">
              <h4 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8E55FD]">verified</span>
                Featured Equipment in This Review
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-[#eeedf0] hover:border-[#8E55FD] bg-[#faf9fc] cursor-pointer transition-all shadow-2xs hover:shadow-xs"
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                  >
                    <img
                      src={p.featuredImage}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-title-md text-sm font-semibold text-[#1a1c1e] truncate">
                        {p.name}
                      </h5>
                      <span className="text-xs text-[#8E55FD] font-bold">
                        ${p.price} • View Specs &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#eeedf0] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#7b7486]">
            <span>Editorial Review by TravelGeared Research Lab • Updated 2026</span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#8E55FD] text-white font-title-md font-bold rounded-lg hover:bg-[#7232E7] transition-all cursor-pointer shadow-xs"
            >
              Close Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

