import React from 'react';
import { X, Bookmark, Star, ExternalLink, Check } from 'lucide-react';
import { Product } from '../../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col md:flex-row max-h-[90vh] text-[#1a1c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Product Image */}
        <div className="relative md:w-1/2 bg-[#f2eff6] min-h-[260px] md:min-h-full">
          <img
            src={product.featuredImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="md:hidden absolute top-3 right-3 p-2 bg-white/80 rounded-full text-[#1a1c1e]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-6 md:w-1/2 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#8E55FD] uppercase tracking-wider">
              {product.categoryName}
            </span>
            <button
              onClick={onClose}
              className="hidden md:inline-flex p-1.5 text-[#7b7486] hover:text-[#1a1c1e] hover:bg-[#f2eff6] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="font-bold text-xl sm:text-2xl text-[#1a1c1e] mb-2">
            {product.name}
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              <span className="text-xs font-bold ml-1 text-[#1a1c1e]">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-[#7b7486]">
              ({product.reviewCount} verified reviews)
            </span>
          </div>

          <p className="text-sm text-[#4a4455] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Key Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mb-6 bg-[#f2eff6]/60 p-4 rounded-xl border border-[#ccc3d7]/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4a4455] mb-2.5">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-[#7b7486] block text-[11px]">{key}</span>
                    <span className="font-semibold text-[#1a1c1e]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-auto pt-4 border-t border-[#ccc3d7]/40 flex items-center gap-3">
            <button
              onClick={() => onToggleSave(product.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-xs transition-colors cursor-pointer ${
                isSaved
                  ? 'border-[#8E55FD] bg-[#8E55FD]/10 text-[#8E55FD]'
                  : 'border-[#ccc3d7] text-[#4a4455] hover:border-[#8E55FD]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {product.affiliateLinks && product.affiliateLinks[0] && (
              <a
                href={product.affiliateLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#8E55FD] hover:bg-[#7b42ea] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <span>Buy for {product.currency}{product.price}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
