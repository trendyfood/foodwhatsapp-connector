
import React from 'react';
import FoodCategories from './FoodCategories';
import FoodCard from './FoodCard';
import { FoodItem } from '@/assets/food-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuSectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  filteredItems: FoodItem[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ 
  selectedCategory, 
  onSelectCategory, 
  filteredItems 
}) => {
  // Debug food items display
  console.log(`MenuSection rendering with ${filteredItems.length} items`);
  console.log('Filtered items:', filteredItems.map(item => item.name));

  return (
    <section id="menu" className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-food-light text-food-primary px-4 py-2 rounded-full mb-4">
          <span className="text-sm font-medium">Explore Our Menu</span>
        </div>
        <h2 className="text-3xl font-bold text-food-dark mb-2">Delicious Food Menu</h2>
        <p className="text-food-muted max-w-2xl mx-auto">
          Browse our selection of mouthwatering dishes prepared with fresh ingredients.
        </p>
      </div>
      
      {/* Categories */}
      <FoodCategories 
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      
      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredItems.map((item) => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>
      
      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-food-light flex items-center justify-center text-food-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-food-dark mb-2">No items found</h3>
          <p className="text-food-muted">No items available in this category right now.</p>
        </div>
      )}
    </section>
  );
};

export default MenuSection;
