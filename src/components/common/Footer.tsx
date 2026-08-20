import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../data/siteConfig';
import { FOOTER_SECTIONS } from '../../data/navigation';

export const Footer: React.FC = () => {
  return (
    <footer
      id="site-footer"
      className="text-white border-t border-white/10 pt-16 pb-8 select-none"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              id="footer-brand-logo"
              className="inline-flex items-center cursor-pointer mb-6"
              to="/"
              aria-label="TravelGeared Homepage"
            >
              <img
                alt="TravelGeared Logo"
                className="w-[175px] sm:w-[205px] md:w-[230px] h-auto object-contain block select-none"
                src="/black-logo.png"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="font-body-md text-[#e3e2e5] max-w-[340px] mb-6 opacity-80 leading-relaxed text-sm">
              {SITE_CONFIG.subTagline}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                id="social-linkedin"
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#8E55FD] transition-all duration-300 btn-lift shadow-sm"
                aria-label="LinkedIn"
                style={{ backgroundColor: '#0077B5' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
              <a
                id="social-instagram"
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#8E55FD] transition-all duration-300 btn-lift shadow-sm"
                aria-label="Instagram"
                style={{ background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a
                id="social-facebook"
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#8E55FD] transition-all duration-300 btn-lift shadow-sm"
                aria-label="Facebook"
                style={{ backgroundColor: '#1877F2' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 1: Travel Gear */}
          <div>
            <h4 className="font-title-md text-white mb-4 text-[17px]">Travel Gear</h4>
            <ul className="space-y-3">
              {FOOTER_SECTIONS.travelGear.map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="nav-link inline-block font-body-md text-[#e3e2e5] hover:text-[#8E55FD] transition-colors opacity-80 hover:opacity-100 text-sm"
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="font-title-md text-white mb-4 text-[17px]">Explore</h4>
            <ul className="space-y-3">
              {FOOTER_SECTIONS.explore.map((item, idx) => (
                <li key={idx}>
                  <Link
                    id={`footer-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="nav-link inline-block font-body-md text-[#e3e2e5] hover:text-[#8E55FD] transition-colors opacity-80 hover:opacity-100 text-sm cursor-pointer"
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-title-md text-white mb-4 text-[17px]">Company</h4>
            <ul className="space-y-3">
              {FOOTER_SECTIONS.company.map((item, idx) => (
                <li key={idx}>
                  <Link
                    id={`footer-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="nav-link inline-block font-body-md text-[#e3e2e5] hover:text-[#8E55FD] transition-colors opacity-80 hover:opacity-100 text-sm cursor-pointer"
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-sm text-[#e3e2e5] opacity-60 text-center sm:text-left">
            © 2026 TravelGeared. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
