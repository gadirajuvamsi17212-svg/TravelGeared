import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoriesBento } from './CategoriesBento';
import { TopRatedGear } from './TopRatedGear';
import { GuidesSection } from './GuidesSection';
import { NewsletterSection } from './NewsletterSection';
import { Product, Article } from '../../types';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onSelectArticle: (article: Article) => void;
  savedProductIds: string[];
  onToggleSave: (productId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onSelectArticle,
  savedProductIds,
  onToggleSave,
}) => {
  return (
    <>
      <HeroSection />
      <CategoriesBento />
      <TopRatedGear
        onSelectProduct={onSelectProduct}
        savedProductIds={savedProductIds}
        onToggleSave={onToggleSave}
      />
      <GuidesSection onSelectArticle={onSelectArticle} />
      <NewsletterSection />
    </>
  );
};
