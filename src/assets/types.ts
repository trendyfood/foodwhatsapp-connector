
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  popular: boolean | string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
