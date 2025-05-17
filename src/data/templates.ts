
import { TripTemplate } from '@/types';

export const tripTemplates: TripTemplate[] = [
  {
    id: 'beach-vacation',
    name: 'Beach Vacation',
    description: 'Perfect for sunny beach getaways',
    categories: [
      {
        name: 'Clothing',
        items: [
          { name: 'Swimsuits', quantity: 2 },
          { name: 'Sunglasses', quantity: 1 },
          { name: 'Flip flops', quantity: 1 },
          { name: 'T-shirts', quantity: 5 },
          { name: 'Shorts', quantity: 3 },
          { name: 'Light dress', quantity: 2 },
          { name: 'Hat', quantity: 1 },
        ],
      },
      {
        name: 'Toiletries',
        items: [
          { name: 'Sunscreen', quantity: 1 },
          { name: 'After-sun lotion', quantity: 1 },
          { name: 'Toothbrush', quantity: 1 },
          { name: 'Toothpaste', quantity: 1 },
          { name: 'Shampoo', quantity: 1 },
          { name: 'Conditioner', quantity: 1 },
        ],
      },
      {
        name: 'Beach Gear',
        items: [
          { name: 'Beach towel', quantity: 1 },
          { name: 'Beach bag', quantity: 1 },
          { name: 'Water bottle', quantity: 1 },
          { name: 'Book', quantity: 1 },
          { name: 'Waterproof phone case', quantity: 1 },
        ],
      },
      {
        name: 'Essentials',
        items: [
          { name: 'Passport', quantity: 1 },
          { name: 'Phone charger', quantity: 1 },
          { name: 'Wallet', quantity: 1 },
          { name: 'Power bank', quantity: 1 },
        ],
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'business-trip',
    name: 'Business Trip',
    description: 'For professional travel and meetings',
    categories: [
      {
        name: 'Clothing',
        items: [
          { name: 'Business suits', quantity: 2 },
          { name: 'Dress shirts', quantity: 3 },
          { name: 'Formal shoes', quantity: 1 },
          { name: 'Ties', quantity: 2 },
          { name: 'Belt', quantity: 1 },
          { name: 'Socks', quantity: 3 },
          { name: 'Underwear', quantity: 3 },
        ],
      },
      {
        name: 'Technology',
        items: [
          { name: 'Laptop', quantity: 1 },
          { name: 'Laptop charger', quantity: 1 },
          { name: 'Phone', quantity: 1 },
          { name: 'Phone charger', quantity: 1 },
          { name: 'Headphones', quantity: 1 },
          { name: 'Portable mouse', quantity: 1 },
        ],
      },
      {
        name: 'Documents',
        items: [
          { name: 'Business cards', quantity: 10 },
          { name: 'Notebook', quantity: 1 },
          { name: 'Pen', quantity: 2 },
          { name: 'Passport', quantity: 1 },
          { name: 'ID Card', quantity: 1 },
          { name: 'Hotel booking', quantity: 1 },
        ],
      },
      {
        name: 'Toiletries',
        items: [
          { name: 'Toothbrush', quantity: 1 },
          { name: 'Toothpaste', quantity: 1 },
          { name: 'Deodorant', quantity: 1 },
          { name: 'Razor', quantity: 1 },
          { name: 'Hair products', quantity: 1 },
        ],
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'camping-trip',
    name: 'Camping Trip',
    description: 'For outdoor adventures in nature',
    categories: [
      {
        name: 'Shelter & Sleep',
        items: [
          { name: 'Tent', quantity: 1 },
          { name: 'Sleeping bag', quantity: 1 },
          { name: 'Pillow', quantity: 1 },
          { name: 'Sleeping pad', quantity: 1 },
          { name: 'Tarp', quantity: 1 },
        ],
      },
      {
        name: 'Cooking & Food',
        items: [
          { name: 'Cooler', quantity: 1 },
          { name: 'Portable stove', quantity: 1 },
          { name: 'Cooking fuel', quantity: 1 },
          { name: 'Cooking pot', quantity: 1 },
          { name: 'Pan', quantity: 1 },
          { name: 'Utensils', quantity: 1 },
          { name: 'Water bottle', quantity: 1 },
        ],
      },
      {
        name: 'Clothing',
        items: [
          { name: 'Hiking boots', quantity: 1 },
          { name: 'Warm jacket', quantity: 1 },
          { name: 'Pants', quantity: 2 },
          { name: 'T-shirts', quantity: 3 },
          { name: 'Long sleeve shirts', quantity: 2 },
          { name: 'Warm hat', quantity: 1 },
          { name: 'Wool socks', quantity: 3 },
        ],
      },
      {
        name: 'Tools & Safety',
        items: [
          { name: 'Pocket knife', quantity: 1 },
          { name: 'Flashlight', quantity: 1 },
          { name: 'Extra batteries', quantity: 1 },
          { name: 'First aid kit', quantity: 1 },
          { name: 'Map', quantity: 1 },
          { name: 'Compass', quantity: 1 },
          { name: 'Fire starter', quantity: 1 },
        ],
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'international-trip',
    name: 'International Trip',
    description: 'For traveling abroad',
    categories: [
      {
        name: 'Important Documents',
        items: [
          { name: 'Passport', quantity: 1 },
          { name: 'Visa', quantity: 1 },
          { name: 'Travel insurance', quantity: 1 },
          { name: 'Flight tickets', quantity: 1 },
          { name: 'Hotel reservations', quantity: 1 },
          { name: 'International driving permit', quantity: 1 },
          { name: 'Vaccination records', quantity: 1 },
        ],
      },
      {
        name: 'Health & Safety',
        items: [
          { name: 'Medications', quantity: 1 },
          { name: 'First aid kit', quantity: 1 },
          { name: 'Hand sanitizer', quantity: 1 },
          { name: 'Face masks', quantity: 5 },
          { name: 'Travel adapters', quantity: 2 },
          { name: 'Travel insurance info', quantity: 1 },
        ],
      },
      {
        name: 'Technology',
        items: [
          { name: 'Phone', quantity: 1 },
          { name: 'Phone charger', quantity: 1 },
          { name: 'Camera', quantity: 1 },
          { name: 'Camera charger', quantity: 1 },
          { name: 'Power bank', quantity: 1 },
          { name: 'Travel adapter', quantity: 1 },
        ],
      },
      {
        name: 'Clothing',
        items: [
          { name: 'Weather appropriate clothes', quantity: 1 },
          { name: 'Comfortable walking shoes', quantity: 1 },
          { name: 'Formal outfit', quantity: 1 },
          { name: 'Sleepwear', quantity: 1 },
          { name: 'Underwear', quantity: 7 },
          { name: 'Socks', quantity: 7 },
        ],
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format&fit=crop',
  },
];
