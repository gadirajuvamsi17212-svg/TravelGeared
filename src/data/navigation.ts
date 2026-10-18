export interface NavigationItem {
  label: string;
  href: string;
}

export const FOOTER_SECTIONS = {
  travelGear: [
    { label: 'Carry-On Luggage', href: '/category/luggage-carry-ons' },
    { label: 'Travel Backpacks', href: '/category/travel-backpacks' },
    { label: 'Packing Organizers', href: '/category/packing-organizers' },
    { label: 'Travel Tech & Audio', href: '/category/travel-tech-audio' },
    { label: 'Travel Essentials', href: '/category/travel-essentials' },
  ],
  explore: [
    { label: 'All Gear Reviews', href: '/guides' },
    { label: 'Travel Blog', href: '/blog' },
    { label: 'Travel Tips', href: '/blog' },
    { label: 'Packing Strategies', href: '/blog' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Editorial Policy', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/contact' },
  ],
};
