import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { ARTICLES } from '../../data/articles';
import { CATEGORIES } from '../../data/categories';
import { Product, Article, Category } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectArticle?: (article: Article) => void;
  onSelectCategory: (category: Category) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'products' | 'guides' | 'categories'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.tag.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults =
    (filterType === 'all' && (filteredProducts.length > 0 || filteredArticles.length > 0 || filteredCategories.length > 0)) ||
    (filterType === 'products' && filteredProducts.length > 0) ||
    (filterType === 'guides' && filteredArticles.length > 0) ||
    (filterType === 'categories' && filteredCategories.length > 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-[#eeedf0] gap-3">
          <span className="material-symbols-outlined text-[#8E55FD]">search</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 text-base text-[#1a1c1e] placeholder:text-[#7b7486] outline-hidden font-body-md"
            placeholder="Search gear, categories, guides, reviews..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#7b7486] hover:text-[#1a1c1e] text-xs p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#7b7486] hover:text-[#1a1c1e] hover:bg-[#eeedf0]"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 px-4 py-2 bg-[#faf9fc] border-b border-[#eeedf0] text-xs font-label-mono overflow-x-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full transition-colors ${
              filterType === 'all' ? 'bg-[#8E55FD] text-white font-bold' : 'bg-[#e3e2e5] text-[#4a4455] hover:bg-[#ccc3d7]'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setFilterType('products')}
            className={`px-3 py-1 rounded-full transition-colors ${
              filterType === 'products' ? 'bg-[#8E55FD] text-white font-bold' : 'bg-[#e3e2e5] text-[#4a4455] hover:bg-[#ccc3d7]'
            }`}
          >
            Gear ({filteredProducts.length})
          </button>
          <button
            onClick={() => setFilterType('guides')}
            className={`px-3 py-1 rounded-full transition-colors ${
              filterType === 'guides' ? 'bg-[#8E55FD] text-white font-bold' : 'bg-[#e3e2e5] text-[#4a4455] hover:bg-[#ccc3d7]'
            }`}
          >
            Guides & Reviews ({filteredArticles.length})
          </button>
          <button
            onClick={() => setFilterType('categories')}
            className={`px-3 py-1 rounded-full transition-colors ${
              filterType === 'categories' ? 'bg-[#8E55FD] text-white font-bold' : 'bg-[#e3e2e5] text-[#4a4455] hover:bg-[#ccc3d7]'
            }`}
          >
            Categories ({filteredCategories.length})
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4 divide-y divide-[#eeedf0]">
          {!hasResults ? (
            <div className="text-center py-10 text-[#7b7486]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#ccc3d7]">
                inventory_2
              </span>
              <p className="font-body-md text-sm">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#7b7486] mt-1">Try searching for &ldquo;backpack&rdquo;, &ldquo;carry-on&rdquo;, or &ldquo;headphones&rdquo;</p>
            </div>
          ) : (
            <>
              {/* Products Section */}
              {(filterType === 'all' || filterType === 'products') && filteredProducts.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-label-mono uppercase text-[#7b7486] font-semibold mb-2">
                    Travel Gear Products
                  </h4>
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f4f3f6] cursor-pointer group transition-colors"
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                      >
                        <img
                          src={product.featuredImage}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover border border-[#eeedf0]"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-title-md text-sm font-semibold text-[#1a1c1e] group-hover:text-[#8E55FD] truncate">
                            {product.name}
                          </h5>
                          <p className="text-xs text-[#4a4455] truncate">{product.shortDescription}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-title-md font-bold text-sm text-[#1a1c1e]">
                            ${product.price}
                          </span>
                          <span className="block text-[11px] text-amber-500 font-medium">★ {product.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guides / Articles Section */}
              {(filterType === 'all' || filterType === 'guides') && filteredArticles.length > 0 && (
                <div className="pt-3">
                  <h4 className="text-xs font-label-mono uppercase text-[#7b7486] font-semibold mb-2">
                    Guides &amp; Editorial Reviews
                  </h4>
                  <div className="space-y-2">
                    {filteredArticles.map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f4f3f6] cursor-pointer group transition-colors"
                        onClick={() => {
                          navigate(`/blog/${article.slug || article.id}`);
                          onClose();
                        }}
                      >
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-12 h-12 rounded object-cover border border-[#eeedf0]"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="inline-block px-1.5 py-0.5 bg-[#eaddff] text-[#8E55FD] text-[10px] font-label-mono rounded mb-0.5">
                            {article.tag}
                          </span>
                          <h5 className="font-title-md text-sm font-semibold text-[#1a1c1e] group-hover:text-[#8E55FD] truncate">
                            {article.title}
                          </h5>
                          <p className="text-xs text-[#4a4455] truncate">{article.excerpt}</p>
                        </div>
                        <span className="text-xs text-[#7b7486]">{article.readTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Section */}
              {(filterType === 'all' || filterType === 'categories') && filteredCategories.length > 0 && (
                <div className="pt-3">
                  <h4 className="text-xs font-label-mono uppercase text-[#7b7486] font-semibold mb-2">
                    Gear Categories
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center gap-3 p-2 rounded-lg border border-[#eeedf0] hover:border-[#8E55FD] hover:bg-[#faf9fc] cursor-pointer group transition-all"
                        onClick={() => {
                          onSelectCategory(cat);
                          onClose();
                        }}
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <h5 className="font-title-md text-sm font-semibold text-[#1a1c1e] group-hover:text-[#8E55FD]">
                            {cat.name}
                          </h5>
                          <span className="text-[11px] text-[#7b7486]">{cat.itemCount} items</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#f4f3f6] border-t border-[#eeedf0] flex justify-between items-center text-xs text-[#7b7486]">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-[#ccc3d7] rounded text-[10px]">ESC</kbd> to exit</span>
          <span className="font-label-mono text-[11px]">TravelGeared Search Engine</span>
        </div>
      </div>
    </div>
  );
};
