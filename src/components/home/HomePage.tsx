import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoriesBento } from './CategoriesBento';
import { GuidesSection } from './GuidesSection';
import { TopRatedGear } from './TopRatedGear';
import { NewsletterSection } from './NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      <HeroSection />
      <CategoriesBento />
      <GuidesSection />
      <TopRatedGear />
      <NewsletterSection />
    </main>
  );
};
