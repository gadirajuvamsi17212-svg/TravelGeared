import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICLES } from '../../data/articles';
import { Article, PageRoute } from '../../types';

interface GuidesSectionProps {
  onSelectArticle?: (article: Article) => void;
  onNavigate?: (route: PageRoute) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = () => {
  const navigate = useNavigate();
  const featuredArticles = ARTICLES.slice(0, 2);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 lg:py-24" id="guides">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-14">
        <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-[32px] md:leading-[40px] mb-3 text-[#8E55FD]">
          Expert Gear Reviews &amp; Buying Guides
        </h2>
        <p className="font-body-md text-sm sm:text-base text-[#4a4455] max-w-xl mx-auto leading-relaxed">
          In-depth analysis and hands-on testing to help you build the perfect travel kit.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {featuredArticles.map((article) => {
          const isTargetCard =
            article.slug === '7-best-portable-bluetooth-speakers-for-travel-2026' ||
            article.id === 'art-best-bluetooth-speakers-travel-2026' ||
            article.id === 'blog-best-bluetooth-speakers-travel-2026';

          return (
            <div
              key={article.id}
              id={`article-card-${article.slug}`}
              className="group bg-white rounded-xl border border-[#ccc3d7] overflow-hidden hover:border-[#8E55FD] hover-lift transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xs"
              onClick={() => {
                navigate(`/blog/${article.slug || article.id}`);
              }}
            >
              {/* Image Container - Dedicated and contains ONLY the image */}
              <div
                className={`overflow-hidden bg-[#e3e2e5] ${
                  isTargetCard
                    ? 'w-[330.24px] max-w-full h-[218px] mx-auto flex items-center justify-center md:w-full md:h-[296px] md:max-w-none md:block'
                    : 'w-full h-auto md:h-[296px]'
                }`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className={`transition-transform duration-700 group-hover:scale-105 select-none block ${
                    isTargetCard
                      ? 'w-[333.24px] h-[222px] max-w-none object-contain md:w-full md:h-[296px] md:max-w-full md:object-cover'
                      : 'w-full h-auto md:h-[296px] object-contain md:object-cover'
                  }`}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (article.id === 'art-tech-organizers') {
                      target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTmIF9yEPMuZ8M4ReWgUABOYB5p4Ljz9pZdFHidgG5kmf3R-xtAMVxW5zW6tTJjhjhX07pZVt2tb_QJWWKBgNjgQfmfHWGNyBUZq4vHs3_sfEwkfB-E1_eChVq6WJfV9r2UoUSwRbyWXUozt7mBQccQzhY2AiR226vjuP-t1lwSbs-Co4DvoGcuscgCQB0ZJMy8xERO7UJNB_1kXowcjFP8hhVXRv6ISTBOTaYeJAU0NueJ8bbRZJKyw';
                    } else if (article.id === 'art-one-bag-life') {
                      target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm99hPX7pBgs3XKZjyyGD6AfjL0p0TXKUr-jC2bkFc8Iyp4K2I1UG_L_H1gVVT4ItAG5tJBjX07up-HOgt8l2cdbOhhuxh0LJaWVWPSfG2WPZjKH5LDE52wkWodoykxvvDs4P36nC8nJw5fm3_xKthYLau-qlcnoOyBtykWV1nBUF3VQ4cogKEHcC7ITJnU0-9GQn6sHmq9JRldDN6Gf9pEMkqXTCVJmKi6CJlDrJ3kAyak6WzCFNBqg';
                    }
                  }}
                />
              </div>

              {/* Content Container - Completely below the image */}
              <div
                className={`p-6 flex-1 flex flex-col justify-between bg-white ${
                  isTargetCard ? 'max-md:h-[240px] md:h-auto' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-block px-3 py-1 font-label-mono text-xs font-semibold rounded uppercase tracking-wider bg-[#f5effb] text-[#8E55FD]">
                      {article.tag}
                    </span>
                    <span className="font-label-mono text-xs text-[#7b7486]">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-xl font-bold text-[#1a1c1e] mb-2 leading-tight group-hover:text-[#8E55FD] transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-body-md text-[#4a4455] line-clamp-2 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 font-label-mono text-xs font-bold uppercase tracking-wider text-[#8E55FD] group-hover:text-[#7232E7] transition-colors pt-3 border-t border-[#eeedf0]">
                  Read Guide
                  <span className="material-symbols-outlined text-sm icon-slide-right">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
