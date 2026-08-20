import React from 'react';
import { ARTICLES } from '../../data/articles';
import { Article, PageRoute } from '../../types';

interface GuidesSectionProps {
  onSelectArticle: (article: Article) => void;
  onNavigate?: (route: PageRoute) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({
  onSelectArticle,
  onNavigate,
}) => {
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
        {featuredArticles.map((article, idx) => {
          const isPrimaryTag = idx === 0;

          return (
            <a
              key={article.id}
              id={`article-card-${article.slug}`}
              className="group relative rounded-xl overflow-hidden h-72 sm:h-80 hover-lift block shadow-md cursor-pointer"
              href={`/guides/${article.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectArticle(article);
              }}
            >
              {/* Background Image */}
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              
              {/* Subtle Dark Gradient Overlay from bottom upward */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(10, 8, 16, 0.90) 0%, rgba(10, 8, 16, 0.50) 50%, rgba(10, 8, 16, 0.15) 100%)'
                }}
              />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full z-10">
                <span
                  className={`inline-block px-3 py-1 font-label-mono text-xs font-semibold rounded mb-2.5 uppercase tracking-wider ${
                    isPrimaryTag
                      ? 'bg-[#8E55FD]/90 text-white'
                      : 'bg-[#faf9fc]/90 text-[#1a1c1e]'
                  }`}
                >
                  {article.tag}
                </span>
                <h3 className="font-headline-lg text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#d2bcff] transition-colors">
                  {article.title}
                </h3>
                <p className="font-body-md text-[#e3e2e5] max-w-[480px] line-clamp-2 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
