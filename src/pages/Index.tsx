
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import PopularItems from '@/components/PopularItems';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Cart from '@/components/Cart';
import WhatsappCheckout from '@/components/WhatsappCheckout';
import { CartProvider } from '@/context/CartContext';
import { foodItems } from '@/assets/food-data';

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(foodItems);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Apply category filter
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(foodItems);
    } else {
      setFilteredItems(foodItems.filter(item => item.category === selectedCategory));
    }
    
    // Debug log to check filtering
    console.log('Filtered items count:', filteredItems.length);
    console.log('Selected category:', selectedCategory);
    console.log('All food items:', foodItems);
  }, [selectedCategory, foodItems]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Welcome toast
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to FoodOrder!",
        description: "Browse our menu and order directly via WhatsApp.",
        duration: 5000,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Get popular items
  const popularItems = foodItems.filter(item => item.popular);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />
          
          {/* Menu Section */}
          <MenuSection 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            filteredItems={filteredItems}
          />
          
          {/* Popular Items Section */}
          <PopularItems popularItems={popularItems} />
          
          {/* Checkout Section */}
          <WhatsappCheckout />
          
          {/* About Section */}
          <AboutSection />
          
          {/* Contact Section */}
          <ContactSection />
        </main>
        
        <Footer />
        
        {/* Scroll to top button */}
        <ScrollToTop showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
        
        {/* Cart Component */}
        <Cart />
      </div>
    </CartProvider>
  );
};

export default Index;
