import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HeroSection } from './components/home/HeroSection';
import { CategoriesBento } from './components/home/CategoriesBento';
import { CategoryPage } from './components/pages/CategoryPage';
import { BlogPage } from './components/pages/BlogPage';
import { BlogDetailPage } from './components/pages/BlogDetailPage';
import { GuidesPage } from './components/pages/GuidesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { ComingSoonPage } from './components/pages/ComingSoonPage';
import { ProductModal } from './components/modals/ProductModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { Product, Article, Category, PageRoute } from './types';
import { ARTICLES } from './data/articles';
import { BLOG_ARTICLES } from './data/blogArticles';

// Wrapper for CategoryPage to extract params and pass props
const CategoryRouteWrapper: React.FC<{
  onSelectProduct: (p: Product) => void;
  savedProductIds: string[];
  onToggleSave: (id: string) => void;
}> = ({ onSelectProduct, savedProductIds, onToggleSave }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const handleNavigate = (route: PageRoute, targetSlug?: string) => {
    if (route === 'home') navigate('/');
    else if (route === 'category' && targetSlug) navigate(`/category/${targetSlug}`);
    else if (route === 'guides') navigate('/buying-guides');
    else if (route === 'blog') navigate('/blog');
    else if (route === 'about') navigate('/about');
    else if (route === 'contact') navigate('/contact');
    else navigate('/');
  };

  return (
    <CategoryPage
      categorySlug={slug}
      onSelectProduct={onSelectProduct}
      onNavigate={handleNavigate}
      savedProductIds={savedProductIds}
      onToggleSave={onToggleSave}
    />
  );
};

// Home View Component
const HomePage: React.FC<{
  onSelectCategory: (c: Category) => void;
  onSelectArticle: (a: Article) => void;
}> = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <HeroSection onNavigate={(r) => navigate(r === 'home' ? '/' : `/${r}`)} />
      <CategoriesBento onSelectCategory={onSelectCategory} />

      {/* Featured Insights & Guides Section */}
      <section className="w-full bg-[#f4f3f6] py-14 sm:py-20 border-t border-[#eeedf0]" id="guides">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-[#eaddff] text-[#8E55FD] text-xs font-label-mono rounded-full mb-3 uppercase tracking-wider font-semibold">
                Field Notes &amp; Teardowns
              </span>
              <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-4xl text-[#1a1c1e]">
                Engineered Buying Guides
              </h2>
            </div>
            <Link
              to="/buying-guides"
              className="inline-flex items-center gap-2 text-[#8E55FD] hover:text-[#7232E7] font-title-md text-sm font-bold tracking-wide cursor-pointer"
            >
              View All Guides &amp; Teardowns
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((art) => (
              <Link
                key={art.id}
                to={`/blog/${art.slug || art.id}`}
                className="group bg-white rounded-xl border border-[#ccc3d7] overflow-hidden hover-lift hover:border-[#8E55FD] transition-all shadow-xs flex flex-col justify-between cursor-pointer"
              >
                <div className="h-48 overflow-hidden bg-[#e3e2e5]">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-label-mono text-[#7b7486] mb-2.5">
                      <span className="text-[#8E55FD] font-semibold uppercase">{art.tag || art.category}</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="font-title-md font-bold text-base sm:text-lg text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors mb-2 line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="font-body-md text-xs sm:text-sm text-[#4a4455] line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#eeedf0] flex items-center justify-between text-xs text-[#7b7486]">
                    <span>By {art.author.name}</span>
                    <span className="text-[#8E55FD] font-bold inline-flex items-center gap-1">
                      Read <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Teaser */}
      <section className="w-full bg-white py-14 sm:py-20 border-t border-[#eeedf0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-[#f5effb] text-[#8E55FD] text-xs font-label-mono rounded-full mb-3 uppercase tracking-wider font-semibold">
                Journal
              </span>
              <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-4xl text-[#1a1c1e]">
                Latest from the Travel Journal
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#8E55FD] hover:text-[#7232E7] font-title-md text-sm font-bold tracking-wide cursor-pointer"
            >
              Browse All Articles
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_ARTICLES.slice(0, 3).map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug || blog.id}`}
                className="group bg-[#faf9fc] rounded-xl border border-[#ccc3d7] overflow-hidden hover-lift hover:border-[#8E55FD] transition-all shadow-xs flex flex-col justify-between cursor-pointer"
              >
                <div className="h-48 overflow-hidden bg-[#e3e2e5]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-label-mono text-[#7b7486] mb-2.5">
                      <span className="text-[#8E55FD] font-semibold uppercase">{blog.filterCategory}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-title-md font-bold text-base sm:text-lg text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="font-body-md text-xs sm:text-sm text-[#4a4455] line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#eeedf0] flex items-center justify-between text-xs text-[#7b7486]">
                    <span>{blog.publishDate}</span>
                    <span className="text-[#8E55FD] font-bold inline-flex items-center gap-1">
                      Read <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setArticleModalOpen(true);
  };

  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#faf9fc] text-[#1a1c1e]">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onSelectCategory={() => {}}
                  onSelectArticle={handleSelectArticle}
                />
              }
            />
            <Route
              path="/category/:slug"
              element={
                <CategoryRouteWrapper
                  onSelectProduct={handleSelectProduct}
                  savedProductIds={savedProductIds}
                  onToggleSave={handleToggleSave}
                />
              }
            />
            <Route
              path="/buying-guides"
              element={
                <GuidesPage
                  onSelectArticle={handleSelectArticle}
                  onNavigate={() => {}}
                />
              }
            />
            <Route
              path="/guides"
              element={
                <GuidesPage
                  onSelectArticle={handleSelectArticle}
                  onNavigate={() => {}}
                />
              }
            />
            <Route
              path="/reviews"
              element={
                <GuidesPage
                  onSelectArticle={handleSelectArticle}
                  onNavigate={() => {}}
                />
              }
            />
            <Route
              path="/blog"
              element={<BlogPage onSelectArticle={handleSelectArticle} />}
            />
            <Route
              path="/blog/:slug"
              element={<BlogDetailPage onSelectProduct={handleSelectProduct} />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/privacy-policy"
              element={<ComingSoonPage contextTitle="Privacy Policy" />}
            />
            <Route
              path="/terms-of-service"
              element={<ComingSoonPage contextTitle="Terms of Service" />}
            />
            <Route
              path="*"
              element={<ComingSoonPage contextTitle="Page Not Found" />}
            />
          </Routes>
        </main>

        <Footer />

        {/* Global Modals */}
        <ProductModal
          product={selectedProduct}
          isOpen={productModalOpen}
          onClose={() => setProductModalOpen(false)}
          onToggleSave={handleToggleSave}
          isSaved={selectedProduct ? savedProductIds.includes(selectedProduct.id) : false}
        />

        <ArticleModal
          article={selectedArticle}
          isOpen={articleModalOpen}
          onClose={() => setArticleModalOpen(false)}
          onSelectProduct={handleSelectProduct}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
