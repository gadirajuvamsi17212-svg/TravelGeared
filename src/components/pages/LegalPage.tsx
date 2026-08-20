import React from 'react';
import { Link } from 'react-router-dom';
import { AFFILIATE_DISCLOSURE_FULL } from '../../data/affiliate';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="w-full bg-[#faf9fc] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-label-mono text-[#7b7486] mb-6">
          <Link
            to="/"
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Home
          </Link>
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
            Last updated: August 2026
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

                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mt-6">
                  3. Contact Us
                </h3>
                <p>
                  If you have any questions regarding our privacy practices, please contact us at <a href="mailto:privacy@travelgeared.com" className="text-[#8E55FD] underline font-medium">privacy@travelgeared.com</a>.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mt-6">
                  1. Terms of Use
                </h3>
                <p>
                  By accessing TravelGeared, you agree to comply with our Terms of Service. All content, recommendations, and reviews are provided for informational and editorial guidance.
                </p>

                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mt-6">
                  2. Product Availability &amp; Pricing
                </h3>
                <p>
                  Prices, specifications, and availability of products featured on TravelGeared are subject to change by respective retailers. We recommend verifying details directly on the merchant checkout page.
                </p>

                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] mt-6">
                  3. Intellectual Property
                </h3>
                <p>
                  All articles, comparisons, and custom photography on TravelGeared are copyrighted. Reproduction without written consent is strictly prohibited.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
