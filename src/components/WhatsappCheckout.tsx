
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';

interface WhatsappCheckoutProps {
  phone?: string;
  message?: string;
  currency?: string;
}

const WhatsappCheckout: React.FC<WhatsappCheckoutProps> = ({ 
  phone = "1234567890",
  message = "Hello, I would like to place an order:",
  currency = "dollar"
}) => {
  const { cartItems, totalPrice } = useCart();
  
  const generateWhatsAppLink = () => {
    if (cartItems.length === 0) return "#";
    
    const itemsText = cartItems.map(item => 
      `${item.quantity}x ${item.name} (${getCurrencySymbol(currency)}${(item.price * item.quantity).toFixed(2)})`
    ).join("\n");
    
    const totalText = `\nTotal: ${getCurrencySymbol(currency)}${totalPrice.toFixed(2)}`;
    
    const fullMessage = `${message}\n\n${itemsText}${totalText}`;
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
  };
  
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

  return (
    <section className="py-20 px-4 text-center bg-gradient-to-br from-food-primary/10 via-white to-food-secondary/5">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 bg-food-light text-food-primary px-4 py-2 rounded-full">
          <span className="text-sm font-medium">Easy Ordering</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-food-dark">Ready to Order?</h2>
        
        <p className="text-food-muted max-w-2xl mx-auto">
          Ordering is simple! Add items to your cart and click the button below to complete your order via WhatsApp.
        </p>
        
        <Button
          size="lg"
          className={`mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-6 h-auto rounded-xl shadow-button transform transition-all duration-300 hover:scale-105 text-base ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={cartItems.length === 0}
          asChild
        >
          <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.901 1.392 7.471 3.704 10.237L1.281 32l5.893-2.416C9.903 31.728 12.827 33 16.004 33 24.83 33 32 25.824 32 17S24.83 0 16.004 0z" fill="#fff"/>
                <path d="M25.301 22.473c-.467 1.317-2.332 2.412-3.812 2.729-1.013.213-2.339.382-6.801-1.457-5.699-2.35-9.368-8.099-9.652-8.473-.267-.373-2.253-2.993-2.253-5.709 0-2.715 1.4-4.038 1.893-4.6.467-.534 1.227-.801 1.96-.801.467 0 .934.053 1.333.08.587.053 1.36.213 2.12 1.627.24.427 1.12 2.752 1.52 3.705.267.654.44 1.454.133 1.974-.267.56-1.027 1.281-1.427 1.761-1.066 1.12-.771 2.063.133 3.544 1.333 2.195 2.853 3.769 4.586 4.783 1.173.684 2.64 1.42 3.066.92.613-.721 2.246-2.622 2.906-3.596.801-1.174 2.28-.88 3.066-.614 1.173.374 3.066 1.441 3.599 1.788.533.347.854.534.98 1.094.134.535-.32 1.709-.786 3.025z" fill="#65b03d"/>
              </svg>
              Complete Order via WhatsApp
              <ArrowRight className="h-5 w-5" />
            </span>
          </a>
        </Button>
        
        {cartItems.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Add items to your cart first</p>
        )}
      </div>
    </section>
  );
};

export default WhatsappCheckout;
