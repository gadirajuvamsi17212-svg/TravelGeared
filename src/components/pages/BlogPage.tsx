import React, { useState } from 'react';
import { BLOG_ARTICLES, BlogArticle } from '../../data/blogArticles';
import { Article, PageRoute } from '../../types';

interface BlogPageProps {
  onSelectArticle: (article: Article) => void;
  onNavigate: (route: PageRoute, param?: string) => void;
}

type FilterCategory = 'ALL' | 'TRAVEL TIPS' | 'PACKING' | 'TRAVEL TECH' | 'TRAVEL COMFORT';

export const BlogPage: React.FC<BlogPageProps> = ({
  onSelectArticle,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('ALL');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

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
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#1a1c1e] font-semibold">Blog</span>
        </nav>
      </div>

      <main className="w-full">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-8 pb-10 md:pt-12 md:pb-14 text-center">
          <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1c1e] mb-4 tracking-[-0.02em] leading-tight">
            Master the Art of the Journey
          </h1>
          <p className="font-body-md text-base sm:text-lg md:text-xl text-[#4a4455] max-w-3xl mx-auto leading-relaxed">
            Expert packing strategies, technical gear analysis, and practical wisdom designed to help the modern nomad travel smarter, lighter, and with absolute confidence.
          </p>
        </section>

        {/* Filter Pills */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-10 md:mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-label-mono text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#8E55FD] text-white shadow-sm'
                    : 'bg-[#f4f3f6] text-[#4a4455] hover:bg-[#eeedf0] hover:text-[#1a1c1e] border border-[#ccc3d7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Article (Shown when ALL or TRAVEL TIPS is selected) */}
        {(selectedCategory === 'ALL' || selectedCategory === 'TRAVEL TIPS') && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
            <article
              id={`featured-article-${featuredArticle.slug}`}
              onClick={() => onSelectArticle(featuredArticle)}
              className="group relative rounded-xl overflow-hidden border border-[#e8e8eb] bg-white hover-lift flex flex-col md:flex-row cursor-pointer shadow-xs"
            >
              <div className="w-full md:w-3/5 h-64 md:h-[420px] relative overflow-hidden bg-black/5">
                <img
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={featuredArticle.image}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="w-full md:w-2/5 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-[#eaddff] text-[#8E55FD] font-label-mono text-xs font-semibold uppercase rounded w-fit mb-3 tracking-wider">
                  {featuredArticle.tag}
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-[34px] lg:leading-[42px] font-bold text-[#1a1c1e] mb-3 group-hover:text-[#8E55FD] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="font-body-md text-sm sm:text-base text-[#4a4455] mb-6 line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="inline-flex items-center text-[#8E55FD] font-title-md font-semibold text-sm group-hover:text-[#7232E7] transition-colors w-fit gap-1.5">
                  Read Article
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Latest Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {gridArticles.map((article) => (
              <article
                key={article.id}
                id={`article-card-${article.slug}`}
                onClick={() => onSelectArticle(article)}
                className="group rounded-xl border border-[#e8e8eb] bg-white overflow-hidden hover-lift flex flex-col cursor-pointer shadow-xs"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-black/5">
                  <img
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={article.image}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-[#eaddff] text-[#8E55FD] font-label-mono text-xs font-semibold uppercase rounded w-fit mb-3 tracking-wider">
                      {article.tag}
                    </span>
                    <h3 className="font-title-md text-lg sm:text-xl font-bold text-[#1a1c1e] mb-2.5 group-hover:text-[#8E55FD] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="font-body-md text-sm text-[#4a4455] mb-4 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="text-[#8E55FD] font-body-md text-sm font-semibold group-hover:text-[#7232E7] transition-colors mt-auto inline-flex items-center gap-1">
                    Read more
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Explore Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
          <div className="border-t border-[#e8e8eb] pt-12 md:pt-16 text-center">
            <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1e] mb-8">
              Explore TravelGeared
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-6 py-3 border border-[#ccc3d7] rounded hover:bg-[#e8e8eb] transition-colors font-title-md text-sm font-semibold text-[#1a1c1e] cursor-pointer"
              >
                Travel Gear
              </button>
              <button
                onClick={() => onNavigate('guides')}
                className="px-6 py-3 border border-[#ccc3d7] rounded hover:bg-[#e8e8eb] transition-colors font-title-md text-sm font-semibold text-[#1a1c1e] cursor-pointer"
              >
                Buying Guides
              </button>
              <button
                onClick={() => onNavigate('reviews')}
                className="px-6 py-3 border border-[#ccc3d7] rounded hover:bg-[#e8e8eb] transition-colors font-title-md text-sm font-semibold text-[#1a1c1e] cursor-pointer"
              >
                Reviews
              </button>
            </div>
          </div>
        </section>

        {/* Subscription CTA */}
        <section className="bg-[#8E55FD] py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 text-center text-white select-none">
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
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded bg-white/15 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white focus:bg-white/25 font-body-md text-sm outline-none transition-all border border-white/20"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#141223] text-white font-title-md text-sm font-semibold rounded hover:bg-white hover:text-[#141223] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
