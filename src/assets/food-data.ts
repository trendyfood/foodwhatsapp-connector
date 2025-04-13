
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  popular: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'rice',
    name: 'Rice',
    icon: '🍚',
  },
  {
    id: 'soup',
    name: 'Soup',
    icon: '🍲',
  },
  {
    id: 'swallow',
    name: 'Swallow',
    icon: ' 🥗',
  },
  {
    id: 'meat',
    name: 'Meat',
    icon: '🥩',
  },
  {
    id: 'fish',
    name: 'Fish',
    icon: '🐟',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    icon: '🍗',
  }
];

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Jollof Rice',
    description: 'Delicious Nigerian Jollof rice with assorted meat, served with plantain.',
    price: 2500,
    image: '/lovable-uploads/istockphoto-2171624928-612x612.webp',
    category: 'rice',
    tags: ['rice', 'spicy', 'nigerian'],
    popular: true,
  },
  {
    id: '15',
    name: 'White Rice',
    description: 'Delicious Nigerian white rice with assorted meat, served with plantain.',
    price: 2500,
    image: '/lovable-uploads/0a44627c-3803-4029-9652-1baca80baf6f.jpg',
    category: 'rice',
    tags: ['rice', 'spicy', 'nigerian'],
    popular: true,
  },
  {
    id: '2',
    name: 'Fried Rice',
    description: 'Fragrant rice cooked with coconut milk, served with grilled chicken.',
    price: 2300,
    image: '/lovable-uploads/Fried-Rice1.jpg',
    category: 'rice',
    tags: ['rice', 'Fried', 'nigerian'],
    popular: false,
  },
  {
    id: '13',
    name: 'Ofada Rice',
    description: 'Traditional Nigerian brown rice served with spicy Ofada sauce, assorted meat and vegetables.',
    price: 2800,
    image: '/lovable-uploads/ofadaric.jpg',
    category: 'rice',
    tags: ['rice', 'traditional', 'nigerian'],
    popular: false,
  },
  {
    id: '3',
    name: 'Egusi Soup',
    description: 'Rich Nigerian soup made with ground melon seeds, vegetables, and assorted meat.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1200&auto=format&fit=crop',
    category: 'soup',
    tags: ['soup', 'egusi', 'nigerian'],
    popular: true,
  },
  {
    id: '6',
    name: 'Amala',
    description: 'Soft swallow made from yam flour, dark in color and delicious with any soup.',
    price: 800,
    image: '/lovable-uploads/amala.jpg',
    category: 'swallow',
    tags: ['swallow', 'amala', 'nigerian'],
    popular: false,
  },
  {
    id: '14',
    name: 'Semo',
    description: 'Soft swallow made from yam flour, dark in color and delicious with any soup.',
    price: 800,
    image: '/lovable-uploads/semo.webp',
    category: 'swallow',
    tags: ['swallow', 'amala', 'nigerian'],
    popular: false,
  },
  {
    id: '9',
    name: 'Grilled Fish',
    description: 'Fresh fish grilled with aromatic herbs and spices, served with fried plantain.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop',
    category: 'fish',
    tags: ['fish', 'grilled', 'seafood'],
    popular: false,
  },
  {
    id: '16',
    name: 'Moi Moi',
    description: 'Steamed bean pudding made from blended beans, peppers, and spices.',
    price: 500,
    image: '/lovable-uploads/moi-moi.jpg',
    category: 'soup',
    tags: ['beans', 'steamed', 'nigerian'],
    popular: false,
  },
  {
    id: '17',
    name: 'Pomo',
    description: 'Nigerian cow skin delicacy, usually served with soup or as a side dish.',
    price: 500,
    image: '/lovable-uploads/pomo.jpg',
    category: 'meat',
    tags: ['meat', 'traditional', 'nigerian'],
    popular: false,
  },
  {
    id: '18',
    name: 'Fried Plantain',
    description: 'Sweet ripe plantain slices fried until golden brown.',
    price: 500,
    image: '/lovable-uploads/plantain.jpg',
    category: 'swallow',
    tags: ['plantain', 'fried', 'side dish'],
    popular: false,
  },
  {
    id: '19',
    name: 'Spaghetti',
    description: 'Nigerian style spaghetti, cooked with tomato sauce and spices.',
    price: 500,
    image: '/lovable-uploads/spag.jpg',
    category: 'rice',
    tags: ['pasta', 'spicy', 'nigerian'],
    popular: false,
  },
  {
    id: '20',
    name: 'Fried Beef',
    description: 'Tender beef chunks marinated and fried with Nigerian spices.',
    price: 500,
    image: '/lovable-uploads/fried_beef.jpg',
    category: 'meat',
    tags: ['beef', 'fried', 'nigerian'],
    popular: false,
  },
  {
    id: '21',
    name: 'Chicken Wings',
    description: 'Crispy fried chicken wings with Nigerian seasoning.',
    price: 500,
    image: '/lovable-uploads/chicken_wing.jpg',
    category: 'chicken',
    tags: ['chicken', 'fried', 'appetizer'],
    popular: false,
  },
];
