import React from 'react';
import { useCart, CartItem } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice, 
    isCartOpen, 
    closeCart
  } = useCart();

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const proceedToWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Create the order message
    let message = "Hello! I'd like to place an order:\n\n";
    
    cartItems.forEach(item => {
      message += `• ${item.quantity}x ${item.name} - ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\nTotal: ₦${totalPrice.toLocaleString()}`;
    message += `\n\nPlease confirm my order. Thank you!`;
    
    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/2348100055499?text=${encodedMessage}`, '_blank');
    
    // Close the cart after sending to WhatsApp
    closeCart();
  };

  if (!isCartOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end"
      onClick={handleOutsideClick}
    >
      <div className="w-full max-w-md bg-white h-full shadow-lg animate-slide-in-right flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-food-primary" />
            <h2 className="font-semibold text-lg">Your Cart ({totalItems})</h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-food-light flex items-center justify-center text-food-primary">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-food-muted mb-6">Add items to your cart to place an order</p>
            <Button 
              variant="outline" 
              onClick={closeCart}
              className="border-food-primary text-food-primary hover:bg-food-light"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-soft transition-all duration-200 hover:shadow-soft-lg"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-food-dark truncate">{item.name}</h4>
                      <div className="text-food-primary font-semibold mt-1">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
                          item.quantity === 1 
                            ? "bg-red-100 text-red-500 hover:bg-red-200" 
                            : "bg-food-light text-food-primary hover:bg-food-primary hover:text-white"
                        )}
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        {item.quantity === 1 ? <Trash2 className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                      </button>
                      
                      <span className="w-5 text-center font-medium">{item.quantity}</span>
                      
                      <button 
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-food-primary text-white hover:bg-food-secondary transition-all duration-200"
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t mt-auto">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-food-muted">Subtotal:</span>
                  <span className="font-medium">₦{totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-food-muted">Delivery Fee:</span>
                  <span className="font-medium">₦0</span>
                </div>
                
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-food-primary">₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="border-food-primary text-food-primary hover:bg-food-light"
                >
                  Clear Cart
                </Button>
                
                <Button 
                  onClick={proceedToWhatsApp}
                  className="bg-food-primary hover:bg-food-secondary text-white transition-all duration-300 btn-shine"
                >
                  Checkout via WhatsApp
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
