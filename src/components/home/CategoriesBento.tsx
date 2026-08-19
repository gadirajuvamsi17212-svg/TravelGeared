import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { Category, PageRoute } from '../../types';

interface CategoriesBentoProps {
  onSelectCategory?: (category: Category) => void;
  onNavigate?: (route: PageRoute, slug?: string) => void;
}

export const CategoriesBento: React.FC<CategoriesBentoProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  const handleCategoryClick = (category: Category, e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    if (onNavigate) {
      onNavigate('category', category.slug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-20 lg:py-24" id="shop">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-14">
        <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-[32px] md:leading-[40px] mb-3 text-[#8E55FD]">
          Shop Premium Travel Accessories
        </h2>
        <p className="font-body-md text-sm sm:text-base text-[#4a4455] max-w-xl mx-auto leading-relaxed">
          Precision-engineered tools categorized for the analytical traveler. Optimize every aspect of your journey.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px] sm:auto-rows-[240px]">
        {CATEGORIES.map((cat) => {
          const colSpan = cat.gridSpan?.colSpan || '';
          const rowSpan = cat.gridSpan?.rowSpan || '';
          
          return (
            <a
              key={cat.id}
              id={`category-card-${cat.slug}`}
              className={`group relative ${colSpan} ${rowSpan} rounded-xl overflow-hidden border border-[#ccc3d7] hover-lift bg-white cursor-pointer block shadow-xs`}
              href={`/category/${cat.slug}`}
              onClick={(e) => handleCategoryClick(cat, e)}
              aria-label={`Shop ${cat.name} Category`}
            >
              <div className="h-full flex flex-col w-full">
                <div className="flex-1 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                  {/* Inner gradient shadow at bottom to make badge pop */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 bg-[#8E55FD] px-4 py-2 z-10 rounded-full shadow-md">
                  <h3 className="font-title-md text-sm sm:text-base md:text-[18px] font-semibold text-white tracking-normal">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
