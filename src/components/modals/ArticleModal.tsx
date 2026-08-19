import React from 'react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col max-h-[90vh] text-[#1a1c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Header */}
        <div className="relative h-64 sm:h-80 bg-black">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
            aria-label="Close article"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 bg-[#8E55FD] text-white font-label-mono text-xs font-semibold rounded mb-2 uppercase">
              {article.tag}
            </span>
            <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl leading-tight">
              {article.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-[#e3e2e5] mt-2">
              <span>By {article.author.name} ({article.author.role})</span>
              <span>•</span>
              <span>{article.publishDate}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          <p className="text-lg font-body-lg text-[#1a1c1e] font-medium leading-relaxed border-l-4 border-[#8E55FD] pl-4 italic">
            &ldquo;{article.excerpt}&rdquo;
          </p>

          <div className="prose max-w-none text-[#4a4455] font-body-md text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {article.content}
          </div>

          {/* Featured Gear In This Guide */}
          {relatedProducts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#eeedf0]">
              <h4 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8E55FD]">verified</span>
                Featured Equipment in This Review
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#eeedf0] hover:border-[#8E55FD] bg-[#faf9fc] cursor-pointer transition-all"
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                  >
                    <img
                      src={p.featuredImage}
                      alt={p.name}
                      className="w-14 h-14 rounded object-cover"
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
          <div className="pt-6 border-t border-[#eeedf0] flex justify-between items-center text-xs text-[#7b7486]">
            <span>Editorial Review by TravelGeared</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#8E55FD] text-white font-title-md rounded hover:bg-[#7232E7] transition-colors"
            >
              Back to Guides
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
