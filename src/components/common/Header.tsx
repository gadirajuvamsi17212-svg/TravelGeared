import React, { useState, useRef } from 'react';
import { CATEGORIES } from '../../data/categories';
import { PageRoute } from '../../types';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, param?: string) => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  savedCount?: number;
}

const CATEGORY_ICONS: Record<string, string> = {
  'travel-backpacks': 'backpack',
  'luggage-carry-ons': 'luggage',
  'travel-organizers': 'inventory_2',
  'travel-tech-gadgets': 'devices',
  'power-charging': 'bolt',
  'travel-comfort': 'airline_seat_recline_extra',
};

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenAccount,
  savedCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileGearOpen, setMobileGearOpen] = useState(true);
  const [gearDropdownOpen, setGearDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setGearDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setGearDropdownOpen(false);
    }, 150);
  };

  const handleCategorySelect = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setGearDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('category', slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setGearDropdownOpen(false);
    if (href === '#shop') {
      if (currentRoute !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '#guides' || href === '/buying-guides') {
      onNavigate('guides');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href === '/reviews') {
      onNavigate('reviews');
    } else if (href === '/blog') {
      onNavigate('blog');
    } else if (href === '/') {
      onNavigate('home');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#ccc3d7]">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 lg:px-16 py-3.5 sm:py-4 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <a
          id="header-brand-logo"
          className="flex items-center shrink-0 cursor-pointer select-none"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="TravelGeared Homepage"
        >
          <img
            src="/white-logo.png"
            alt="TravelGeared"
            className="w-[175px] sm:w-[200px] md:w-[225px] h-auto object-contain block select-none"
            loading="eager"
            decoding="async"
          />
        </a>

        {/* Navigation Links (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
          {/* Travel Gear Dropdown Parent */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
              id="nav-link-travel-gear"
              className={`nav-link inline-flex items-center gap-1 hover:text-[#8E55FD] transition-colors font-body-md text-sm md:text-[15px] font-medium cursor-pointer py-2 ${
                currentRoute === 'category' || currentRoute === 'home'
                  ? 'text-[#1a1c1e]'
                  : 'text-[#4a4455]'
              }`}
              href="#shop"
              onClick={(e) => handleNavClick('#shop', e)}
              aria-haspopup="true"
              aria-expanded={gearDropdownOpen}
            >
              <span>Travel Gear</span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                  gearDropdownOpen ? 'rotate-180 text-[#8E55FD]' : 'text-[#7b7486]'
                }`}
              >
                expand_more
              </span>
            </a>

            {/* Dropdown Menu */}
            {gearDropdownOpen && (
              <div
                id="travel-gear-dropdown"
                className="absolute top-full left-0 w-[340px] lg:w-[380px] bg-white rounded-xl border border-[#ccc3d7] shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-2 border-b border-[#eeedf0] mb-1 flex items-center justify-between">
                  <span className="font-label-mono text-[11px] uppercase tracking-wider text-[#7b7486] font-semibold">
                    Gear Categories
                  </span>
                  <span className="font-label-mono text-[11px] text-[#8E55FD] bg-[#eaddff] px-2 py-0.5 rounded-full font-medium">
                    6 Collections
                  </span>
                </div>

                <div className="space-y-1">
                  {CATEGORIES.map((category) => {
                    const iconName = CATEGORY_ICONS[category.slug] || 'inventory_2';
                    return (
                      <a
                        key={category.id}
                        id={`dropdown-category-${category.slug}`}
                        href={`/category/${category.slug}`}
                        onClick={(e) => handleCategorySelect(category.slug, e)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#faf9fc] hover:text-[#8E55FD] transition-colors group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-md bg-[#f4f3f6] group-hover:bg-[#eaddff] flex items-center justify-center text-[#4a4455] group-hover:text-[#8E55FD] transition-colors shrink-0">
                          <span className="material-symbols-outlined text-[18px]">
                            {iconName}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-title-md text-sm font-semibold text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors truncate">
                              {category.name}
                            </span>
                            <span className="font-label-mono text-[11px] text-[#7b7486] group-hover:text-[#8E55FD] transition-colors shrink-0 ml-2">
                              {category.itemCount} items
                            </span>
                          </div>
                          <p className="font-body-md text-xs text-[#7b7486] truncate mt-0.5">
                            {category.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-[#eeedf0] px-3 py-1.5 flex items-center justify-between bg-[#f4f3f6]/60 rounded-lg">
                  <a
                    href="#shop"
                    onClick={(e) => handleNavClick('#shop', e)}
                    className="font-title-md text-xs text-[#8E55FD] font-semibold hover:text-[#7232E7] transition-colors inline-flex items-center gap-1"
                  >
                    Browse All Categories Grid
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          <a
            id="nav-link-buying-guides"
            className={`nav-link hover:text-[#8E55FD] transition-colors font-body-md text-sm md:text-[15px] font-medium ${
              currentRoute === 'guides' ? 'text-[#8E55FD] font-semibold' : 'text-[#4a4455]'
            }`}
            href="#guides"
            onClick={(e) => handleNavClick('#guides', e)}
          >
            Buying Guides
          </a>

          <a
            id="nav-link-reviews"
            className={`nav-link hover:text-[#8E55FD] transition-colors font-body-md text-sm md:text-[15px] font-medium ${
              currentRoute === 'reviews' ? 'text-[#8E55FD] font-semibold' : 'text-[#4a4455]'
            }`}
            href="/reviews"
            onClick={(e) => handleNavClick('/reviews', e)}
          >
            Reviews
          </a>

          <a
            id="nav-link-blog"
            className={`nav-link hover:text-[#8E55FD] transition-colors font-body-md text-sm md:text-[15px] font-medium ${
              currentRoute === 'blog' ? 'text-[#8E55FD] font-semibold' : 'text-[#4a4455]'
            }`}
            href="/blog"
            onClick={(e) => handleNavClick('/blog', e)}
          >
            Blog
          </a>
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            id="nav-search-button"
            aria-label="Search travel gear, guides, and articles"
            className="p-2 text-[#4a4455] hover:text-[#8E55FD] transition-colors rounded-full hover:bg-[#f4f3f6] flex items-center justify-center cursor-pointer"
            onClick={onOpenSearch}
            title="Search (Cmd+K)"
          >
            <span className="material-symbols-outlined text-[22px]" data-icon="search">
              search
            </span>
          </button>

          <button
            id="nav-account-button"
            aria-label="Saved Gear & Account"
            className="relative p-2 text-[#4a4455] hover:text-[#8E55FD] transition-colors rounded-full hover:bg-[#f4f3f6] flex items-center justify-center cursor-pointer"
            onClick={onOpenAccount}
            title="Saved Gear / Account"
          >
            <span className="material-symbols-outlined text-[22px]" data-icon="account_circle">
              account_circle
            </span>
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#8E55FD] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-button"
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-[#4a4455] hover:text-[#8E55FD] transition-colors rounded-full hover:bg-[#f4f3f6] flex items-center justify-center cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-[24px]" data-icon="menu">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] z-40 bg-black/40 backdrop-blur-xs flex flex-col justify-start">
          <div className="bg-white border-b border-[#ccc3d7] p-6 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {/* Collapsible Mobile Travel Gear Section */}
              <div>
                <button
                  onClick={() => setMobileGearOpen(!mobileGearOpen)}
                  className="w-full text-lg font-headline-lg font-semibold text-[#1a1c1e] hover:text-[#8E55FD] py-2 border-b border-[#eeedf0] flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Travel Gear
                    <span className="text-xs bg-[#eaddff] text-[#8E55FD] px-2 py-0.5 rounded-full font-label-mono">
                      6 Categories
                    </span>
                  </span>
                  <span
                    className={`material-symbols-outlined text-xl transition-transform ${
                      mobileGearOpen ? 'rotate-180 text-[#8E55FD]' : 'text-[#7b7486]'
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {mobileGearOpen && (
                  <div className="pl-2 pr-1 py-2 space-y-1.5 bg-[#faf9fc] rounded-lg mt-2 mb-2">
                    {CATEGORIES.map((cat) => {
                      const iconName = CATEGORY_ICONS[cat.slug] || 'inventory_2';
                      return (
                        <a
                          key={cat.id}
                          href={`/category/${cat.slug}`}
                          onClick={(e) => handleCategorySelect(cat.slug, e)}
                          className="flex items-center justify-between p-2 rounded hover:bg-[#eaddff]/40 text-sm font-medium text-[#1a1c1e] hover:text-[#8E55FD] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#8E55FD] text-lg">
                              {iconName}
                            </span>
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-xs text-[#7b7486] font-label-mono">
                            {cat.itemCount}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <a
                className="text-lg font-headline-lg font-semibold text-[#1a1c1e] hover:text-[#8E55FD] py-2 border-b border-[#eeedf0]"
                href="#guides"
                onClick={(e) => handleNavClick('#guides', e)}
              >
                Buying Guides
              </a>
              <a
                className="text-lg font-headline-lg font-semibold text-[#1a1c1e] hover:text-[#8E55FD] py-2 border-b border-[#eeedf0]"
                href="/reviews"
                onClick={(e) => handleNavClick('/reviews', e)}
              >
                Reviews
              </a>
              <a
                className="text-lg font-headline-lg font-semibold text-[#1a1c1e] hover:text-[#8E55FD] py-2 border-b border-[#eeedf0]"
                href="/blog"
                onClick={(e) => handleNavClick('/blog', e)}
              >
                Blog
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#8E55FD] text-white rounded font-title-md text-sm cursor-pointer shadow-xs"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
              >
                <span className="material-symbols-outlined text-sm">search</span>
                Search Gear & Guides
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
