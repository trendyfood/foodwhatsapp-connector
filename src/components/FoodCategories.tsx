
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface FoodCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categories?: Category[];
}

const FoodCategories: React.FC<FoodCategoriesProps> = ({ 
  selectedCategory, 
  onSelectCategory,
  categories = []
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Show/hide left arrow based on scroll position
    setShowLeftArrow(scrollLeft > 20);
    
    // Show/hide right arrow based on whether we can scroll more to the right
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-8">
      {/* Left scroll arrow */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-soft hover:shadow-soft-lg transition-all duration-300"
          aria-label="Scroll left"
        >
          <ArrowLeft className="h-5 w-5 text-food-dark" />
        </button>
      )}
      
      {/* Categories scroll container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-2 snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          className={cn(
            "snap-start flex-shrink-0 flex flex-col items-center justify-center h-20 px-6 rounded-xl cursor-pointer transition-all duration-300",
            selectedCategory === 'all' 
              ? 'bg-food-primary text-white shadow-soft transform scale-105' 
              : 'bg-food-light text-food-dark hover:bg-food-light/80'
          )}
          onClick={() => onSelectCategory('all')}
        >
          <div className="text-lg mb-1">🍽️</div>
          <div className="text-sm font-medium whitespace-nowrap">All Items</div>
        </div>
        
        {categories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "snap-start flex-shrink-0 flex flex-col items-center justify-center h-20 px-6 rounded-xl cursor-pointer transition-all duration-300",
              selectedCategory === category.id 
                ? 'bg-food-primary text-white shadow-soft transform scale-105' 
                : 'bg-food-light text-food-dark hover:bg-food-light/80'
            )}
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="text-lg mb-1">{category.icon}</div>
            <div className="text-sm font-medium whitespace-nowrap">{category.name}</div>
          </div>
        ))}
      </div>
      
      {/* Right scroll arrow */}
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-soft hover:shadow-soft-lg transition-all duration-300"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-5 w-5 text-food-dark" />
        </button>
      )}
    </div>
  );
};

export default FoodCategories;
