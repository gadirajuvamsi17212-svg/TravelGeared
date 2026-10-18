import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-luggage',
    name: 'Luggage & Carry-Ons',
    slug: 'luggage-carry-ons',
    description: 'Precision-engineered hardshells, lightweight carry-ons, and durable weekenders designed for maximum packing efficiency.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEhuji4iTj31MAN8-pU5JJn7Z4pRNrnV_5KdiJB4hDm7BcVsFPoCKMmYQGDZAyeoZH4uZ7A9Bd4xtFPStUhARD4eIQmtEGIg35TeWDzMKnWqpmsBTOws4k-hKeLG9Av4pl7wUPPcAtBbEVHHqdc5KH3qC9qb5P1XyW-zDcTiui-t3ed5iCqWWhVfErWGUEuP-o60E88sVmCC7k3a2ydbUSzcX9HBJi6hQ8QxCpFyws1fg_oNSHMo33dg',
    itemCount: 18,
    gridSpan: { colSpan: 'sm:col-span-2 md:col-span-2', rowSpan: 'row-span-1' },
  },
  {
    id: 'cat-backpacks',
    name: 'Travel Backpacks',
    slug: 'travel-backpacks',
    description: 'Ergonomic, weather-resistant, carry-on compliant packs built for one-bag international travel and daily commutes.',
    image: '/Blog images/Travelgeared Backpacks.png',
    itemCount: 24,
    gridSpan: { colSpan: 'sm:col-span-1 md:col-span-1', rowSpan: 'row-span-1' },
  },
  {
    id: 'cat-organizers',
    name: 'Packing Organizers',
    slug: 'packing-organizers',
    description: 'Compression cubes, tech pouches, and wash kits designed to bring modular architectural order to your bag.',
    image: '/tech-organizers.jpg',
    itemCount: 15,
    gridSpan: { colSpan: 'sm:col-span-1 md:col-span-1', rowSpan: 'row-span-1' },
  },
  {
    id: 'cat-tech',
    name: 'Travel Tech & Audio',
    slug: 'travel-tech-audio',
    description: 'Compact GaN chargers, ANC wireless headphones, portable speakers, and universal travel adapters.',
    image: '/Blog images/Portable Bluetooth Speaker.png',
    itemCount: 32,
    gridSpan: { colSpan: 'sm:col-span-2 md:col-span-2', rowSpan: 'row-span-1' },
  },
  {
    id: 'cat-accessories',
    name: 'Travel Essentials',
    slug: 'travel-essentials',
    description: 'Security wallets, neck pillows, luggage tags, and thoughtful travel comforts for long-haul journeys.',
    image: '/Blog images/04-travel-gear.png',
    itemCount: 20,
    gridSpan: { colSpan: 'sm:col-span-3 md:col-span-3', rowSpan: 'row-span-1' },
  },
];
