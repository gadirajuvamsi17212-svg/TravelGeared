import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CategoriesBento } from './components/home/CategoriesBento';
import { TopRatedGear } from './components/home/TopRatedGear';
import { GuidesSection } from './components/home/GuidesSection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { SearchModal } from './components/modals/SearchModal';
import { ProductQuickViewModal } from './components/modals/ProductQuickViewModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { AccountModal } from './components/modals/AccountModal';
import { CategoryPage } from './components/pages/CategoryPage';
import { GuidesPage } from './components/pages/GuidesPage';
import { BlogPage } from './components/pages/BlogPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { ComingSoonPage } from './components/pages/ComingSoonPage';
import { Product, Article, Category, PageRoute } from './types';
import { PRODUCTS } from './data/products';
import { SITE_CONFIG } from './data/siteConfig';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [routeParam, setRouteParam] = useState<string>('');

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

  const handleNavigate = (route: PageRoute, param?: string) => {
    setCurrentRoute(route);
    if (param) setRouteParam(param);
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
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        savedCount={savedProductIds.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <CategoriesBento
              onNavigate={handleNavigate}
              onSelectCategory={(cat) => handleNavigate('category', cat.slug)}
            />
            <TopRatedGear
              onSelectProduct={(p) => setSelectedProduct(p)}
              onNavigate={handleNavigate}
              savedProductIds={savedProductIds}
              onToggleSave={toggleSaveProduct}
            />
            <GuidesSection
              onSelectArticle={(art) => setSelectedArticle(art)}
              onNavigate={handleNavigate}
            />
            <NewsletterSection />
          </>
        )}

        {(currentRoute === 'category' || currentRoute === 'guides' || currentRoute === 'reviews' || currentRoute === 'coming-soon') && (
          <ComingSoonPage onNavigate={handleNavigate} />
        )}

        {currentRoute === 'blog' && (
          <BlogPage
            onSelectArticle={(art) => setSelectedArticle(art)}
            onNavigate={handleNavigate}
          />
        )}

        {currentRoute === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentRoute === 'contact' && <ContactPage onNavigate={handleNavigate} />}

        {currentRoute === 'privacy' && <LegalPage type="privacy" onNavigate={handleNavigate} />}

        {currentRoute === 'terms' && <LegalPage type="terms" onNavigate={handleNavigate} />}
      </main>

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onSelectCategory={(cat) => handleNavigate('category', cat.slug)}
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
