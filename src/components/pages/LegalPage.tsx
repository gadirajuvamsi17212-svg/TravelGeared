import React from 'react';
import { PageRoute } from '../../types';
import { AFFILIATE_DISCLOSURE_FULL } from '../../data/affiliate';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (route: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="w-full bg-[#faf9fc] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-label-mono text-[#7b7486] mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#1a1c1e] font-semibold">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#ccc3d7] p-8 md:p-12 shadow-xs space-y-6">
          <h1 className="font-headline-lg font-bold text-3xl text-[#8E55FD]">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service & Affiliate Disclosure'}
          </h1>
          <p className="text-xs font-label-mono text-[#7b7486]">
            Last updated: August 2024
          </p>

          <div className="prose text-[#4a4455] font-body-md text-sm leading-relaxed space-y-4">
            <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e]">
              Affiliate Relationship Disclosure
            </h3>
            <p className="bg-[#eaddff]/40 p-4 rounded border-l-4 border-[#8E55FD] text-[#1a1c1e] font-medium">
              {AFFILIATE_DISCLOSURE_FULL}
            </p>

            {isPrivacy ? (
              <>
                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mt-6">
                  1. Information We Collect
                </h3>
                <p>
                  TravelGeared respects your privacy. We collect minimal personal information solely necessary to deliver newsletters and improve site navigation experience. We do not sell, rent, or distribute personal information to third parties.
                </p>

                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mt-6">
                  2. Cookies &amp; Outbound Tracking
                </h3>
                <p>
                  When you click retailer links on TravelGeared, merchant sites (including Amazon, REI, and manufacturer partners) may place affiliate tracking cookies on your device to attribute referral credits.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mt-6">
                  1. Use of Content
                </h3>
                <p>
                  All reviews, editorial evaluations, photography, and guide frameworks published on TravelGeared are protected by international copyright laws. Unauthorized reproduction is strictly prohibited.
                </p>

                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mt-6">
                  2. Price &amp; Specification Accuracy
                </h3>
                <p>
                  While we endeavor to maintain real-time price accuracy, retailer prices and inventory availability fluctuate independently. Always verify final figures on the merchant&apos;s checkout page.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
