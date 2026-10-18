import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-backpacks',
    name: 'Travel Backpacks',
    slug: 'travel-backpacks',
    description:
      'Ergonomic, weather-resistant carry-on backpacks engineered for digital nomads, commuters, and long-range travel.',
    image: '/Blog images/Travelgeared Backpacks.png',
    itemCount: 18,
    gridSpan: {
      colSpan: 'sm:col-span-1 md:col-span-1',
      rowSpan: 'row-span-1 md:row-span-2',
    },
  },
  {
    id: 'cat-luggage',
    name: 'Luggage & Carry-Ons',
    slug: 'luggage-carry-ons',
    description:
      'Aerospace-grade hardshell suitcases and whisper-quiet spinner luggage engineered for rigorous transit.',
    image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=800&q=80',
    itemCount: 12,
    gridSpan: {
      colSpan: 'sm:col-span-1 md:col-span-1',
      rowSpan: 'row-span-1',
    },
  },
  {
    id: 'cat-tech',
    name: 'Travel Tech & Gadgets',
    slug: 'travel-tech-gadgets',
    description:
      'Noise-canceling headphones, universal global adapters, and precision electronics to keep you connected.',
    image: '/Blog images/Portable Bluetooth Speaker.png',
    itemCount: 24,
    gridSpan: {
      colSpan: 'sm:col-span-1 md:col-span-1',
      rowSpan: 'row-span-1',
    },
  },
  {
    id: 'cat-organizers',
    name: 'Travel Organizers',
    slug: 'travel-organizers',
    description:
      'Ultralight compression cubes, tech pouches, and dopp kits that eliminate chaotic baggage.',
    image: '/tech-organizers.jpg',
    itemCount: 15,
    gridSpan: {
      colSpan: 'sm:col-span-1 md:col-span-1',
      rowSpan: 'row-span-1',
    },
  },
  {
    id: 'cat-power',
    name: 'Power & Charging',
    slug: 'power-charging',
    description:
      'Compact GaN fast chargers, magnetic power banks, and universal voltage converters.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',
    itemCount: 14,
    gridSpan: {
      colSpan: 'sm:col-span-1 md:col-span-1',
      rowSpan: 'row-span-1',
    },
  },
  {
    id: 'cat-comfort',
    name: 'Travel Comfort',
    slug: 'travel-comfort',
    description:
      'Orthopedic memory foam neck pillows, sleep masks, and in-flight wellness accessories.',
    image: 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
    gridSpan: {
      colSpan: 'sm:col-span-1 md:col-span-1',
      rowSpan: 'row-span-1',
    },
  },
];
