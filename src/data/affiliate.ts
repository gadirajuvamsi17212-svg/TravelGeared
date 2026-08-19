export interface RetailerConfig {
  name: string;
  tag: string;
  baseUrl: string;
  logoText: string;
  color: string;
}

export const RETAILERS: { [key: string]: RetailerConfig } = {
  amazon: {
    name: 'Amazon',
    tag: 'travelgeared-20',
    baseUrl: 'https://amazon.com',
    logoText: 'Amazon',
    color: '#FF9900',
  },
  rei: {
    name: 'REI Co-op',
    tag: 'tg_rei_partner',
    baseUrl: 'https://rei.com',
    logoText: 'REI',
    color: '#2B543D',
  },
  huckberry: {
    name: 'Huckberry',
    tag: 'tg_huckberry',
    baseUrl: 'https://huckberry.com',
    logoText: 'Huckberry',
    color: '#1F2937',
  },
  direct: {
    name: 'Official Brand Store',
    tag: 'direct',
    baseUrl: 'https://travelgeared.com',
    logoText: 'Direct',
    color: '#8E55FD',
  },
};

export const AFFILIATE_DISCLOSURE_SHORT = 'As an affiliate partner, we may earn commissions from qualifying purchases.';
export const AFFILIATE_DISCLOSURE_FULL = 'TravelGeared participates in various affiliate marketing programs, which means we may get paid commissions on editorially chosen products purchased through our links to retailer sites. Our editorial recommendations remain strictly unbiased and independent.';
