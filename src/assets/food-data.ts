
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
    name: 'Burgers',
    icon: '🍔',
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
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheddar, fresh lettuce, tomato, and our secret sauce.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
    category: 'burgers',
    tags: ['beef', 'cheese', 'classic'],
    popular: true,
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a thin crust.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604917877934-07d8d408d494?q=80&w=1200&auto=format&fit=crop',
    category: 'pizza',
    tags: ['vegetarian', 'cheese', 'italian'],
    popular: true,
  },
  {
    id: '3',
    name: 'Salmon Avocado Roll',
    description: 'Fresh salmon and avocado sushi roll with a touch of wasabi and soy sauce.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop',
    category: 'sushi',
    tags: ['seafood', 'fresh', 'japanese'],
    popular: true,
  },
  {
    id: '4',
    name: 'Fettuccine Alfredo',
    description: 'Creamy fettuccine pasta with parmesan cheese and fresh herbs.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=1200&auto=format&fit=crop',
    category: 'pasta',
    tags: ['creamy', 'cheese', 'italian'],
    popular: false,
  },
  {
    id: '5',
    name: 'Mediterranean Salad',
    description: 'Fresh mixed greens with feta cheese, olives, tomatoes, and balsamic vinaigrette.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
    category: 'salads',
    tags: ['healthy', 'vegetarian', 'fresh'],
    popular: false,
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1631206743332-8c0caee09ff3?q=80&w=1200&auto=format&fit=crop',
    category: 'desserts',
    tags: ['chocolate', 'sweet', 'hot'],
    popular: true,
  },
  {
    id: '7',
    name: 'Strawberry Smoothie',
    description: 'Refreshing smoothie made with fresh strawberries, yogurt, and a hint of honey.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7d3be1d?q=80&w=1200&auto=format&fit=crop',
    category: 'drinks',
    tags: ['sweet', 'refreshing', 'fruit'],
    popular: false,
  },
  {
    id: '8',
    name: 'Veggie Deluxe Burger',
    description: 'Plant-based patty with avocado, grilled vegetables, and vegan mayo.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=1200&auto=format&fit=crop',
    category: 'burgers',
    tags: ['vegetarian', 'healthy', 'plant-based'],
    popular: false,
  },
  {
    id: '9',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni pizza with mozzarella cheese and our special tomato sauce.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1200&auto=format&fit=crop',
    category: 'pizza',
    tags: ['meat', 'cheese', 'classic'],
    popular: true,
  },
  {
    id: '10',
    name: 'Dragon Roll',
    description: 'Delicious sushi roll with shrimp tempura, avocado, and spicy mayo.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop',
    category: 'sushi',
    tags: ['seafood', 'spicy', 'japanese'],
    popular: false,
  },
  {
    id: '11',
    name: 'Spaghetti Carbonara',
    description: 'Traditional Italian pasta with eggs, cheese, pancetta, and black pepper.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1200&auto=format&fit=crop',
    category: 'pasta',
    tags: ['creamy', 'meat', 'italian'],
    popular: true,
  },
  {
    id: '12',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan cheese, croutons, and our homemade Caesar dressing.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1200&auto=format&fit=crop',
    category: 'salads',
    tags: ['classic', 'cheese', 'fresh'],
    popular: true,
  }
];
