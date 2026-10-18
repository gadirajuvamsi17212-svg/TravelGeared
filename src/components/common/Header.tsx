import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Gear Guides', href: '/guides' },
    { label: 'Travel Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e3e2e5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer group" aria-label="TravelGeared Home">
          <img
            src="/Travel Geared Favicon.png"
            alt="TravelGeared Emblem"
            className="h-9 sm:h-10 w-auto object-contain block group-hover:scale-105 transition-transform"
          />
          <span className="font-headline-lg font-bold text-xl sm:text-2xl tracking-tight text-[#1a1c1e]">
            Travel<span className="text-[#8E55FD]">Geared</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-body-md text-[15px] font-medium text-[#1a1c1e]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`hover:text-[#8E55FD] transition-colors py-1 ${
                isActive(link.href)
                  ? 'text-[#8E55FD] font-semibold border-b-2 border-[#8E55FD]'
                  : 'text-[#4a4455]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8E55FD] text-white font-title-md text-sm font-semibold hover:bg-[#7a42ea] transition-all shadow-xs"
          >
            <span>Explore Tips</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1a1c1e] hover:bg-[#eeedf0] transition-colors"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#eeedf0] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-body-md ${
                isActive(link.href)
                  ? 'bg-[#f5effb] text-[#8E55FD] font-semibold'
                  : 'text-[#1a1c1e] hover:bg-[#faf9fc]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex justify-center items-center gap-2 py-3 rounded-lg bg-[#8E55FD] text-white font-title-md font-semibold text-sm"
            >
              <span>Explore Tips</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
