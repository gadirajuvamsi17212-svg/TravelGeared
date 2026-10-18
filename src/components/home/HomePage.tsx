import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { CategoriesBento } from './CategoriesBento';
import { PRODUCTS } from '../../data/products';
import { BLOG_ARTICLES } from '../../data/blogArticles';
import { Product } from '../../types';
import { Bookmark, Star, ArrowRight, ExternalLink } from 'lucide-react';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  savedProductIds: string[];
  onToggleSave: (productId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  savedProductIds,
  onToggleSave,
}) => {
  const navigate = useNavigate();

  // Top curated products
  const featuredProducts = PRODUCTS.slice(0, 6);
  // Latest 3 blog articles
  const latestArticles = BLOG_ARTICLES.slice(0, 3);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection onNavigate={(route) => navigate(`/${route}`)} />

      {/* 2. Categories Bento */}
      <CategoriesBento onSelectCategory={(cat) => navigate(`/category/${cat.slug}`)} />

      {/* 3. Featured Engineered Gear */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#8E55FD] block mb-2">
              Curated Equipment
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#1a1c1e]">
              Engineered Travel Gear
            </h2>
          </div>
          <p className="text-sm text-[#7b7486] max-w-md mt-2 sm:mt-0">
            Field-tested luggage, pack systems, and transit accessories optimized for durability and spatial efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => {
            const isSaved = savedProductIds.includes(product.id);
            const bestLink = product.affiliateLinks[0];

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl border border-[#ccc3d7]/60 overflow-hidden hover:border-[#8E55FD]/50 transition-all duration-300 hover:shadow-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 bg-[#f2eff6] overflow-hidden">
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1a1c1e] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-black/5">
                    {product.categoryName}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-[#8E55FD] text-white shadow-md'
                        : 'bg-white/80 text-[#4a4455] hover:text-[#8E55FD]'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                      <span className="text-xs font-bold ml-1 text-[#1a1c1e]">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-[#7b7486]">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-bold text-lg text-[#1a1c1e] hover:text-[#8E55FD] transition-colors cursor-pointer mb-2 line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4a4455] line-clamp-2 mb-4 flex-1">
                    {product.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-[#ccc3d7]/30 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-xs text-[#7b7486] block">Direct Price</span>
                      <span className="text-lg font-bold text-[#1a1c1e]">
                        {product.currency}{product.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#4a4455] hover:text-[#8E55FD] hover:bg-[#f2eff6] rounded-lg transition-colors cursor-pointer"
                      >
                        Specs
                      </button>
                      {bestLink && (
                        <a
                          href={bestLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3.5 py-1.5 bg-[#8E55FD] hover:bg-[#7b42ea] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                        >
                          <span>Buy</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Latest Travel Guides & Articles */}
      <section className="w-full bg-[#f2eff6]/60 py-12 md:py-20 border-t border-b border-[#ccc3d7]/40">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#8E55FD] block mb-2">
                Field Notes & Reviews
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[#1a1c1e]">
                Latest Guides & Travel Intel
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8E55FD] hover:text-[#7b42ea] transition-colors mt-3 sm:mt-0"
            >
              <span>View all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-[#ccc3d7]/60 overflow-hidden hover:border-[#8E55FD]/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-16/10 bg-[#e3e2e5] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-[#7b7486] mb-3">
                    <span className="font-semibold text-[#8E55FD] uppercase tracking-wider">
                      {article.tag}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors line-clamp-2 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a4455] line-clamp-3 mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="text-xs text-[#7b7486] pt-4 border-t border-[#ccc3d7]/30 flex items-center justify-between">
                    <span>By {article.author.name}</span>
                    <span>{article.publishDate}</span>
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
