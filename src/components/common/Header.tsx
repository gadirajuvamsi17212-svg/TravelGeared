import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data/navigation';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#eeedf0] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer select-none"
          onClick={handleLinkClick}
          aria-label="TravelGeared Home"
        >
          <img
            src="/black-logo.png"
            alt="TravelGeared"
            className="h-8 sm:h-9 w-auto object-contain block"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="logo-fallback hidden items-center gap-1.5 font-headline-lg font-bold text-xl text-[#1a1c1e] tracking-tight">
            <span>Travel</span>
            <span className="text-[#8E55FD]">Geared</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.href) && link.href !== '/#shop';

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`font-title-md text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#8E55FD]'
                    : 'text-[#4a4455] hover:text-[#8E55FD]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Action */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/blog/best-backpacks-for-2026"
            className="px-4 py-2 text-xs font-title-md font-bold uppercase tracking-wider rounded bg-[#f5effb] text-[#8E55FD] hover:bg-[#8E55FD] hover:text-white transition-all shadow-xs cursor-pointer"
          >
            2026 Gear Guide
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1a1c1e] hover:text-[#8E55FD] rounded-lg transition-colors cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#eeedf0] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2.5 rounded-lg text-sm font-title-md font-semibold text-[#1a1c1e] hover:bg-[#f5effb] hover:text-[#8E55FD] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#eeedf0]">
              <Link
                to="/blog/best-backpacks-for-2026"
                onClick={handleLinkClick}
                className="block text-center py-2.5 px-4 bg-[#8E55FD] text-white font-title-md font-bold text-sm rounded-lg shadow-sm"
              >
                Explore 2026 Gear Guide
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
