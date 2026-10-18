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
  affiliateLinks: {
    retailer: string;
    url: string;
    price: number;
    inStock?: boolean;
    primeEligible?: boolean;
    shippingNote?: string;
    badge?: string;
  }[];
  badge?: string;
  tag?: string;
  score?: number;
  inStock?: boolean;
  sku?: string;
  isTopRated?: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  tag: string;
  filterCategory?: string;
  category: string;
  excerpt: string;
  image: string;
  publishDate: string;
  readTime?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredProducts?: string[];
  tags?: string[];
  content: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  itemCount?: number;
  icon?: string;
  gridSpan?: {
    colSpan?: string;
    rowSpan?: string;
  };
}

export type PageRoute = 'home' | 'categories' | 'category' | 'guides' | 'blog' | 'blog-detail' | 'about' | 'contact' | 'product';
