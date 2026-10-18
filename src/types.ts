export type PageRoute =
  | 'home'
  | 'category'
  | 'guides'
  | 'reviews'
  | 'blog'
  | 'about'
  | 'contact'
  | 'buying-guides';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  gridSpan?: {
    colSpan?: string;
    rowSpan?: string;
  };
}

export interface ProductAffiliateLink {
  retailer: string;
  url: string;
  price: number;
  inStock: boolean;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number;
  regularPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  specs: Record<string, string>;
  highlights: string[];
  featuredImage: string;
  images: string[];
  affiliateLinks: ProductAffiliateLink[];
  inStock: boolean;
  sku: string;
  isTopRated: boolean;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  tag?: string;
  category: string;
  excerpt: string;
  image: string;
  publishDate: string;
  readTime?: string;
  author: ArticleAuthor;
  featuredProducts?: string[];
  tags?: string[];
  content: string;
  filterCategory?: 'TRAVEL TIPS' | 'PACKING' | 'TRAVEL TECH' | 'TRAVEL COMFORT';
  isFeatured?: boolean;
}
