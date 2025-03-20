
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem } from '../assets/food-data';
import { useToast } from "@/components/ui/use-toast";

export interface CartItem extends FoodItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Calculate total items and price whenever cart changes
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('foodCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: FoodItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Item already exists, update quantity
        const updatedItems = prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
        toast({
          title: "Item updated",
          description: `${item.name} quantity increased`,
          duration: 1500,
        });
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        toast({
          title: "Item added",
          description: `${item.name} added to cart`,
          duration: 1500,
        });
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    // Open cart when adding items
    openCart();
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} removed from cart`,
          duration: 1500,
        });
      }
      
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed",
      duration: 1500,
    });
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    toggleCart,
    closeCart,
    openCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
