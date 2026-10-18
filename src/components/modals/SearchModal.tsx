import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { BLOG_ARTICLES } from '../../data/blogArticles';
import { CATEGORIES } from '../../data/categories';
import { Product, Category } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: Category) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.categoryName.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const matchingArticles = trimmed
    ? BLOG_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmed) ||
          a.excerpt.toLowerCase().includes(trimmed) ||
          a.tag.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const matchingCategories = trimmed
    ? CATEGORIES.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.description?.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col text-[#1a1c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#ccc3d7]/50 gap-3">
          <Search className="w-5 h-5 text-[#8E55FD] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search luggage, tech, backpacks, guides..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1a1c1e] placeholder-[#7b7486] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#7b7486] hover:text-[#1a1c1e] rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 text-[#7b7486] hover:text-[#1a1c1e] bg-[#f2eff6] rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!trimmed && (
            <div className="py-8 text-center text-xs text-[#7b7486]">
              <p className="font-medium text-sm text-[#4a4455] mb-1">
                Search TravelGeared Gear & Guides
              </p>
              <p>Try searching for "backpacks", "audio", "packing cubes", or "luggage"</p>
            </div>
          )}

          {trimmed && (
            <>
              {/* Products */}
              {matchingProducts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E55FD] mb-2 px-1">
                    Products
                  </h4>
                  <div className="space-y-1.5">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 hover:bg-[#f2eff6] rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.featuredImage}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-neutral-100"
                          />
                          <div>
                            <p className="text-sm font-semibold text-[#1a1c1e]">{p.name}</p>
                            <p className="text-xs text-[#7b7486]">{p.categoryName}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#8E55FD]">
                          {p.currency}{p.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {matchingArticles.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E55FD] mb-2 px-1">
                    Articles & Guides
                  </h4>
                  <div className="space-y-1.5">
                    {matchingArticles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          navigate(`/blog/${a.slug}`);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 hover:bg-[#f2eff6] rounded-xl cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#1a1c1e] line-clamp-1">{a.title}</p>
                          <p className="text-xs text-[#7b7486]">{a.tag} • {a.readTime}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8E55FD] shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {matchingCategories.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E55FD] mb-2 px-1">
                    Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchingCategories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCategory(c);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-[#f2eff6] hover:bg-[#8E55FD] hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingProducts.length === 0 &&
                matchingArticles.length === 0 &&
                matchingCategories.length === 0 && (
                  <div className="py-8 text-center text-sm text-[#7b7486]">
                    No matching results found for "{query}".
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
