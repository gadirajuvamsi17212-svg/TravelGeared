import React, { useState } from 'react';
import { Product } from '../../types';
import { AFFILIATE_DISCLOSURE_SHORT } from '../../data/affiliate';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  isSaved = false,
  onToggleSave,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights' | 'retailers'>('retailers');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !product) return null;

  const currentImg = selectedImage || product.featuredImage;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `?product=${product.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col md:flex-row max-h-[90vh] text-[#1a1c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Product Image & Gallery */}
        <div className="md:w-1/2 p-6 bg-[#faf9fc] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#eeedf0]">
          <div className="relative rounded-lg overflow-hidden bg-[#e3e2e5] aspect-4/3 mb-4 flex items-center justify-center">
            <img
              src={currentImg}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-[#8E55FD] text-white text-xs font-label-mono px-2.5 py-1 rounded-full font-medium shadow-sm">
              {product.categoryName}
            </span>
          </div>

          {/* Additional details */}
          <div className="bg-white p-3 rounded-lg border border-[#eeedf0] flex items-center justify-between text-xs text-[#7b7486]">
            <span>SKU: {product.sku}</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-700 inline-block"></span> Verified In Stock
            </span>
          </div>
        </div>

        {/* Right: Product Info & Affiliate Rates */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div>
            {/* Header & Close */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  <span className="material-symbols-outlined icon-fill text-sm">star</span>
                  <span className="font-bold text-sm text-[#1a1c1e]">{product.rating}</span>
                  <span className="text-xs text-[#7b7486]">({product.reviewCount} verified ratings)</span>
                </div>
                <h3 className="font-headline-lg font-bold text-2xl text-[#8E55FD] leading-tight">
                  {product.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-[#7b7486] hover:text-[#1a1c1e] hover:bg-[#f4f3f6]"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Price Tag */}
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-3xl font-bold font-headline-lg text-[#1a1c1e]">
                {product.currency}{product.price}
              </span>
              {product.regularPrice && (
                <span className="text-base text-[#7b7486] line-through">
                  {product.currency}{product.regularPrice}
                </span>
              )}
            </div>

            <p className="font-body-md text-sm text-[#4a4455] mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Tabs */}
            <div className="flex border-b border-[#eeedf0] mb-4 text-xs font-label-mono">
              <button
                onClick={() => setActiveTab('retailers')}
                className={`pb-2 px-3 transition-colors ${
                  activeTab === 'retailers'
                    ? 'border-b-2 border-[#8E55FD] text-[#8E55FD] font-bold'
                    : 'text-[#7b7486] hover:text-[#1a1c1e]'
                }`}
              >
                Buy / Compare Stores ({product.affiliateLinks.length})
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 px-3 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-[#8E55FD] text-[#8E55FD] font-bold'
                    : 'text-[#7b7486] hover:text-[#1a1c1e]'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('highlights')}
                className={`pb-2 px-3 transition-colors ${
                  activeTab === 'highlights'
                    ? 'border-b-2 border-[#8E55FD] text-[#8E55FD] font-bold'
                    : 'text-[#7b7486] hover:text-[#1a1c1e]'
                }`}
              >
                Key Highlights
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'retailers' && (
              <div className="space-y-3">
                {product.affiliateLinks.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#eeedf0] hover:border-[#8E55FD] bg-[#faf9fc] hover:bg-white transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-md font-semibold text-sm text-[#1a1c1e]">
                          {link.retailer}
                        </span>
                        {link.badge && (
                          <span className="text-[10px] font-label-mono px-2 py-0.5 bg-[#eaddff] text-[#8E55FD] rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#7b7486]">
                        {link.inStock ? 'Ready for shipment' : 'Backorder'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-title-md font-bold text-base text-[#1a1c1e]">
                        {product.currency}{link.price}
                      </span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1 px-4 py-2 bg-[#8E55FD] text-white font-title-md text-xs font-semibold rounded hover:bg-[#7232E7] transition-colors btn-lift shadow-xs"
                      >
                        Visit Store
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-2 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-[#f4f3f6]">
                    <span className="text-[#7b7486] font-medium">{key}</span>
                    <span className="text-[#1a1c1e] font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'highlights' && (
              <ul className="space-y-2 text-xs text-[#4a4455]">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#8E55FD] text-sm mt-0.5">check_circle</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer Actions & Disclosure */}
          <div className="mt-6 pt-4 border-t border-[#eeedf0]">
            <div className="flex items-center gap-3 mb-3">
              {onToggleSave && (
                <button
                  onClick={() => onToggleSave(product.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded border font-body-md text-xs font-semibold transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-[#eaddff] border-[#8E55FD] text-[#8E55FD]'
                      : 'bg-white border-[#ccc3d7] text-[#1a1c1e] hover:bg-[#f4f3f6]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-sm ${isSaved ? 'icon-fill' : ''}`}>
                    favorite
                  </span>
                  {isSaved ? 'Saved in Wishlist' : 'Save to Wishlist'}
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="py-2.5 px-4 rounded border border-[#ccc3d7] hover:bg-[#f4f3f6] text-xs font-semibold flex items-center gap-1"
                title="Copy Product Link"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedLink ? 'done' : 'share'}
                </span>
                {copiedLink ? 'Link Copied' : 'Share'}
              </button>
            </div>
            <p className="text-[11px] text-[#7b7486] leading-tight">
              {AFFILIATE_DISCLOSURE_SHORT}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
