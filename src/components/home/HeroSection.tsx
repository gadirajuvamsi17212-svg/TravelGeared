import React from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { PageRoute } from '../../types';

interface HeroSectionProps {
  onNavigate?: (route: PageRoute) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden h-[82vh] min-h-[720px] max-h-[860px] md:h-[calc(100svh-72px)] md:min-h-[540px] md:max-h-[calc(100svh-72px)] flex items-center">
      {/* Full Hero Image Container */}
      <div className="relative w-full h-full">
        {/* Mobile Background Image */}
        <img
          alt="Modern traveler in an airport terminal with purple ambient lighting"
          className="w-full h-full object-cover object-top block md:hidden select-none"
          src={SITE_CONFIG.heroBgMobileUrl || '/Phone Home Main.png'}
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = SITE_CONFIG.heroBgUrl;
          }}
        />

        {/* Desktop & Tablet Background Image */}
        <img
          alt="Modern traveler in an airport terminal with purple ambient lighting"
          className="w-full h-full object-cover md:object-[68%_38%] hidden md:block select-none"
          src={SITE_CONFIG.heroBgUrl}
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHuaQAmmTvQ2Nsk1qB1D5GrQAtkxM6V2ESuCf8b_yXo7QAgHt43m9gujOq2Q35y4JBMZ7mHdXOSmnF_XKusgkrUVFf_2nPCobQZGFfA6Ght_sCmvufBrrakZIuN3romXRS1aTli-dL-TlW17yMeGwoIZNICz2Ue76FqqMEDnxMt5V2NWovu9WxPAdQh0bBNpsAd58rOuDjGYlhHG2FFo6ZQXi7f4ne-dxLIxoe4g-3bMcJ8SH9v7ZWzAmU1JuBO7ttKXw';
          }}
        />

        {/* Content Overlay positioned in the middle area on mobile (shifted upward), left-aligned on desktop */}
        <div className="absolute inset-0 z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col justify-end md:justify-center items-center md:items-start pb-28 sm:pb-32 md:pb-0 pointer-events-none">
          <div className="w-[82vw] max-w-[330px] sm:max-w-[350px] md:max-w-[460px] lg:max-w-[490px] glass-panel p-3.5 sm:p-4 md:p-6 lg:p-7 rounded-xl hero-stagger shadow-xl border border-white/60 pointer-events-auto mb-4 md:my-auto">
            <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-0.5 bg-[#eaddff] text-[#8E55FD] font-label-mono text-[8.5px] sm:text-xs font-semibold tracking-wide sm:tracking-wider rounded-full mb-1 sm:mb-2 uppercase">
              Engineered for the modern nomad
            </span>
            
            <h1 className="font-headline-lg font-bold text-[16.5px] sm:text-xl md:text-[28px] lg:text-[32px] leading-snug sm:leading-tight lg:leading-[38px] tracking-[-0.02em] mb-1 sm:mb-2.5 text-[#8E55FD]">
              Engineered Travel Gear for Smarter Journeys
            </h1>
            
            <p className="font-body-md text-[11.5px] leading-[16.5px] sm:text-sm md:text-[14px] lg:text-[14.5px] lg:leading-[22px] text-[#4a4455] mb-2.5 sm:mb-4 lg:mb-5 max-w-[440px]">
              Discover expertly curated equipment designed for architectural precision, spatial efficiency, and uncompromising durability. Elevate your transit experience.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <a
                id="hero-cta-explore"
                className="inline-flex items-center justify-center w-full sm:w-auto h-[38px] sm:h-[44px] px-3.5 py-1.5 sm:px-5 sm:py-2.5 bg-[#8E55FD] text-white font-title-md text-[12px] sm:text-sm md:text-[15px] font-semibold rounded hover:bg-[#7232E7] btn-lift shadow-sm cursor-pointer text-center"
                href="#shop"
                onClick={(e) => handleScrollTo('shop', e)}
              >
                Explore Travel Gear
              </a>
              <a
                id="hero-cta-guides"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-[#1a1c1e] border border-[#ccc3d7] font-title-md text-xs sm:text-sm md:text-[15px] font-semibold rounded hover:bg-[#f4f3f6] hover:border-[#8E55FD] hover:text-[#8E55FD] btn-lift cursor-pointer text-center"
                href="#guides"
                onClick={(e) => handleScrollTo('guides', e)}
              >
                Read Buying Guides
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
