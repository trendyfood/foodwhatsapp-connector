
import { FoodItem } from '../types';

export const combosItems: FoodItem[] = [
  {
    id: '30',
    name: 'Special Jollof Rice - Turkey',
    description: '2 portions of Special Jollof rice, Turkey with Coldslaw.',
    price: 3500,
    image: '/lovable-uploads/amala.jpg',
    category: 'combos',
    tags: ['swallow', 'combo', 'Jollof', 'nigerian'],
    popular: true,
  },
  {
    id: '31',
    name: 'Fried Rice - Chicken Combo',
    description: 'Delicious fried rice with grilled chicken and vegetables',
    price: 3000,
    image: '/lovable-uploads/Fried-Rice1.jpg',
    category: 'combos',
    tags: ['rice', 'combo', 'chicken', 'nigerian'],
    popular: false,
  },
  {
    id: '32',
    name: 'Swallow & Soup Special',
    description: 'Your choice of swallow with any soup and assorted meat',
    price: 2800,
    image: '/lovable-uploads/poundedyam.webp',
    category: 'combos',
    tags: ['swallow', 'soup', 'combo', 'nigerian'],
    popular: true,
  },
];
