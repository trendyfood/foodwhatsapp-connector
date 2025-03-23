
import React, { useEffect, useRef } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    // Make sure the hero is visible immediately
    heroElement.classList.add('animate-fade-in');
    
    // Fix: Use style property with HTMLElement type assertion
    (heroElement as HTMLElement).style.opacity = '1';

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          (entry.target as HTMLElement).style.opacity = '1';
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    observer.observe(heroElement);

    return () => {
      if (heroElement) observer.unobserve(heroElement);
    };
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen flex items-center pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
        <div className="order-2 md:order-1 mt-8 md:mt-0">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-food-light text-food-primary px-4 py-2 rounded-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-sm font-medium">Authentic Nigerian Cuisine</span>
              <ChevronRight className="h-4 w-4" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-food-dark leading-tight animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Nigerian Food <br />
              <span className="text-food-primary">At Your Doorstep</span>
            </h1>
            
            <p className="text-food-muted text-lg max-w-md animate-fade-up" style={{ animationDelay: '0.6s' }}>
              Experience authentic Nigerian cuisine delivered straight to your home. From delicious Jollof rice to hearty soups and swallows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-fade-up" style={{ animationDelay: '0.8s' }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-food-primary to-food-secondary hover:bg-food-secondary text-white transition-all duration-300 rounded-xl shadow-button btn-shine text-base"
              >
                <span>Order Now</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-food-primary text-food-primary hover:bg-food-light hover:text-food-primary transition-all duration-300 rounded-xl text-base"
              >
                View Menu
              </Button>
            </div>
            
            <div className="pt-6 flex items-center space-x-6 animate-fade-up" style={{ animationDelay: '1s' }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                      alt={`Customer ${i}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-food-dark">500+ Happy Customers</div>
                <div className="text-food-muted">Trusted by customers</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2 relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-3xl overflow-hidden shadow-soft-lg">
            <img 
              src="https://images.unsplash.com/photo-1634649083038-c9f93e578d17?q=80&w=1400&auto=format&fit=crop" 
              alt="Nigerian Jollof Rice" 
              className="w-full h-full object-cover"
            />
            
            {/* Floating elements */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-soft animate-bounce-subtle">
              <div className="text-center">
                <div className="text-sm font-medium text-food-muted">Delivery time</div>
                <div className="text-xl font-bold text-food-primary">15-30 min</div>
              </div>
            </div>
            
            <div className="absolute -bottom-2 -left-2 md:bottom-6 md:left-6 glass-morphism p-4 rounded-xl shadow-soft flex items-center space-x-4 animate-pulse-soft">
              <div className="bg-food-primary rounded-full p-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-food-muted">Special Offer</div>
                <div className="text-lg font-bold text-food-dark">25% Off First Order</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
