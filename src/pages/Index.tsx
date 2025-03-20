
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FoodCategories from '@/components/FoodCategories';
import FoodCard from '@/components/FoodCard';
import Cart from '@/components/Cart';
import WhatsappCheckout from '@/components/WhatsappCheckout';
import { CartProvider } from '@/context/CartContext';
import { foodItems } from '@/assets/food-data';
import { ArrowUp } from 'lucide-react';

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
  }, [selectedCategory]);

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

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />
          
          {/* Menu Section */}
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
              onSelectCategory={setSelectedCategory}
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
          
          {/* Popular Items Section */}
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
                {foodItems.filter(item => item.popular).map((item) => (
                  <FoodCard key={item.id} food={item} />
                ))}
              </div>
            </div>
          </section>
          
          {/* Checkout Section */}
          <WhatsappCheckout />
          
          {/* About Section */}
          <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-food-light text-food-primary px-4 py-2 rounded-full mb-4">
                  <span className="text-sm font-medium">About Us</span>
                </div>
                <h2 className="text-3xl font-bold text-food-dark mb-4">We Deliver Delicious Food Experiences</h2>
                <p className="text-food-muted mb-6">
                  Our mission is to connect food lovers with the best local restaurants, providing a seamless ordering experience through WhatsApp. 
                  We believe great food should be accessible to everyone, with no complicated apps or lengthy sign-up processes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-food-light p-4 rounded-xl">
                    <div className="text-food-primary font-bold text-2xl mb-1">500+</div>
                    <div className="text-food-dark font-medium">Happy Customers</div>
                  </div>
                  <div className="bg-food-light p-4 rounded-xl">
                    <div className="text-food-primary font-bold text-2xl mb-1">15</div>
                    <div className="text-food-dark font-medium">Local Restaurants</div>
                  </div>
                  <div className="bg-food-light p-4 rounded-xl">
                    <div className="text-food-primary font-bold text-2xl mb-1">100+</div>
                    <div className="text-food-dark font-medium">Food Items</div>
                  </div>
                  <div className="bg-food-light p-4 rounded-xl">
                    <div className="text-food-primary font-bold text-2xl mb-1">30 min</div>
                    <div className="text-food-dark font-medium">Average Delivery</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-soft-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop" 
                    alt="Restaurant interior" 
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-elegant max-w-xs">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-food-primary flex items-center justify-center text-white flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-food-dark">Quality Guaranteed</h4>
                      <p className="text-sm text-food-muted mt-1">
                        We carefully select our restaurant partners to ensure top quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact Section */}
          <section id="contact" className="py-16 px-4 bg-gradient-to-r from-food-primary/10 to-food-secondary/5">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-white text-food-primary px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-medium">Get In Touch</span>
              </div>
              <h2 className="text-3xl font-bold text-food-dark mb-4">Have Questions?</h2>
              <p className="text-food-muted max-w-2xl mx-auto mb-8">
                We're here to help with any questions you might have about our service. 
                Feel free to reach out through any of the channels below.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-soft">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-food-light flex items-center justify-center text-food-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-food-dark mb-2">Phone</h3>
                  <p className="text-food-primary">+1 (234) 567-8900</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-soft">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-food-light flex items-center justify-center text-food-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-food-dark mb-2">Email</h3>
                  <p className="text-food-primary">info@foodorder.com</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-soft">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-food-light flex items-center justify-center text-food-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-food-dark mb-2">Address</h3>
                  <p className="text-food-primary">123 Food Street, Cuisine City</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <footer className="bg-food-dark text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold mb-4">
                  <span className="text-food-primary">Food</span>
                  <span className="text-food-secondary">Order</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Delicious food delivered to your door. Order via WhatsApp for a seamless experience.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="#menu" className="text-gray-400 hover:text-white transition-colors">Menu</a></li>
                  <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Burgers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pizza</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sushi</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pasta</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Desserts</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Opening Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between text-gray-400">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between text-gray-400">
                    <span>Saturday:</span>
                    <span>10:00 AM - 11:00 PM</span>
                  </li>
                  <li className="flex justify-between text-gray-400">
                    <span>Sunday:</span>
                    <span>10:00 AM - 9:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>© 2023 FoodOrder. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-food-primary hover:bg-food-secondary text-white rounded-full p-3 shadow-button transform transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
        
        {/* Cart Component */}
        <Cart />
      </div>
    </CartProvider>
  );
};

export default Index;
