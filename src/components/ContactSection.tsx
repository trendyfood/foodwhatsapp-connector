
import React from 'react';

const ContactSection: React.FC = () => {
  return (
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
            <p className="text-food-primary">+23480-3896-9978</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-food-light flex items-center justify-center text-food-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-food-dark mb-2">Email</h3>
            <p className="text-food-primary">trendyfoodorg@outlook.com</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-soft">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-food-light flex items-center justify-center text-food-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-food-dark mb-2">Address</h3>
            <p className="text-food-primary">2 Moshalshi Street,Lagos Ng</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
