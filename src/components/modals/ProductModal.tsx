import React from 'react';
import { Product } from '../../types';
import { SITE_CONFIG } from '../../data/siteConfig';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleSave?: (productId: string) => void;
  isSaved?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onToggleSave,
  isSaved = false,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col max-h-[92vh] text-[#1a1c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-[#faf9fc] border-b border-[#eeedf0] p-4 sm:p-6 flex items-start justify-between">
          <div className="pr-8">
            <span className="inline-block px-2.5 py-1 bg-[#f5effb] text-[#8E55FD] text-xs font-label-mono font-semibold rounded uppercase tracking-wider mb-2">
              {product.categoryName}
            </span>
            <h2 className="font-headline-lg font-bold text-xl sm:text-2xl text-[#1a1c1e]">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-amber-500">
                <span className="material-symbols-outlined icon-fill text-sm">star</span>
                <span className="text-[#4a4455] font-body-md text-xs sm:text-sm font-semibold ml-1">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <span className="text-[#ccc3d7]">•</span>
              <span className="text-xs font-label-mono text-[#7b7486]">
                SKU: {product.sku}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 text-[#4a4455] transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image */}
            <div className="rounded-xl overflow-hidden bg-[#f4f3f6] border border-[#eeedf0] aspect-4/3 flex items-center justify-center">
              <img
                src={product.featuredImage}
                alt={product.name}
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Price & Summary */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-headline-lg text-3xl font-bold text-[#1a1c1e]">
                    {product.currency}{product.price}
                  </span>
                  {product.regularPrice && (
                    <span className="text-sm line-through text-[#7b7486]">
                      {product.currency}{product.regularPrice}
                    </span>
                  )}
                  {product.inStock && (
                    <span className="ml-auto text-xs font-label-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      In Stock
                    </span>
                  )}
                </div>

                <p className="font-body-md text-sm text-[#4a4455] leading-relaxed mb-6">
                  {product.description || product.shortDescription}
                </p>
              </div>

              {/* Affiliate Buy Options */}
              <div className="bg-[#fcfaff] p-4 rounded-xl border border-[#eaddff]">
                <h4 className="font-title-md text-xs font-bold uppercase tracking-wider text-[#8E55FD] mb-3">
                  Check Current Pricing &amp; Availability:
                </h4>
                <div className="space-y-2">
                  {product.affiliateLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#ccc3d7] hover:border-[#8E55FD] hover:bg-[#faf9fc] transition-all group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-title-md text-sm font-semibold text-[#1a1c1e] group-hover:text-[#8E55FD]">
                          {link.retailer}
                        </span>
                        {link.badge && (
                          <span className="text-[10px] font-label-mono bg-[#8E55FD] text-white px-1.5 py-0.5 rounded font-semibold">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-md text-sm font-bold text-[#1a1c1e]">
                          {product.currency}{link.price}
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#8E55FD]">
                          open_in_new
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
                <p className="text-[11px] font-body-md text-[#7b7486] mt-3 italic leading-tight">
                  {SITE_CONFIG.affiliateDisclosure}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div>
              <h3 className="font-title-md text-base font-bold text-[#1a1c1e] mb-3">
                Key Engineered Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-[#4a4455] bg-[#faf9fc] p-3 rounded-lg border border-[#eeedf0]"
                  >
                    <span className="material-symbols-outlined text-[#8E55FD] text-base shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h3 className="font-title-md text-base font-bold text-[#1a1c1e] mb-3">
                Technical Specifications
              </h3>
              <div className="border border-[#eeedf0] rounded-xl overflow-hidden text-sm divide-y divide-[#eeedf0]">
                {Object.entries(product.specs).map(([label, value], idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row py-2.5 px-4 bg-white sm:even:bg-[#faf9fc]">
                    <span className="font-semibold text-[#1a1c1e] sm:w-1/3 shrink-0">{label}</span>
                    <span className="text-[#4a4455]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
