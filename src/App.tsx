import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './components/home/HomePage';
import { BlogPage } from './components/pages/BlogPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { BlogDetailPage } from './components/pages/BlogDetailPage';
import { LegalPage } from './components/pages/LegalPage';
import { ComingSoonPage } from './components/pages/ComingSoonPage';
import { SearchModal } from './components/modals/SearchModal';
import { ProductQuickViewModal } from './components/modals/ProductQuickViewModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { AccountModal } from './components/modals/AccountModal';
import { Product, Article, Category } from './types';
import { SITE_CONFIG } from './data/siteConfig';

export default function App() {
  const navigate = useNavigate();

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Saved Gear (Wishlist) state with localStorage persistence
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tg_saved_gear');
      return saved ? JSON.parse(saved) : ['prod-aero-carryon', 'prod-nomad-pack'];
    } catch {
      return ['prod-aero-carryon'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tg_saved_gear', JSON.stringify(savedProductIds));
    } catch {
      // ignore
    }
  }, [savedProductIds]);

  const toggleSaveProduct = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fc] text-[#1a1c1e] font-headline-lg selection:bg-[#8E55FD] selection:text-white">
      {/* Scroll to top / hash on route transitions */}
      <ScrollToTop />

      {/* Structured Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.url,
            logo: SITE_CONFIG.headerLogoUrl,
            description: SITE_CONFIG.subTagline,
            sameAs: [
              SITE_CONFIG.socials.linkedin,
              SITE_CONFIG.socials.instagram,
              SITE_CONFIG.socials.facebook,
            ],
          }),
        }}
      />

      {/* Top Navigation Bar */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        savedCount={savedProductIds.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSelectProduct={(p) => setSelectedProduct(p)}
                savedProductIds={savedProductIds}
                onToggleSave={toggleSaveProduct}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/blog"
            element={<BlogPage />}
          />
          <Route
            path="/blog/:slug"
            element={<BlogDetailPage onSelectProduct={(p) => setSelectedProduct(p)} />}
          />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/category/:slug" element={<ComingSoonPage />} />
          <Route path="/categories" element={<ComingSoonPage />} />
          <Route path="/buying-guides" element={<ComingSoonPage />} />
          <Route path="/guides" element={<ComingSoonPage />} />
          <Route path="/guides/:slug" element={<ComingSoonPage />} />
          <Route path="/reviews" element={<ComingSoonPage />} />
          <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms-of-service" element={<LegalPage type="terms" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectCategory={(cat) => navigate(`/category/${cat.slug}`)}
      />

      <ProductQuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isSaved={selectedProduct ? savedProductIds.includes(selectedProduct.id) : false}
        onToggleSave={toggleSaveProduct}
      />

      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        savedProductIds={savedProductIds}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onRemoveSaved={toggleSaveProduct}
        onClearSaved={() => setSavedProductIds([])}
      />
    </div>
  );
}
