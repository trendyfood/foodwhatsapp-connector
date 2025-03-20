
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Plus, Minus, X, ArrowRight } from 'lucide-react';

interface CartProps {
  currency?: string;
}

const Cart: React.FC<CartProps> = ({ currency = "dollar" }) => {
  const { cartItems, removeFromCart, updateCartItemQuantity, getTotalPrice, getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState('');
  
  // Apply animated effect when cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimation('animate-bounce');
      const timer = setTimeout(() => setAnimation(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);
  
  const getCurrencySymbol = (currencyName: string) => {
    switch (currencyName.toLowerCase()) {
      case 'dollar':
        return '$';
      case 'euro':
        return '€';
      case 'pound':
        return '£';
      case 'yen':
        return '¥';
      case 'naira':
        return '₦';
      default:
        return '$';
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    
    const phone = "1234567890"; // Replace with your WhatsApp number
    const message = "Hello, I would like to place an order:";
    
    const itemsText = cartItems.map(item => 
      `${item.quantity}x ${item.name} (${getCurrencySymbol(currency)}${(item.price * item.quantity).toFixed(2)})`
    ).join("\n");
    
    const totalText = `\nTotal: ${getCurrencySymbol(currency)}${getTotalPrice().toFixed(2)}`;
    
    const fullMessage = `${message}\n\n${itemsText}${totalText}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`, '_blank');
  };

  return (
    <>
      {/* Floating cart button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className={`fixed bottom-6 left-6 rounded-full p-4 h-auto w-auto bg-food-primary hover:bg-food-secondary text-white shadow-button transition-all duration-300 ${animation}`}
            aria-label="Open cart"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-food-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-food-primary" />
              Your Cart
            </SheetTitle>
          </SheetHeader>
          
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add items to your cart to see them here</p>
              <Button 
                variant="outline" 
                size="sm"
                className="border-food-primary text-food-primary hover:bg-food-light"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-4 last:mb-0 relative overflow-hidden">
                    <div className="flex gap-3">
                      {/* Item image */}
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      {/* Item details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                        <div className="text-xs text-gray-500 mb-2">
                          {getCurrencySymbol(currency)}{item.price.toFixed(2)} x {item.quantity}
                        </div>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center">
                          <button 
                            className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-food-light hover:text-food-primary transition-colors"
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateCartItemQuantity(item.id, item.quantity - 1);
                              } else {
                                removeFromCart(item.id);
                              }
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          
                          <span className="mx-2 text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          
                          <button 
                            className="w-6 h-6 rounded-full flex items-center justify-center bg-food-primary text-white hover:bg-food-secondary transition-colors"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Item total price */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-sm font-bold">
                          {getCurrencySymbol(currency)}{(item.price * item.quantity).toFixed(2)}
                        </div>
                        
                        <button 
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
              
              {/* Cart summary */}
              <div className="border-t pt-4 mt-auto">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">
                    {getCurrencySymbol(currency)}{getTotalPrice().toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                  onClick={handleWhatsAppCheckout}
                >
                  <span>Checkout via WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
