import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';
import { Send } from 'lucide-react';

const WhatsappCheckout: React.FC = () => {
  const { totalItems, totalPrice, cartItems } = useCart();

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    // Create the order message
    let message = "Hello! I'd like to place an order:\n\n";
    
    cartItems.forEach(item => {
      message += `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\nTotal: $${totalPrice.toFixed(2)}`;
    message += `\n\nPlease confirm my order. Thank you!`;
    
    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/2348100055499?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-r from-food-primary/10 to-food-secondary/5">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8 bg-white rounded-3xl shadow-elegant">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-food-dark mb-4">Ready to place your order?</h2>
          <p className="text-food-muted max-w-2xl mx-auto">
            We'll take you straight to WhatsApp to confirm your order. No account creation or long checkout forms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x">
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 rounded-full bg-food-light flex items-center justify-center text-food-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-food-dark mb-2">Select Your Items</h3>
            <p className="text-food-muted text-center">Browse our menu and add items to your cart</p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 rounded-full bg-food-light flex items-center justify-center text-food-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-food-dark mb-2">Checkout via WhatsApp</h3>
            <p className="text-food-muted text-center">Your order details will be sent directly through WhatsApp</p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 rounded-full bg-food-light flex items-center justify-center text-food-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-food-dark mb-2">Confirm Your Order</h3>
            <p className="text-food-muted text-center">Confirm details with our team and schedule delivery</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-2 bg-food-light text-food-primary px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium">
              {totalItems > 0 
                ? `Your cart: ${totalItems} item${totalItems !== 1 ? 's' : ''} ($${totalPrice.toFixed(2)})`
                : 'Your cart is empty'
              }
            </span>
          </div>
          
          <Button 
            size="lg"
            onClick={handleWhatsAppCheckout}
            disabled={totalItems === 0}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white transition-all duration-300 rounded-xl shadow-button btn-shine px-8"
          >
            <span className="mr-2">Order via WhatsApp</span>
            <Send className="h-5 w-5" />
          </Button>
          
          <p className="mt-4 text-sm text-food-muted">
            No account required. We'll respond within minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsappCheckout;
