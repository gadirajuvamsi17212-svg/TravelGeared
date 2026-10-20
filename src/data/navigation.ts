import { SiteNavigationItem } from '../types';

export const MAIN_NAVIGATION: SiteNavigationItem[] = [
  {
    label: 'Travel Gear',
    href: '#shop',
    children: [
      { label: 'Travel Backpacks', href: '/category/travel-backpacks', description: 'Ergonomic carry-on and day packs' },
      { label: 'Luggage & Carry-Ons', href: '/category/luggage-carry-ons', description: 'Hardshell & spinner suitcases' },
      { label: 'Travel Organizers', href: '/category/travel-organizers', description: 'Compression cubes & tech pouches' },
      { label: 'Travel Tech & Gadgets', href: '/category/travel-tech-gadgets', description: 'Headphones, cables & mobile gear' },
      { label: 'Power & Charging', href: '/category/power-charging', description: 'GaN chargers & universal adapters' },
      { label: 'Travel Comfort', href: '/category/travel-comfort', description: 'Memory foam pillows & sleep kits' },
    ],
  },
  {
    label: 'Buying Guides',
    href: '#guides',
  },
  {
    label: 'Reviews',
    href: '/reviews',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];

export const FOOTER_SECTIONS = {
  travelGear: [
    { label: 'Travel Backpacks', href: '/category/travel-backpacks' },
    { label: 'Luggage & Carry-Ons', href: '/category/luggage-carry-ons' },
    { label: 'Travel Organizers', href: '/category/travel-organizers' },
    { label: 'Travel Tech & Gadgets', href: '/category/travel-tech-gadgets' },
    { label: 'Power & Charging', href: '/category/power-charging' },
    { label: 'Travel Comfort', href: '/category/travel-comfort' },
  ],
  explore: [
    { label: 'Buying Guides', href: '/buying-guides' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Blog', href: '/blog' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
};
