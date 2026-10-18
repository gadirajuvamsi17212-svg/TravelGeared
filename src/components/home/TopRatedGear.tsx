import React from 'react';
import { PRODUCTS } from '../../data/products';
import { Product, PageRoute } from '../../types';

interface TopRatedGearProps {
  onSelectProduct: (product: Product) => void;
  onNavigate?: (route: PageRoute) => void;
  savedProductIds?: string[];
  onToggleSave?: (productId: string) => void;
}

export const TopRatedGear: React.FC<TopRatedGearProps> = ({
  onSelectProduct,
  onNavigate,
  savedProductIds = [],
  onToggleSave,
}) => {
  const topProducts = PRODUCTS.filter((p) => p.isTopRated).slice(0, 3);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="material-symbols-outlined icon-fill text-sm">
          star
        </span>
      );
    }
    if (hasHalf) {
      stars.push(
        <span key="half" className="material-symbols-outlined icon-fill text-sm">
          star_half
        </span>
      );
    }
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <span key={`empty-${i}`} className="material-symbols-outlined text-sm">
          star
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="w-full bg-white py-12 md:py-20 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
          <div>
            <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-[32px] md:leading-[40px] mb-2 text-[#8E55FD]">
              Top-Rated Travel Gear
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#4a4455] max-w-lg leading-relaxed">
              Our most highly recommended essentials for your next journey.
            </p>
          </div>
          <a
            id="view-all-top-gear-link"
            className="inline-flex items-center text-[#8E55FD] font-label-mono text-xs sm:text-[12px] font-semibold uppercase hover:underline group cursor-pointer"
            href="#shop"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View All Top Gear{' '}
            <span className="material-symbols-outlined text-sm ml-1 icon-slide-right">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {topProducts.map((product) => {
            const isSaved = savedProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                id={`product-card-${product.slug}`}
                className="group bg-[#faf9fc] rounded-xl border border-[#ccc3d7] overflow-hidden hover-lift flex flex-col justify-between"
              >
                {/* Product Image Area */}
                <div
                  className="relative h-56 sm:h-64 overflow-hidden bg-[#e3e2e5] cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${product.featuredImage}')` }}
                  />
                  
                  {/* Save to wishlist button */}
                  {onToggleSave && (
                    <button
                      type="button"
                      aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
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

                {/* Product Information */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-[#4a4455] font-body-md text-sm ml-1">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-title-md text-[18px] font-semibold mb-1 text-[#8E55FD] hover:underline cursor-pointer"
                      onClick={() => onSelectProduct(product)}
                    >
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="font-body-md text-sm text-[#4a4455] mb-4 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price & CTA Button */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#eeedf0]">
                    <span className="font-title-md text-[#1a1c1e] font-semibold text-[18px]">
                      {product.currency}{product.price}
                    </span>
                    <button
                      id={`check-price-${product.slug}`}
                      className="px-4 py-2 bg-[#8E55FD] text-white font-body-md text-sm font-medium rounded hover:bg-[#7232E7] btn-lift cursor-pointer shadow-xs"
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
    </section>
  );
};
