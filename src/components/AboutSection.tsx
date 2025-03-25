
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-food-light text-food-primary px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium">About Us</span>
          </div>
          <h2 className="text-3xl font-bold text-food-dark mb-4">We Deliver Authentic Nigerian Cuisine</h2>
          <p className="text-food-muted mb-6">
            TrendyFood connects Nigerian food lovers with the best local restaurants, providing a seamless ordering experience through WhatsApp. 
            We believe great Nigerian food should be accessible to everyone, with no complicated apps or lengthy sign-up processes.
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
            alt="Nigerian food preparation" 
            className="w-full h-full object-cover aspect-[4/3]" 
            src="/lovable-uploads/istockphoto-1265268905-612x612.webp.jpg" 
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
                  We carefully select our Nigerian restaurant partners to ensure authentic taste and quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
