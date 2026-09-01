import React, { useState } from 'react';
import { Category, Product, PageRoute } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { useMetaRobots } from '../../hooks/useMetaRobots';

interface CategoryPageProps {
  categorySlug?: string;
  onSelectProduct: (product: Product) => void;
  onNavigate: (route: PageRoute, slug?: string) => void;
  savedProductIds?: string[];
  onToggleSave?: (productId: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  onSelectProduct,
  onNavigate,
  savedProductIds = [],
  onToggleSave,
}) => {
  useMetaRobots('noindex, follow');
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const currentCategory: Category =
    CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];

  // Filter products by category or show related if few
  let categoryProducts = PRODUCTS.filter((p) => p.categoryId === currentCategory.id);
  if (categoryProducts.length === 0) {
    categoryProducts = PRODUCTS.slice(0, 3);
  }

  // Sort
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (selectedSort === 'price-low') return a.price - b.price;
    if (selectedSort === 'price-high') return b.price - a.price;
    if (selectedSort === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="w-full bg-[#faf9fc] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-label-mono text-[#7b7486] mb-6 flex-wrap">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Travel Gear
          </button>
          <span>/</span>
          <span className="text-[#1a1c1e] font-semibold">{currentCategory.name}</span>
        </div>

        {/* Category Header Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 md:mb-10 bg-[#141223] text-white p-6 sm:p-8 md:p-12 shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: `url('${currentCategory.image}')` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-transparent" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#8E55FD] text-white text-xs font-label-mono rounded-full mb-3 uppercase tracking-wider">
              Category Collection
            </span>
            <h1 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-4xl mb-3">
              {currentCategory.name}
            </h1>
            <p className="font-body-md text-[#e3e2e5] text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              {currentCategory.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-label-mono text-white/80 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#8E55FD]">verified</span>
                Lab Tested &amp; Field Evaluated
              </span>
              <span>•</span>
              <span>{currentCategory.itemCount} Curated Models</span>
            </div>
          </div>
        </div>

        {/* Categories Quick Switch Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigate('category', c.slug)}
              className={`px-4 py-2 rounded-full text-xs font-title-md font-semibold whitespace-nowrap transition-all cursor-pointer ${
                c.slug === currentCategory.slug
                  ? 'bg-[#8E55FD] text-white shadow-xs'
                  : 'bg-white text-[#4a4455] border border-[#ccc3d7] hover:border-[#8E55FD] hover:text-[#8E55FD]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Filter / Sort Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-[#eeedf0] mb-8">
          <span className="text-sm font-body-md text-[#4a4455]">
            Showing <strong className="text-[#1a1c1e]">{sortedProducts.length}</strong> top-rated recommendations
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-label-mono text-[#7b7486]">Sort by:</label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="text-xs font-title-md bg-[#faf9fc] border border-[#ccc3d7] rounded px-3 py-1.5 outline-hidden focus:border-[#8E55FD]"
            >
              <option value="featured">Featured &amp; Editor Choice</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sortedProducts.map((product) => {
            const isSaved = savedProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl border border-[#ccc3d7] overflow-hidden hover-lift flex flex-col justify-between shadow-xs"
              >
                <div
                  className="relative h-56 sm:h-64 overflow-hidden bg-[#e3e2e5] cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${product.featuredImage}')` }}
                  />
                  {onToggleSave && (
                    <button
                      type="button"
                      aria-label="Save item"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#4a4455] hover:text-[#8E55FD] shadow-xs transition-colors cursor-pointer z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(product.id);
                      }}
                    >
                      <span className={`material-symbols-outlined text-[20px] ${isSaved ? 'icon-fill text-[#8E55FD]' : ''}`}>
                        favorite
                      </span>
                    </button>
                  )}
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      <span className="material-symbols-outlined icon-fill text-sm">star</span>
                      <span className="text-[#4a4455] font-body-md text-sm font-semibold ml-1">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>

                    <h3
                      className="font-title-md text-[18px] font-semibold mb-1 text-[#8E55FD] hover:underline cursor-pointer"
                      onClick={() => onSelectProduct(product)}
                    >
                      {product.name}
                    </h3>

                    <p className="font-body-md text-sm text-[#4a4455] mb-4 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#eeedf0]">
                    <span className="font-title-md text-[#1a1c1e] font-semibold text-[18px]">
                      {product.currency}{product.price}
                    </span>
                    <button
                      className="px-4 py-2 bg-[#8E55FD] text-white font-body-md text-sm font-medium rounded hover:bg-[#7232E7] btn-lift cursor-pointer"
                      onClick={() => onSelectProduct(product)}
                    >
                      Check Price
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
