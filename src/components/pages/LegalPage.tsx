import React from 'react';
import { useMetaRobots } from '../../hooks/useMetaRobots';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  useMetaRobots('noindex, follow');

  const isPrivacy = type === 'privacy';

  return (
    <div className="w-full bg-[#faf9fc] min-h-[70vh] py-12 md:py-16 text-[#1a1c1e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1a1c1e]">
          {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p className="text-xs text-[#7b7486] mb-8">
          Last updated: February 2026
        </p>

        <div className="prose prose-purple max-w-none text-[#4a4455] text-sm sm:text-base space-y-6 leading-relaxed">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-2">1. Overview</h2>
                <p>
                  At TravelGeared, we respect your privacy and are committed to protecting any personal information you share with us. This policy describes our practices regarding information collection, storage, and usage.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-2">2. Information Collection</h2>
                <p>
                  We only collect information voluntarily provided when you contact us or subscribe to our newsletter. We do not sell or rent your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-2">3. Affiliate Disclosures</h2>
                <p>
                  TravelGeared participates in affiliate marketing programs, including the Amazon Services LLC Associates Program. Some links on this site may earn us a small commission when you make a purchase, at no additional cost to you.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-2">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using TravelGeared, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-2">2. Intellectual Property</h2>
                <p>
                  All content, branding, original photography, editorial reviews, and technical guides are the intellectual property of TravelGeared.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#1a1c1e] mb-2">3. Product Recommendations</h2>
                <p>
                  Our equipment recommendations reflect independent research. While we aim for complete accuracy regarding specifications and pricing, actual retailer pricing and stock may fluctuate.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
