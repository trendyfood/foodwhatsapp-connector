
import React, { useState } from 'react';
import { FoodItem } from '../assets/types';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '@/lib/utils';

interface FoodCardProps {
  food: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { addToCart, cartItems } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const itemInCart = cartItems.find(item => item.id === food.id);
  const quantity = itemInCart?.quantity || 0;

  // Debug image loading
  console.log(`Food item: ${food.name}, Image path: ${food.image}, ID: ${food.id}`);

  return (
    <div 
      className="food-card group animate-scale-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gray-100">
        {!isImageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <div className="w-10 h-10 border-4 border-food-primary/30 border-t-food-primary rounded-full animate-spin"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <span className="text-4xl">🍽️</span>
            <p className="text-xs text-food-muted mt-2">Image not available</p>
          </div>
        ) : (
          <img 
            src={food.image} 
            alt={food.name}
            className={cn(
              "food-card-img object-cover w-full h-full",
              !isImageLoaded && "opacity-0",
              isImageLoaded && "opacity-100"
            )}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => {
              console.error(`Failed to load image for ${food.name}: ${food.image}`);
              setImageError(true);
              setIsImageLoaded(true);
            }}
          />
        )}
        
        {typeof food.popular === 'boolean' && food.popular && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-food-primary text-white text-xs font-medium rounded-full">
            Popular
          </div>
        )}
        
        {typeof food.popular === 'string' && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
            {food.popular}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-food-dark group-hover:text-food-primary transition-colors duration-300">
            {food.name}
          </h3>
          <div className="text-food-primary font-bold">₦{food.price.toLocaleString()}</div>
        </div>
        
        <p className="text-food-muted text-sm mb-4 line-clamp-2">
          {food.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1">
            {food.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-food-light text-food-muted text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {quantity > 0 ? (
            <div className="flex items-center">
              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-food-light text-food-primary hover:bg-food-primary hover:text-white transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  if (itemInCart) {
                    // This functionality is handled in the Cart component
                  }
                }}
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span className="w-8 text-center font-medium">{quantity}</span>
              
              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-food-primary text-white hover:bg-food-secondary transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(food);
                }}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button 
              className="flex items-center space-x-1 px-3 py-2 bg-food-primary text-white rounded-full hover:bg-food-secondary transform hover:scale-105 transition-all duration-200"
              onClick={() => addToCart(food)}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
