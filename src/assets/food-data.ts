
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
    icon: '🫓',
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
    image: 'https://images.unsplash.com/photo-1634649083038-c9f93e578d17?q=80&w=1200&auto=format&fit=crop',
    category: 'rice',
    tags: ['rice', 'spicy', 'nigerian'],
    popular: true,
  },
  {
    id: '2',
    name: 'Coconut Rice',
    description: 'Fragrant rice cooked with coconut milk, served with grilled chicken.',
    price: 2300,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    category: 'rice',
    tags: ['rice', 'coconut', 'nigerian'],
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
    id: '4',
    name: 'Okra Soup',
    description: 'Delicious Nigerian okra soup with assorted meat and fish, rich in flavor.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
    category: 'soup',
    tags: ['soup', 'okra', 'nigerian'],
    popular: false,
  },
  {
    id: '5',
    name: 'Pounded Yam',
    description: 'Smooth, stretchy swallow made from pounded yam, perfect with any Nigerian soup.',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1605280863572-270376ca90b7?q=80&w=1200&auto=format&fit=crop',
    category: 'swallow',
    tags: ['swallow', 'yam', 'nigerian'],
    popular: true,
  },
  {
    id: '6',
    name: 'Amala',
    description: 'Soft swallow made from yam flour, dark in color and delicious with any soup.',
    price: 800,
    image: 'https://images.unsplash.com/photo-1596097635121-a2ddb3d2d04b?q=80&w=1200&auto=format&fit=crop',
    category: 'swallow',
    tags: ['swallow', 'amala', 'nigerian'],
    popular: false,
  },
  {
    id: '7',
    name: 'Pepper Soup Meat',
    description: 'Spicy Nigerian pepper soup with tender chunks of goat meat and traditional spices.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962fd?q=80&w=1200&auto=format&fit=crop',
    category: 'meat',
    tags: ['meat', 'spicy', 'nigerian'],
    popular: true,
  },
  {
    id: '8',
    name: 'Suya',
    description: 'Spicy skewered meat, marinated and grilled to perfection with yaji spice.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
    category: 'meat',
    tags: ['meat', 'spicy', 'street food'],
    popular: true,
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
    id: '10',
    name: 'Catfish Pepper Soup',
    description: 'Spicy and aromatic soup with fresh catfish, herbs and traditional spices.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1548410499-17b9b3dbc781?q=80&w=1200&auto=format&fit=crop',
    category: 'fish',
    tags: ['fish', 'soup', 'spicy'],
    popular: true,
  },
  {
    id: '11',
    name: 'Grilled Chicken',
    description: 'Perfectly grilled chicken marinated in special spices, served with a side of sauce.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1588167432283-5a22475c908a?q=80&w=1200&auto=format&fit=crop',
    category: 'chicken',
    tags: ['chicken', 'grilled', 'protein'],
    popular: true,
  },
  {
    id: '12',
    name: 'Chicken Stew',
    description: 'Delicious Nigerian chicken stew made with tomatoes, peppers and traditional spices.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop',
    category: 'chicken',
    tags: ['chicken', 'stew', 'nigerian'],
    popular: false,
  }
];
