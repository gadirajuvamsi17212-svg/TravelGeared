import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';

export const TopRatedGear: React.FC = () => {
  const topProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="w-full bg-[#f4f3f6] py-12 md:py-20 lg:py-24 border-y border-[#e3e2e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-4">
          <div>
            <span className="font-label-mono text-xs uppercase tracking-wider text-[#8E55FD] font-semibold mb-2 block">
              Tested & Proven
            </span>
            <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-[32px] text-[#1a1c1e]">
              Top Rated Travel Gear
            </h2>
          </div>
          <Link
            to="/guides"
            className="inline-flex items-center gap-1.5 font-title-md text-sm font-semibold text-[#8E55FD] hover:text-[#7a42ea] transition-colors"
          >
            <span>See all recommendations</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-[#ccc3d7] overflow-hidden hover:border-[#8E55FD] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#faf9fc] p-4 flex items-center justify-center">
                <img
                  src={product.featuredImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 right-2 bg-[#f5effb] text-[#8E55FD] font-label-mono text-[11px] font-bold px-2 py-0.5 rounded">
                  ★ {product.rating}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#7b7486] font-label-mono font-medium block mb-1">
                    {product.categoryName}
                  </span>
                  <h3 className="font-title-md font-bold text-base text-[#1a1c1e] line-clamp-1 mb-2">
                    {product.name}
                  </h3>
                  <p className="font-body-md text-xs text-[#4a4455] line-clamp-2 leading-relaxed mb-4">
                    {product.shortDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#eeedf0] flex items-center justify-between">
                  <span className="font-label-mono font-bold text-base text-[#1a1c1e]">
                    ${product.price}
                  </span>
                  <a
                    href={product.affiliateLinks[0]?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#8E55FD] text-white text-xs font-semibold hover:bg-[#7a42ea] transition-colors"
                  >
                    <span>Check Price</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
