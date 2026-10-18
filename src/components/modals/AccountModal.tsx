import React from 'react';
import { X, Bookmark, Trash2, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProductIds: string[];
  onSelectProduct: (product: Product) => void;
  onRemoveSaved: (productId: string) => void;
  onClearSaved: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  savedProductIds,
  onSelectProduct,
  onRemoveSaved,
  onClearSaved,
}) => {
  if (!isOpen) return null;

  const savedProducts = savedProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col max-h-[85vh] text-[#1a1c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ccc3d7]/40">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#8E55FD] fill-current" />
            <h3 className="font-bold text-lg text-[#1a1c1e]">Saved Travel Gear</h3>
            <span className="text-xs bg-[#f2eff6] text-[#8E55FD] font-bold px-2 py-0.5 rounded-full">
              {savedProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7b7486] hover:text-[#1a1c1e] hover:bg-[#f2eff6] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedProducts.length === 0 ? (
            <div className="text-center py-12 text-[#7b7486]">
              <Bookmark className="w-10 h-10 mx-auto text-[#ccc3d7] mb-3" />
              <p className="font-medium text-sm text-[#1a1c1e] mb-1">
                Your wishlist is empty
              </p>
              <p className="text-xs">
                Save gear you love by tapping the bookmark icon on any item.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#ccc3d7]/50 hover:border-[#8E55FD]/50 bg-white transition-all"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <img
                      src={product.featuredImage}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-neutral-100"
                    />
                    <div>
                      <p className="font-bold text-sm text-[#1a1c1e] hover:text-[#8E55FD] transition-colors line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#7b7486]">{product.categoryName}</p>
                      <span className="text-xs font-bold text-[#8E55FD]">
                        {product.currency}{product.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-2">
                    {product.affiliateLinks && product.affiliateLinks[0] && (
                      <a
                        href={product.affiliateLinks[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-white bg-[#8E55FD] hover:bg-[#7b42ea] rounded-lg transition-colors"
                        title="Buy"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => onRemoveSaved(product.id)}
                      className="p-2 text-[#7b7486] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedProducts.length > 0 && (
          <div className="p-4 border-t border-[#ccc3d7]/40 bg-[#faf9fc] flex items-center justify-between">
            <button
              onClick={onClearSaved}
              className="text-xs text-[#7b7486] hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear all saved items
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1a1c1e] hover:bg-[#333] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
