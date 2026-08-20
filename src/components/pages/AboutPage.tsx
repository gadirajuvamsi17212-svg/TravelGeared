import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const whatWeCoverItems = [
    {
      title: 'Travel Backpacks',
      description: 'From minimalist daypacks to robust expedition haulers.',
      icon: 'backpack',
      to: '/category/travel-backpacks',
    },
    {
      title: 'Travel Tech & Gadgets',
      description: 'Power banks, adapters, and tools to keep you connected.',
      icon: 'devices',
      to: '/category/travel-tech-gadgets',
    },
    {
      title: 'Travel Comfort',
      description: 'Pillows, blankets, and accessories for the long haul.',
      icon: 'chair',
      to: '/category/travel-comfort',
    },
    {
      title: 'Buying Guides',
      description: 'Comprehensive breakdowns to help you choose right.',
      icon: 'menu_book',
      to: '/buying-guides',
    },
    {
      title: 'In-Depth Reviews',
      description: 'Unbiased testing of the latest gear on the market.',
      icon: 'star',
      to: '/reviews',
    },
    {
      title: 'The Travel Journal',
      description: 'Stories, tips, and inspiration from the road.',
      icon: 'edit_document',
      to: '/blog',
    },
  ];

  return (
    <div className="w-full bg-[#ffffff] min-h-screen text-[#1a1c1e]">
      {/* Breadcrumb Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-6 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-label-mono text-[#7b7486]">
          <Link
            to="/"
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1a1c1e] font-semibold">About Us</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[55vh] min-h-[440px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-[#f4f3f6] my-4">
        <img
          alt="Travel lifestyle background"
          className="absolute inset-0 w-full h-full object-cover select-none"
          src="/About Main.png"
          loading="eager"
          decoding="async"
        />
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-12 max-w-4xl mx-auto glass-panel p-8 sm:p-12 md:p-14 rounded-xl border border-white/80 shadow-xl hero-stagger">
          <h1 className="font-headline-lg font-bold text-3xl sm:text-4xl md:text-5xl text-[#8E55FD] mb-3 sm:mb-4 tracking-[-0.02em]">
            About TravelGeared
          </h1>
          <p className="font-headline-lg font-semibold text-lg sm:text-2xl text-[#8E55FD] tracking-[-0.01em]">
            Travel Better. Choose Smarter.
          </p>
        </div>
      </section>

      {/* Intro Narrative */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16 mx-auto max-w-5xl">
        <div className="space-y-6 text-center md:text-left">
          <p className="text-lg sm:text-xl md:text-2xl text-[#4a4455] leading-relaxed">
            TravelGeared helps travelers discover the best travel gear, travel accessories, and travel essentials for every journey. From travel backpacks and luggage to travel tech, gadgets, and comfort essentials, we research products, compare important features, and create practical buying guides, reviews, and recommendations to help you make smarter purchasing decisions.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-[#4a4455] leading-relaxed">
            Whether you&apos;re preparing for a weekend getaway, international trip, business travel, or long journey, TravelGeared makes it easier to find the right gear for your needs, travel style, and budget. <span className="text-[#8E55FD] font-semibold">Research. Compare. Choose.</span>
          </p>
        </div>
      </section>

      {/* What We Cover Grid */}
      <section className="py-14 md:py-20 bg-[#faf9fc] px-4 sm:px-6 md:px-12 lg:px-16 border-y border-[#eeedf0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-[32px] text-[#8E55FD] mb-10 md:mb-12 text-center">
            What We Cover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeCoverItems.map((item, idx) => (
              <Link
                key={idx}
                id={`cover-category-${idx}`}
                to={item.to}
                className="bg-white p-6 sm:p-7 rounded-xl border border-[#ccc3d7] hover:border-[#8E55FD] hover:bg-[#eaddff]/30 transition-all duration-200 group cursor-pointer shadow-xs hover:shadow-md hover-lift block"
              >
                <div className="w-12 h-12 rounded-full bg-[#8E55FD] flex items-center justify-center mb-4 text-white group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-white text-2xl">
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-title-md text-lg font-bold text-[#1a1c1e] mb-2 group-hover:text-[#8E55FD] transition-colors">
                  {item.title}
                </h3>
                <p className="font-body-md text-sm text-[#4a4455] leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-[32px] text-[#8E55FD] mb-12 md:mb-16 text-center">
          Our Approach
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
          {/* Step 1: Research */}
          <div className="flex flex-col items-center text-center p-4 max-w-[280px]">
            <div className="w-16 h-16 rounded-full border-2 border-[#8E55FD] flex items-center justify-center mb-4 text-[#8E55FD] bg-white shadow-xs">
              <span className="material-symbols-outlined text-3xl">search</span>
            </div>
            <h4 className="font-title-md text-lg font-bold text-[#1a1c1e] mb-1.5">
              Research
            </h4>
            <p className="font-body-md text-sm text-[#4a4455] leading-relaxed">
              We scour the market for innovations and established classics.
            </p>
          </div>

          <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-[#ccc3d7]"></div>

          {/* Step 2: Compare */}
          <div className="flex flex-col items-center text-center p-4 max-w-[280px]">
            <div className="w-16 h-16 rounded-full border-2 border-[#8E55FD] flex items-center justify-center mb-4 text-[#8E55FD] bg-white shadow-xs">
              <span className="material-symbols-outlined text-3xl">compare_arrows</span>
            </div>
            <h4 className="font-title-md text-lg font-bold text-[#1a1c1e] mb-1.5">
              Compare
            </h4>
            <p className="font-body-md text-sm text-[#4a4455] leading-relaxed">
              Rigorous evaluation of durability, functionality, and value.
            </p>
          </div>

          <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-[#ccc3d7]"></div>

          {/* Step 3: Choose */}
          <div className="flex flex-col items-center text-center p-4 max-w-[280px]">
            <div className="w-16 h-16 rounded-full border-2 border-[#8E55FD] bg-[#8E55FD] text-white flex items-center justify-center mb-4 shadow-md">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h4 className="font-title-md text-lg font-bold text-[#1a1c1e] mb-1.5">
              Choose
            </h4>
            <p className="font-body-md text-sm text-[#4a4455] leading-relaxed">
              Clear, actionable recommendations to elevate your trip.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#8E55FD] text-white select-none">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] lg:leading-[52px] leading-tight text-white tracking-[-0.01em]">
            &ldquo;To empower every traveler with the knowledge and confidence to choose gear that elevates their journey.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 text-center bg-[#f4f3f6]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-[32px] text-[#8E55FD] mb-6">
            Gear Up for Your Next Journey
          </h2>
          <Link
            id="about-explore-gear-cta"
            to="/#shop"
            className="inline-flex items-center justify-center bg-[#8E55FD] text-white px-8 py-3.5 rounded font-label-mono text-sm uppercase tracking-wider hover:bg-[#7232E7] transition-all shadow-md active:scale-95 btn-lift cursor-pointer"
          >
            Explore Travel Gear
          </Link>
        </div>
      </section>
    </div>
  );
};
