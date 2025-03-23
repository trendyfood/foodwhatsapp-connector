
import React from 'react';
import FoodCard from './FoodCard';
import { FoodItem } from '@/assets/food-data';

interface PopularItemsProps {
  popularItems: FoodItem[];
}

const PopularItems: React.FC<PopularItemsProps> = ({ popularItems }) => {
  return (
    <section id="popular" className="py-12 px-4 bg-food-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white text-food-primary px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium">Customer Favorites</span>
          </div>
          <h2 className="text-3xl font-bold text-food-dark mb-2">Most Popular Items</h2>
          <p className="text-food-muted max-w-2xl mx-auto">
            Our customers' favorite dishes that you don't want to miss.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item) => (
            <FoodCard key={item.id} food={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularItems;
