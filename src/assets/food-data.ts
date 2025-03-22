
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
    id: 'burgers',
    name: 'Rice',
    icon: '🍚',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: '🍕',
  },
  {
    id: 'sushi',
    name: 'Sushi',
    icon: '🍣',
  },
  {
    id: 'pasta',
    name: 'Pasta',
    icon: '🍝',
  },
  {
    id: 'salads',
    name: 'Salads',
    icon: '🥗',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    icon: '🥤',
  }
];

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Jollof Rice',
    description: 'Delicious Nigerian Jollof rice with assorted meat, served with plantain.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1634649083038-c9f93e578d17?q=80&w=1200&auto=format&fit=crop',
    category: 'burgers',
    tags: ['rice', 'spicy', 'nigerian'],
    popular: true,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Traditional Italian pizza with pepperoni, mozzarella and tomato sauce on a thin crust.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1200&auto=format&fit=crop',
    category: 'pizza',
    tags: ['italian', 'cheese', 'pepperoni'],
    popular: true,
  },
  {
    id: '3',
    name: 'Salmon Avocado Roll',
    description: 'Fresh salmon and avocado sushi roll with a touch of wasabi and soy sauce.',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop',
    category: 'sushi',
    tags: ['seafood', 'fresh', 'japanese'],
    popular: true,
  },
  {
    id: '4',
    name: 'Creamy Pasta',
    description: 'Creamy pasta with grilled chicken, parmesan cheese and fresh herbs.',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1200&auto=format&fit=crop',
    category: 'pasta',
    tags: ['creamy', 'cheese', 'italian'],
    popular: false,
  },
  {
    id: '5',
    name: 'Garden Salad',
    description: 'Fresh mixed greens with cucumber, tomatoes, carrots and vinaigrette dressing.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
    category: 'salads',
    tags: ['healthy', 'vegetarian', 'fresh'],
    popular: false,
  },
  {
    id: '6',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with creamy frosting, served with vanilla ice cream.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1631206743332-8c0caee09ff3?q=80&w=1200&auto=format&fit=crop',
    category: 'desserts',
    tags: ['chocolate', 'sweet', 'dessert'],
    popular: true,
  },
  {
    id: '7',
    name: 'Chapman Drink',
    description: 'Refreshing Nigerian cocktail made with Grenadine, Angostura bitters, and citrus flavors.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1621263824894-02b7885f82d3?q=80&w=1200&auto=format&fit=crop',
    category: 'drinks',
    tags: ['sweet', 'refreshing', 'nigerian'],
    popular: false,
  },
  {
    id: '8',
    name: 'Fried Rice',
    description: 'Nigerian style fried rice with mixed vegetables, chicken and shrimp.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200&auto=format&fit=crop',
    category: 'burgers',
    tags: ['rice', 'nigerian', 'seafood'],
    popular: false,
  },
  {
    id: '9',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, basil and olive oil.',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1604917877934-07d8d408d494?q=80&w=1200&auto=format&fit=crop',
    category: 'pizza',
    tags: ['vegetarian', 'cheese', 'italian'],
    popular: true,
  },
  {
    id: '10',
    name: 'California Roll',
    description: 'Delicious sushi roll with crab, avocado, cucumber and tobiko.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop',
    category: 'sushi',
    tags: ['seafood', 'california', 'japanese'],
    popular: false,
  },
  {
    id: '11',
    name: 'Spaghetti Bolognese',
    description: 'Traditional Italian pasta with rich beef sauce, herbs and parmesan cheese.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1200&auto=format&fit=crop',
    category: 'pasta',
    tags: ['beef', 'italian', 'tomato'],
    popular: true,
  },
  {
    id: '12',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan cheese, croutons, and our homemade Caesar dressing.',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1200&auto=format&fit=crop',
    category: 'salads',
    tags: ['classic', 'cheese', 'fresh'],
    popular: true,
  }
];
