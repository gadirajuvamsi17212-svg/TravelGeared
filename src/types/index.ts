export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featured: boolean;
  gridSpan?: {
    colSpan?: string;
    rowSpan?: string;
  };
}

export interface AffiliateLink {
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
  specs: { [key: string]: string };
  highlights: string[];
  images: string[];
  featuredImage: string;
  affiliateLinks: AffiliateLink[];
  inStock: boolean;
  sku: string;
  isTopRated?: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  tag: string;
  category: 'Review' | 'Guide' | 'Strategy' | 'Comparison';
  excerpt: string;
  content: string;
  image: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredProducts?: string[]; // Product IDs
  tags?: string[];
}

export interface SiteNavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
  badge?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export type PageRoute = 
  | 'home'
  | 'category'
  | 'guides'
  | 'reviews'
  | 'blog'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'coming-soon';
