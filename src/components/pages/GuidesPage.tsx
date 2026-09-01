import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICLES } from '../../data/articles';
import { Article, PageRoute } from '../../types';
import { useMetaRobots } from '../../hooks/useMetaRobots';

interface GuidesPageProps {
  onSelectArticle?: (article: Article) => void;
  onNavigate: (route: PageRoute) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  onNavigate,
}) => {
  useMetaRobots('noindex, follow');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Guide' | 'Review' | 'Strategy'>('all');
  const navigate = useNavigate();

  const handleArticleClick = (article: Article) => {
    const slug = article.slug || article.id;
    navigate(`/blog/${slug}`);
  };

  const filtered = ARTICLES.filter((a) =>
    selectedFilter === 'all' ? true : a.category === selectedFilter
  );

  return (
    <div className="w-full bg-[#faf9fc] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-label-mono text-[#7b7486] mb-6 flex-wrap">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#1a1c1e] font-semibold">Buying Guides &amp; Reviews</span>
        </div>

        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-[#eaddff] text-[#8E55FD] text-xs font-label-mono rounded-full mb-3 uppercase tracking-wider">
            Curated Knowledge
          </span>
          <h1 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-4xl text-[#8E55FD] mb-3">
            Expert Gear Reviews &amp; Buying Guides
          </h1>
          <p className="font-body-md text-[#4a4455] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            In-depth analysis, architectural teardowns, and rigorous hands-on testing to help you build the ultimate minimalist transit kit.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2">
          {(['all', 'Guide', 'Review', 'Strategy'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-title-md font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-[#8E55FD] text-white shadow-xs'
                  : 'bg-white text-[#4a4455] border border-[#ccc3d7] hover:border-[#8E55FD]'
              }`}
            >
              {filter === 'all' ? 'All Editorial Posts' : `${filter}s`}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((article) => (
            <div
              key={article.id}
              className="group bg-white rounded-xl border border-[#ccc3d7] overflow-hidden hover-lift hover:border-[#8E55FD] shadow-xs cursor-pointer flex flex-col justify-between"
              onClick={() => handleArticleClick(article)}
            >
              {/* Image Container - Dedicated and contains ONLY the image */}
              <div className="w-full h-auto md:h-56 lg:h-64 overflow-hidden bg-[#e3e2e5]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto md:h-full object-contain md:object-cover transition-transform duration-700 group-hover:scale-105 select-none block"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content Container - Completely below the image */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#f5effb] text-[#8E55FD] font-label-mono text-xs rounded uppercase tracking-wider font-semibold">
                      {article.tag}
                    </span>
                    <span className="text-xs font-label-mono text-[#7b7486]">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-headline-lg font-bold text-xl text-[#1a1c1e] group-hover:text-[#8E55FD] transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="font-body-md text-sm text-[#4a4455] mb-4 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#eeedf0] text-xs text-[#7b7486]">
                  <span>By {article.author.name}</span>
                  <div className="inline-flex items-center gap-1 font-label-mono text-xs font-bold uppercase tracking-wider text-[#8E55FD] group-hover:text-[#7232E7] transition-colors">
                    Read Guide
                    <span className="material-symbols-outlined text-sm icon-slide-right">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
