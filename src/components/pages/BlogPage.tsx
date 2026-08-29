import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_ARTICLES, BlogArticle } from '../../data/blogArticles';
import { Article } from '../../types';

interface BlogPageProps {
  onSelectArticle?: (article: Article) => void;
}

type FilterCategory = 'ALL' | 'TRAVEL TIPS' | 'PACKING' | 'TRAVEL TECH' | 'TRAVEL COMFORT';

export const BlogPage: React.FC<BlogPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('ALL');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleArticleClick = (article: BlogArticle | Article) => {
    const slug = article.slug || article.id;
    navigate(`/blog/${slug}`);
  };

  const filterCategories: FilterCategory[] = [
    'ALL',
    'TRAVEL TIPS',
    'PACKING',
    'TRAVEL TECH',
    'TRAVEL COMFORT',
  ];

  const featuredArticle = BLOG_ARTICLES.find((a) => a.isFeatured) || BLOG_ARTICLES[0];
  
  // Articles in the grid (excluding the featured one for the main grid, or filtered accordingly)
  const gridArticles = BLOG_ARTICLES.filter((article) => {
    if (article.id === featuredArticle.id && selectedCategory === 'ALL') return false;
    if (selectedCategory === 'ALL') return true;
    return article.filterCategory === selectedCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <div className="w-full bg-[#faf9fc] min-h-screen text-[#1a1c1e]">
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
          <span className="text-[#1a1c1e] font-semibold">Blog</span>
        </nav>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h1 className="font-headline-lg font-bold text-3xl sm:text-4xl md:text-5xl text-[#8E55FD] mb-4 tracking-[-0.02em]">
            Travel Insights &amp; Gear Guides
          </h1>
          <p className="font-body-md text-base sm:text-lg text-[#4a4455] leading-relaxed">
            Expert travel tips, gear breakdowns, packing strategies, and lifestyle advice to help you travel smarter.
          </p>
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 md:mb-14">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded font-label-mono text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#8E55FD] text-white shadow-xs'
                  : 'bg-white text-[#4a4455] border border-[#ccc3d7] hover:bg-[#eaddff]/40 hover:text-[#8E55FD]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Hero Article (Visible when ALL is selected) */}
        {selectedCategory === 'ALL' && featuredArticle && (
          <div className="mb-12 md:mb-16">
            <div
              onClick={() => handleArticleClick(featuredArticle)}
              className="group bg-white rounded-xl border border-[#ccc3d7] overflow-hidden hover:border-[#8E55FD] hover-lift transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer shadow-sm"
            >
              <div className="lg:col-span-7 h-64 sm:h-80 lg:h-[420px] overflow-hidden relative">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute top-4 left-4">
                  <span className="font-label-mono text-xs font-bold uppercase bg-[#8E55FD] text-white px-3 py-1 rounded shadow-xs">
                    Featured
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-label-mono text-[#7b7486] mb-3">
                    <span>{featuredArticle.publishDate}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors mb-4 leading-snug">
                    {featuredArticle.title}
                  </h2>
                  <p className="font-body-md text-sm sm:text-base text-[#4a4455] leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 font-label-mono text-xs font-bold uppercase tracking-wider text-[#8E55FD] group-hover:text-[#7232E7] transition-colors">
                  Read Full Article
                  <span className="material-symbols-outlined text-base icon-slide-right">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {gridArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article)}
              className="group bg-white rounded-xl border border-[#ccc3d7] overflow-hidden hover:border-[#8E55FD] hover-lift transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xs"
            >
              <div className="h-48 sm:h-52 overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 left-3">
                  <span className="font-label-mono text-[11px] font-bold uppercase bg-white/90 backdrop-blur-xs text-[#8E55FD] px-2.5 py-0.5 rounded shadow-2xs">
                    {article.filterCategory}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-label-mono text-[#7b7486] mb-2.5">
                    <span>{article.publishDate}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-title-md font-bold text-lg text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors mb-2.5 leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-[#4a4455] leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 font-label-mono text-xs font-bold uppercase tracking-wider text-[#8E55FD] group-hover:text-[#7232E7] transition-colors pt-2 border-t border-[#eeedf0]">
                  Read Guide
                  <span className="material-symbols-outlined text-sm icon-slide-right">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Travel Topics */}
        <section className="bg-white rounded-2xl border border-[#ccc3d7] p-8 md:p-12 mb-16 text-center shadow-xs">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl text-[#8E55FD] mb-3">
              Explore More Travel Topics
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#4a4455] mb-8 leading-relaxed">
              Dive deeper into our specific categories and curated buying guides to discover gear tailored for your journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/#shop"
                className="px-6 py-3 border border-[#ccc3d7] rounded hover:bg-[#e8e8eb] transition-colors font-title-md text-sm font-semibold text-[#1a1c1e] cursor-pointer inline-flex items-center"
              >
                Travel Gear
              </Link>
              <Link
                to="/buying-guides"
                className="px-6 py-3 border border-[#ccc3d7] rounded hover:bg-[#e8e8eb] transition-colors font-title-md text-sm font-semibold text-[#1a1c1e] cursor-pointer inline-flex items-center"
              >
                Buying Guides
              </Link>
              <Link
                to="/reviews"
                className="px-6 py-3 border border-[#ccc3d7] rounded hover:bg-[#e8e8eb] transition-colors font-title-md text-sm font-semibold text-[#1a1c1e] cursor-pointer inline-flex items-center"
              >
                Reviews
              </Link>
            </div>
          </div>
        </section>

        {/* Subscription CTA */}
        <section className="bg-[#8E55FD] py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 text-center text-white select-none rounded-2xl shadow-md">
          <div className="max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-4xl sm:text-5xl mb-4 text-white">
              mail
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Stay Updated
            </h2>
            <p className="font-body-md text-base sm:text-lg text-white/90 mb-8 max-w-xl mx-auto leading-relaxed">
              Get our latest travel tips and gear advice delivered directly to your inbox.
            </p>
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#8E55FD] rounded-lg font-title-md font-semibold text-sm shadow-md animate-fade-in">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-[#1a1c1e] placeholder:text-[#7b7486] font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-[#8E55FD] hover:bg-[#faf9fc] font-title-md text-sm font-bold rounded-lg transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
