import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_ARTICLES } from '../../data/blogArticles';

export const GuidesSection: React.FC = () => {
  const navigate = useNavigate();

  // Get the latest articles
  const featuredArticles = [...BLOG_ARTICLES]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 lg:py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase tracking-wider text-[#8E55FD] font-semibold mb-2 block">
            Field Reports & Guides
          </span>
          <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-[32px] text-[#1a1c1e]">
            Expert Gear Reviews & Buying Guides
          </h2>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 font-title-md text-sm font-semibold text-[#8E55FD] hover:text-[#7a42ea] transition-colors"
        >
          <span>View all guides</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => navigate(`/blog/${article.slug || article.id}`)}
            className="group cursor-pointer bg-white rounded-2xl border border-[#ccc3d7] overflow-hidden hover:border-[#8E55FD] transition-all duration-300 hover:shadow-lg flex flex-col"
          >
            <div className="relative aspect-16/9 overflow-hidden bg-[#eeedf0]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-[#8E55FD] text-white font-label-mono text-[11px] font-semibold px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                {article.tag || article.category}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#7b7486] font-label-mono mb-3">
                  <span>{article.publishDate}</span>
                  <span>•</span>
                  <span>{article.readTime || '6 min read'}</span>
                </div>
                <h3 className="font-headline-lg font-bold text-lg text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors line-clamp-2 mb-3">
                  {article.title}
                </h3>
                <p className="font-body-md text-sm text-[#4a4455] line-clamp-3 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#eeedf0] flex items-center justify-between text-xs text-[#7b7486]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#8E55FD]">person</span>
                  <span className="font-medium text-[#1a1c1e]">{article.author.name}</span>
                </div>
                <span className="font-semibold text-[#8E55FD] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Read <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
