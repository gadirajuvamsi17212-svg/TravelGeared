import React from 'react';
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

  const savedProducts = PRODUCTS.filter((p) => savedProductIds.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-[#ccc3d7] overflow-hidden flex flex-col max-h-[85vh] text-[#1a1c1e]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eeedf0] bg-[#faf9fc]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8E55FD]">favorite</span>
            <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e]">
              Saved Travel Equipment
            </h3>
            <span className="bg-[#eaddff] text-[#8E55FD] text-xs px-2 py-0.5 rounded-full font-label-mono font-bold">
              {savedProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#7b7486] hover:text-[#1a1c1e]"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto divide-y divide-[#eeedf0]">
          {savedProducts.length === 0 ? (
            <div className="text-center py-12 text-[#7b7486]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#ccc3d7]">
                bookmark_border
              </span>
              <h4 className="font-title-md text-base text-[#1a1c1e] mb-1">No items saved yet</h4>
              <p className="font-body-md text-xs max-w-xs mx-auto">
                Click the heart icon on any gear card to save items for future comparisons and price tracking.
              </p>
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-[#faf9fc] border border-transparent hover:border-[#eeedf0] transition-all"
                >
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover border border-[#eeedf0] cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  />
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  >
                    <h5 className="font-title-md text-sm font-semibold text-[#1a1c1e] hover:text-[#8E55FD] truncate">
                      {product.name}
                    </h5>
                    <span className="text-xs text-[#7b7486]">{product.categoryName}</span>
                    <span className="block font-title-md font-bold text-sm text-[#1a1c1e]">
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 bg-[#8E55FD] text-white text-xs font-semibold rounded hover:bg-[#7232E7] transition-colors"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                    >
                      Compare
                    </button>
                    <button
                      onClick={() => onRemoveSaved(product.id)}
                      className="p-1.5 text-[#7b7486] hover:text-red-600 rounded"
                      title="Remove from saved"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedProducts.length > 0 && (
          <div className="p-4 bg-[#faf9fc] border-t border-[#eeedf0] flex justify-between items-center text-xs">
            <button
              onClick={onClearSaved}
              className="text-[#7b7486] hover:text-red-600 transition-colors"
            >
              Clear All Items
            </button>
            <span className="text-[#7b7486] font-label-mono">
              Saved locally to your browser
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
